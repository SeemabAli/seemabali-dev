import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT, getLocalFallbackResponse } from "@/lib/chatbotKnowledge";

export const runtime = "nodejs";

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

    const lastUserMessage = messages
      .slice()
      .reverse()
      .find((m: { role: string; content: string }) => m.role === "user")?.content || "";

    const apiKey = process.env.OPENAI_API_KEY;

    // If an OpenAI API key is configured, use OpenAI
    if (apiKey && apiKey.trim().length > 0 && !apiKey.includes("your-openai-api-key")) {
      try {
        const openai = new OpenAI({ apiKey });

        const formattedMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
            content: m.content,
          })),
        ];

        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: formattedMessages,
          temperature: 0.5,
          max_tokens: 500,
        });

        const reply = response.choices[0]?.message?.content || "I apologize, I could not generate a response.";

        return NextResponse.json({
          reply,
          source: "openai",
        });
      } catch (openAiError: unknown) {
        console.warn("OpenAI API call encountered an error. Falling back to local semantic knowledge base:", openAiError);
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
