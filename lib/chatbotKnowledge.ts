import { portfolioData } from "@/data/portfolioData";

/**
 * This system prompt + fallback set is provider-agnostic — it doesn't
 * assume OpenAI specifically, so it works as-is with the Gemini-backed
 * /api/chat route. If your route wraps this string differently per
 * provider (e.g. Gemini's `systemInstruction` vs OpenAI's `system`
 * message), just pass SYSTEM_PROMPT into whichever field your SDK call
 * expects — no changes needed here.
 */
export const SYSTEM_PROMPT = `
You are "${portfolioData.chatbot.name}", the official AI portfolio assistant for ${portfolioData.personal.name}.
Your objective is to represent ${portfolioData.personal.name} professionally to recruiters, engineering managers, potential clients, and fellow developers.

### KEY PROFILE INFORMATION:
- Name: ${portfolioData.personal.name}
- Title: ${portfolioData.personal.title}
- Availability: Currently available for internships, junior/mid developer roles, and freelance/contract opportunities.
- Education: BS in Software Engineering from Virtual University of Pakistan (2022 – 2026).
- Experience: Junior Frontend Developer at 7 Kings Code Software Solutions (working with React, Next.js, Sitecore CMS, Tailwind CSS, and Enterprise Web Applications).
- Contact: Email: ${portfolioData.personal.email} | GitHub: ${portfolioData.personal.github} | LinkedIn: ${portfolioData.personal.linkedin}

### TECHNICAL SKILLS:
- Frontend: React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS.
- Backend: Node.js, Express.js, MongoDB (Mongoose), REST APIs.
- AI & Modern Dev: OpenAI API (GPT-4 / Assistants), LangChain, FastAPI, AI API Integration, RAG workflows.
- Tools & CMS: Git, GitHub, Postman, Sitecore CMS, Vercel, MongoDB Atlas.

### KEY PROJECTS:
1. **CodeScry AI**:
   - AI-powered code review and quality intelligence assistant.
   - Stack: Next.js, TypeScript, Express.js, MongoDB, FastAPI, OpenAI, LangChain, Tailwind CSS.
   - Features: AI automated code reviews, structured review reports, auth, protected dashboard, review history, and FastAPI microservice.
2. **Automated Lecture Timetable System**:
   - Algorithmic timetable generator resolving room & instructor conflicts.
   - Stack: Next.js, TypeScript, MongoDB, Mongoose, NextAuth, Tailwind CSS.
   - Features: Role-based access, automated clash-free schedule generation, faculty workload preferences, classroom allocation.
3. **Attendance Management System**:
   - Full-stack enterprise MERN tracking and analytics portal.
   - Stack: React.js, Node.js, Express.js, MongoDB, JWT Auth, Tailwind CSS, Chart.js.
   - Features: Daily check-in/out, monthly percentage calculations, leave request workflows, analytics dashboard.

### STRICT BEHAVIORAL GUIDELINES:
1. Speak professionally, warmly, and concisely.
2. ONLY speak about facts and accomplishments provided in this prompt. NEVER fabricate, hallucinate, or assume experience or projects outside this data.
3. If asked about something not mentioned in the portfolio, politely state: "I don't have that specific detail in ${portfolioData.personal.name.split(" ")[0]}'s verified portfolio, but feel free to reach out directly at ${portfolioData.personal.email} for more information!"
4. Highlight his strengths in modern frontend (React/Next.js/TypeScript) and emerging AI integrations (OpenAI, LangChain, FastAPI).
5. Always encourage recruiters and clients to get in touch or hire him.
6. Format responses with clean markdown (bullet points, bold key terms) when helpful.
`.trim();

/**
 * Local fallback response generator — used when the Gemini API key is
 * missing, the request fails, or /api/chat is otherwise unreachable.
 * This guarantees the chatbot stays 100% interactive even without a
 * live model behind it.
 */
export function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();
  const firstName = portfolioData.personal.name.split(" ")[0];

  // 1. Availability & Hiring
  if (
    q.includes("available") ||
    q.includes("hire") ||
    q.includes("opportunity") ||
    q.includes("freelance") ||
    q.includes("open for work") ||
    q.includes("looking for work") ||
    q.includes("available for work")
  ) {
    return `✅ **Yes! ${firstName} is actively available for new opportunities**, including full-time frontend/full-stack developer roles, internships, and freelance projects.

You can click the **Contact** link in the navbar or reach out directly at **${portfolioData.personal.email}** to discuss how he can contribute to your team.`;
  }

  // 2. Specific Projects & Projects Overview
  if (q.includes("codescry") || q.includes("code scry")) {
    return `**CodeScry AI** is ${firstName}'s flagship AI project:
- Built with **Next.js, TypeScript, Express, MongoDB, FastAPI, OpenAI, and LangChain**.
- Features automated code quality reviews, vulnerability detection, structured markdown reports, authentication, and a historical review dashboard.`;
  }

  if (q.includes("timetable") || q.includes("lecture")) {
    return `The **Automated Lecture Timetable System** is a full-stack Next.js & MongoDB scheduling engine designed to eliminate room double-booking and faculty time clashes through intelligent constraint satisfaction logic.`;
  }

  if (q.includes("attendance")) {
    return `The **Attendance Management System** is a full-stack MERN application for academic institutions and enterprise teams with daily tracking, leave approvals, and visual analytics dashboards.`;
  }

  if (
    q.includes("project") ||
    q.includes("portfolio") ||
    q.includes("built") ||
    q.includes("apps") ||
    q.includes("creations")
  ) {
    return `${firstName} has engineered several high-impact projects:

1. 🚀 **CodeScry AI**: An AI-powered code review assistant using Next.js, TypeScript, Express, MongoDB, FastAPI, OpenAI, and LangChain that provides automated code security audits and structured review reports.
2. 📅 **Automated Lecture Timetable System**: A constraint-satisfaction scheduling platform built with Next.js, TypeScript, MongoDB, and NextAuth that generates clash-free academic timetables.
3. 📊 **Attendance Management System**: A MERN stack tracking platform with role-based access, automated monthly summaries, and leave management.

You can inspect the live demos and source code in the **Projects** section!`;
  }

  // 3. Technical Skills & Specialization
  if (
    q.includes("specialize") ||
    q.includes("tech") ||
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("react") ||
    q.includes("next") ||
    q.includes("ai")
  ) {
    return `${firstName} specializes in **modern frontend development with React, Next.js, TypeScript, and Tailwind CSS**. He also builds full-stack and AI-powered applications.

His complete technical stack includes:
- 💻 **Frontend**: React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3.
- ⚙️ **Backend**: Node.js, Express.js, MongoDB & Mongoose, RESTful APIs.
- 🤖 **AI & Python**: OpenAI API, LangChain, FastAPI, AI API integrations.
- 🛠️ **Tools & Enterprise**: Git, GitHub, Postman, Sitecore CMS, Vercel, MongoDB Atlas.`;
  }

  // 4. Experience & Work History
  if (
    q.includes("experience") ||
    q.includes("7 kings") ||
    q.includes("work history") ||
    q.includes("job") ||
    q.includes("career")
  ) {
    return `${firstName} works as a **Junior Frontend Developer at 7 Kings Code Software Solutions** (2024 – Present).

Key responsibilities include:
- Building responsive, high-performance web applications using **React.js and Next.js**.
- Developing enterprise digital solutions and integrating **Sitecore CMS**.
- Translating Figma designs into pixel-perfect, accessible UI components.
- Optimizing Core Web Vitals and frontend rendering speeds.`;
  }

  // 5. Contact & Socials
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("linkedin") ||
    q.includes("github") ||
    q.includes("connect") ||
    q.includes("message")
  ) {
    return `You can connect with ${firstName} through the following channels:

- 📧 **Email**: [${portfolioData.personal.email}](mailto:${portfolioData.personal.email})
- 💼 **LinkedIn**: [${portfolioData.personal.linkedin.replace("https://", "")}](${portfolioData.personal.linkedin})
- 🐙 **GitHub**: [${portfolioData.personal.github.replace("https://", "")}](${portfolioData.personal.github})

Or use the **Contact Form** right below to send him a direct message!`;
  }

  // 6. Education & Academic Background
  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("university") ||
    q.includes("graduate") ||
    q.includes("academic") ||
    q.includes("gpa")
  ) {
    return `${firstName} is graduating with a **BS in Software Engineering** from the **Virtual University of Pakistan (2022 – 2026)**.

His coursework includes Data Structures & Algorithms, Software Architecture & Design, Web Systems, Database Management Systems, and Artificial Intelligence Fundamentals.`;
  }

  // 7. General Introduction
  if (
    q.includes("who is") ||
    q.includes("introduce") ||
    q.includes("about") ||
    q.includes("tell me about") ||
    q.includes(firstName.toLowerCase())
  ) {
    return `**${portfolioData.personal.name}** is a **Software Engineering graduate (2022–2026)** and modern web developer who specializes in building fast, scalable, and intuitive digital experiences.

He works primarily with **React.js, Next.js (App Router), TypeScript, and Tailwind CSS**, alongside full-stack backend development (**Node.js, Express, MongoDB**) and emerging **AI integrations** (OpenAI API, LangChain, FastAPI).`;
  }

  // Default helpful response
  return `Thank you for asking! I'm ${firstName}'s AI assistant.

${firstName} is a **Software Engineering graduate** and **Modern Web Developer** skilled in **React, Next.js, TypeScript, Tailwind CSS, Node.js, and AI integrations (OpenAI & LangChain)**.

Feel free to ask me about his:
- 💻 **Skills & Tech Stack**
- 🚀 **Projects (like CodeScry AI or Lecture Timetable)**
- 🏢 **Experience at 7 Kings Code**
- 🎓 **Education & Background**
- 📬 **Contact & Availability**`;
}