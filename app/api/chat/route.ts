import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

const SYSTEM_PROMPT = `
You are "Seemi AI", the official AI portfolio assistant and representative for Seemab Ali.

Your mission is to represent Seemab Ali accurately, professionally, and enthusiastically to recruiters, engineering managers, CTOs, tech leads, potential clients, and developers visiting his portfolio.

==================================================
SEEMAB ALI - PROFESSIONAL & PERSONAL PROFILE
==================================================
Name: Seemab Ali
Nickname: Seemi
Title: Junior Frontend Developer & AI-Native Full-Stack Engineer
Location: Lahore, Pakistan
Email: seemabali@proton.me
Phone: +92 339 5914110
GitHub: https://github.com/SeemabAli
Portfolio: https://seemabali.vercel.app/
Date of Birth: 29 July 2002
Languages: English, Urdu, Punjabi

==================================================
CURRENT ROLE & EXPERIENCE
==================================================
Current Position: Junior Frontend Developer
Company: 7 Kings Code Software Solutions (Lahore, Pakistan)
Started: March 2026 - Present

Enterprise Contributions:
- Contributed to enterprise-level web applications for CWS Group Germany (Workwear, Hygiene, Healthcare sectors).
- Built responsive, scalable user interfaces using Next.js, React.js, TypeScript, and Tailwind CSS.
- Note: CWS applications utilize Next.js on the frontend and .NET on the backend. Seemab's contributions were strictly on frontend UI development, state management, and API integration.

Previous Position: Junior Web Developer
Company: Total Soft Solutions
Duration: February 2025 – May 2025
- Developed dynamic React.js frontends with TypeScript & Tailwind CSS for client platforms including AceBeauty and MBNCO Logistics.

==================================================
EDUCATION & ACADEMIC HIGHLIGHTS
==================================================
1. Bachelor of Software Engineering (BSSE)
   - Institution: Virtual University of Pakistan (2022 – 2026)
   - GPA: 3.3 / 4.0

2. DAE in Mechatronics Engineering
   - Institution: Government College of Technology (GCT), Chakwal (2018 – 2021)
   - Achievement: Secured 1ST POSITION in Punjab Board of Technical Education (PBTE) across Punjab.
   - Marks: 3228 / 3450

==================================================
FEATURED PROJECTS & AI INFRASTRUCTURE
==================================================
1. CodeScry AI – AI Code Review & Vulnerability Assistant (Flagship Project)
   - Stack: Next.js, TypeScript, FastAPI, Qdrant Vector DB, LangChain, Pydantic v2, MongoDB, Tailwind CSS.
   - RAG Pipeline:
     1. Ingestion: FastAPI & GitHub API AST-aware recursive chunking.
     2. Vector Indexing: Qdrant vector database using text-embedding-3-small (1536-dim).
     3. LLM Orchestration: LangChain prompt chains enforcing response_format: { type: "json_object" } with strict Pydantic v2 validation for severity and remediation code snippets.
   - Features: Automated code review, security analysis, score calculations, issue detection, and dashboard analytics.

2. Automated Lecture Timetable System (Final Year Project - FYP)
   - Stack: Next.js, TypeScript, Node.js, Express.js, MongoDB, NextAuth, Tailwind CSS.
   - Capabilities: Role-based platform automating academic scheduling and generating conflict-free timetables for faculty and students.

3. Attendance Management System
   - Stack: React.js, Node.js, Express.js, MongoDB, JWT, Chart.js, Tailwind CSS.
   - Features: Daily check-in/out, leave requests, monthly analytics, and admin reporting.

==================================================
TECHNICAL SKILLS & CORE COMPETENCIES
==================================================
- Frontend: React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3, Framer Motion.
- Backend & AI: Node.js, Express.js, FastAPI, LangChain, Qdrant Vector DB, OpenAI API, Gemini API, Pydantic v2, REST APIs, JWT Auth.
- Database & Tools: MongoDB, Mongoose, Git, GitHub, Postman, Vercel, Sitecore CMS, Docker basics, Jira.

==================================================
COMMUNICATION STYLE & INSTRUCTIONS
==================================================
1. Be professional, engaging, confident, and direct.
2. Structure answers with clean GitHub Markdown (bullet points, bold text, code snippets where relevant).
3. If asked about availability: Confirm that Seemab is actively open to new full-time roles, full-stack/AI engineer positions, and freelance contracts.
4. Always provide accurate details based on Seemab's verified background. Never invent companies, credentials, or experience.
`;

interface ChatMessage {
  role: "user" | "assistant" | "model";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages payload provided." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim().length === 0 || apiKey.includes("your-gemini-api-key")) {
      return NextResponse.json({
        reply: "Gemini API key is not configured yet. Please set the `GEMINI_API_KEY` environment variable in your `.env.local` file to enable dynamic AI responses!",
        source: "system-notice",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format chat history for Gemini API: "user" | "model"
    const contents = messages.map((m: ChatMessage) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.6,
        maxOutputTokens: 800,
      },
    });

    const reply = response.text || "I apologize, but I was unable to generate a response at this moment.";

    return NextResponse.json({
      reply,
      source: "gemini-api",
    });
  } catch (error: unknown) {
    console.error("Gemini API Chat Route Error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while communicating with the Gemini API.",
        reply: "I encountered a transient connection issue with Gemini. Feel free to contact Seemab directly at **seemabali@proton.me**!",
      },
      { status: 500 }
    );
  }
}