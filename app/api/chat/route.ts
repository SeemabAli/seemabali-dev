import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, getLocalFallbackResponse } from "@/lib/chatbotKnowledge";

export const runtime = "nodejs";

// Override with a GEMINI_MODEL env var if you want to point at a
// different Gemini model without touching code. "gemini-2.5-flash" is
// the current stable, widely-available flash model as of mid-2026;
// newer previews (e.g. gemini-3.5-flash) may need allowlisting on your
// API key, so this stays on the safer default.
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

interface ChatMessage {
  role: string;
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages array provided." },
        { status: 400 }
      );
    }

    const lastUserMessage =
      messages
        .slice()
        .reverse()
        .find((m: ChatMessage) => m.role === "user")?.content || "";

    const apiKey = process.env.GEMINI_API_KEY;

    // If a Gemini API key is configured, use Gemini
    if (apiKey && apiKey.trim().length > 0 && !apiKey.includes("your-gemini-api-key")) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        // Gemini uses "user" / "model" roles (not "assistant"), and takes
        // the full conversation history as `contents` on every call since
        // generateContent is stateless between requests.
        const contents = messages.map((m: ChatMessage) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.5,
            maxOutputTokens: 500,
          },
        });

        const reply = response.text || "I apologize, I could not generate a response.";

        return NextResponse.json({
          reply,
          source: "gemini",
        });
      } catch (geminiError: unknown) {
        console.warn(
          "Gemini API call encountered an error. Falling back to local semantic knowledge base:",
          geminiError
        );
        // Fallback to local intelligent knowledge base seamlessly
        const fallbackReply = getLocalFallbackResponse(lastUserMessage);
        return NextResponse.json({
          reply: fallbackReply,
          source: "knowledge-engine",
        });
      }
    }

    // Default fast intelligent semantic response engine
    const fallbackReply = getLocalFallbackResponse(lastUserMessage);

    return NextResponse.json({
      reply: fallbackReply,
      source: "knowledge-engine",
    });
  } catch (err: unknown) {
    console.error("Error in /api/chat route:", err);
    return NextResponse.json(
      { error: "Internal server error occurred while processing your request." },
      { status: 500 }
    );
  }
}