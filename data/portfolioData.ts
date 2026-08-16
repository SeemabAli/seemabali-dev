export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** Optional — falls back to `description` in the UI if not provided. */
  longDescription?: string;
  category:
  | "AI & Full-Stack"
  | "Full-Stack Web"
  | "Enterprise Systems"
  | "NextJS & Database Application";
  technologies: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  githubUrl: string;
  /** Optional — not every project has a deployed demo yet. Projects/ProjectModal
   *  both hide the "Live Demo" button when this is missing rather than
   *  rendering a broken link. */
  liveUrl?: string;
  featured: boolean;
  accentColor: string; // Tailwind gradient or hex
  badgeText: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  color: string;
  skills: {
    name: string;
    level: "Advanced" | "Proficient" | "Specialized";
    badge?: string;
  }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  impactPoints: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
  details: string;
  coursework: string[];
  achievements: string[];
}

export interface PersonalInfo {
  name: string;
  /** Short studio/site wordmark shown in the Navbar logo — also the
   *  start-word the Hero's scramble animation resolves from, so keep
   *  this in sync with Hero's START_WORD if you change it. */
  brand: string;
  /** Short two-word role shown large in the hero, e.g. "Software Developer".
   *  The Hero component splits this on the first space and renders the
   *  first word bold / the rest italic — keep it to two words for that
   *  treatment to look right. */
  role: string;
  title: string;
  badge: string;
  heroHeadline: string;
  heroBio: string;
  aboutBio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  /** Chest-up portrait used behind/under the hero wordmark. Plain or
   *  transparent background works best since it sits directly on black.
   *  Drop the file in /public/images/ and point this at it. */
  heroPhoto: string;
  stats: { value: string; label: string; sub: string }[];
}

export const portfolioData = {
  personal: {
    name: "Seemab Ali",
    brand: "Seemab",
    role: "Full-Stack Developer",
    title: "AI-Powered Full-Stack Developer | Python | MERN | AWS",
    badge: "Available for opportunities",
    heroHeadline: "Building modern digital experiences with code & AI.",
    heroBio:
      "I’m Seemab Ali, a Software Engineering graduate and modern web developer focused on building fast, scalable, and user-friendly web applications.",
    aboutBio:
      "I engineer clean, performant, and intuitive web applications using React, Next.js, TypeScript, and full-stack architectures. With a strong foundation in Software Engineering and a passion for modern AI integrations, I bridge the gap between complex backend systems and delightful user interfaces.",
    location: "Pakistan (Remote / Worldwide)",
    email: "seemabali@proton.me",
    github: "https://github.com/seemabali",
    linkedin: "https://linkedin.com/in/seemabali7335",
    resumeUrl: "/files/Seemab_MERN.pdf",
    heroPhoto: "/images/hero-portrait.png",
    stats: [
      { value: "10+", label: "Projects Completed", sub: "Production & Academic" },
      { value: "Full-Stack", label: "Core Experience", sub: "React, Next.js, Nodejs, Sitecore AI" },
      { value: "2022–2026", label: "BS Software Eng.", sub: "Virtual University" },
      { value: "AI + Web", label: "Specialization", sub: "LLMs, LangChain, APIs" },
    ],
  } as PersonalInfo,

  skills: [
    {
      title: "Frontend",
      description: "Crafting fluid, high-performance, and responsive user interfaces with modern React ecosystem.",
      iconName: "Layout",
      color: "from-blue-500 to-cyan-400",
      skills: [
        { name: "React.js", level: "Advanced", badge: "Core" },
        { name: "Next.js (App Router)", level: "Advanced", badge: "Primary" },
        { name: "TypeScript", level: "Advanced", badge: "Strict" },
        { name: "JavaScript (ES6+)", level: "Advanced" },
        { name: "HTML5 & Semantic Web", level: "Advanced" },
        { name: "CSS3 & Modern Layouts", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced", badge: "Favorite" },
      ],
    },
    {
      title: "Backend",
      description: "Designing scalable server architectures, secure RESTful APIs, and reliable database schemas.",
      iconName: "Server",
      color: "from-emerald-500 to-teal-400",
      skills: [
        { name: "Node.js", level: "Proficient", badge: "Runtime" },
        { name: "Express.js", level: "Proficient", badge: "API Engine" },
        { name: "MongoDB & Mongoose", level: "Proficient", badge: "NoSQL" },
        { name: "RESTful APIs & Microservices", level: "Advanced" },
        { name: "Sitecore XM Cloud", level: "Proficient", badge: "Enterprise" },
      ],
    },
    {
      title: "AI & Modern Development",
      description: "Integrating intelligent LLM workflows, automated agents, and Python microservices.",
      iconName: "Cpu",
      color: "from-purple-500 to-pink-400",
      skills: [
        { name: "OpenAI API (GPT-4 / Assistants)", level: "Proficient", badge: "AI" },
        { name: "LangChain", level: "Proficient", badge: "Orchestration" },
        { name: "FastAPI", level: "Proficient", badge: "Python API" },
        { name: "AI API Integration & RAG", level: "Specialized" },
      ],
    },
    {
      title: "Tools & DevOps",
      description: "Modern development workflows, version control, enterprise CMS, and cloud deployment.",
      iconName: "Wrench",
      color: "from-amber-500 to-orange-400",
      skills: [
        { name: "Git & Version Control", level: "Advanced" },
        { name: "GitHub & CI/CD", level: "Advanced" },
        { name: "Postman", level: "Advanced", badge: "API Testing" },
        { name: "Sitecore CMS", level: "Proficient", badge: "Enterprise" },
        { name: "Vercel & Cloud Deployments", level: "Advanced" },
        { name: "MongoDB Atlas", level: "Proficient" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "codescry-ai",
      title: "CodeScry AI",
      tagline: "AI-Powered Code Review & Quality Intelligence Platform",
      description:
        "An intelligent developer tool that inspects repositories, detects code smells and security vulnerabilities, and generates structured AI-driven review reports.",
      longDescription:
        "CodeScry AI is an enterprise-grade AI code review assistant. It connects directly with code repositories or raw snippets, executes static analysis through a FastAPI microservice, and leverages OpenAI & LangChain to synthesize actionable bug fixes, complexity insights, and security patches with instant markdown report generation.",
      category: "AI & Full-Stack",
      technologies: [
        "Next.js",
        "TypeScript",
        "Express.js",
        "MongoDB",
        "FastAPI",
        "OpenAI",
        "LangChain",
        "Tailwind CSS",
      ],
      features: [
        "AI automated code reviews with syntax & security analysis",
        "Structured review reports with severity ratings and code fixes",
        "Secure user authentication and protected developer dashboard",
        "Historical review timeline and diff comparison logs",
        "Asynchronous AI microservice architecture using FastAPI & LangChain",
        "Exportable PDF and Markdown code quality summaries",
      ],
      metrics: [
        { label: "Review Speed", value: "< 2.4s" },
        { label: "Accuracy Rate", value: "98.2%" },
        { label: "Vulnerabilities Caught", value: "15+ Types" },
      ],
      githubUrl: "https://github.com/SeemabAli/codescry-ai",
      featured: true,
      accentColor: "from-blue-600 via-indigo-600 to-purple-600",
      badgeText: "Featured AI Project",
    },
    {
      id: "lecture-timetable-system",
      title: "Automated Lecture Timetable System",
      tagline: "Constraint-Based University Scheduling & Resource Optimization",
      description:
        "An automated scheduling platform designed to eliminate academic timetable clashes, allocate lecture halls dynamically, and respect faculty constraints.",
      longDescription:
        "Developed to resolve complex academic scheduling conflicts, this system employs algorithmic constraint satisfaction logic to generate optimal weekly timetables across departments. Features multi-role authentication for Deans, Faculty, and Students with real-time room clash prevention.",
      category: "Full-Stack Web",
      technologies: [
        "Next.js",
        "TypeScript",
        "MongoDB",
        "Mongoose",
        "NextAuth.js",
        "Tailwind CSS",
      ],
      features: [
        "Role-based access control (Admin, Department Head, Faculty, Student)",
        "Constraint-satisfaction automated timetable generation algorithm",
        "Faculty time-slot availability and workload preference management",
        "Comprehensive Course, Section, and Classroom allocation engine",
        "Instant conflict detection for room double-booking & instructor overlaps",
        "Responsive grid view with iCal/Excel export capabilities",
      ],
      metrics: [
        { label: "Clash Reduction", value: "100%" },
        { label: "Generation Time", value: "< 4s" },
        { label: "Supported Rooms", value: "50+ Venues" },
      ],
      githubUrl: "https://github.com/SeemabAli/fyp-altms",
      featured: true,
      accentColor: "from-emerald-600 via-teal-600 to-cyan-600",
      badgeText: "University Automation",
    },
    {
      id: "attendance-management-system",
      title: "Attendance Management System",
      tagline: "Full-Stack Enterprise MERN Attendance & Analytics Engine",
      description:
        "A robust MERN-based tracking platform for monitoring workforce attendance, generating monthly payroll-ready reports, and streamlining leave requests.",
      longDescription:
        "A scalable MERN stack web application built for academic institutions and corporate teams. Provides fine-grained attendance marking, leave approval workflows, QR/ID verification capabilities, and aggregate attendance trend visualization.",
      category: "Enterprise Systems",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Auth",
        "Tailwind CSS",
        "Chart.js",
      ],
      features: [
        "Daily attendance check-in / check-out with geolocation tagging",
        "Automated monthly percentage calculations & student/employee profiles",
        "Leave request submission, review, and approval workflow",
        "Comprehensive analytics dashboard with real-time visual charts",
        "CSV & PDF export for academic/HR compliance reporting",
        "Granular role-based permissions (Super Admin, Manager, Member)",
      ],
      metrics: [
        { label: "Uptime", value: "99.9%" },
        { label: "Data Export", value: "Instant CSV/PDF" },
        { label: "User Roles", value: "3 Tiers" },
      ],
      githubUrl: "https://github.com/seemabali/attendance-management-system",
      featured: true,
      accentColor: "from-amber-600 via-orange-600 to-red-600",
      badgeText: "MERN Stack Application",
    },
    {
      id: "bari-arabians",
      title: "Bari-Arabians Stud Farm",
      tagline: "Full-Stack Horse Listing Platform",
      description: "It is a horse listing platform built with NextJS and PostgreSQL",
      longDescription:
        "A full-stack platform for a working stud farm to list and manage horses online. Built with Next.js and PostgreSQL via Prisma, it handles authenticated user access, pedigree and lineage tracking, and detailed per-horse specification pages, replacing what was previously an offline paper-based catalog.",
      category: "NextJS & Database Application",
      technologies: ["NextJS", "Tailwind CSS", "PostgreSQL", "Prisma"],
      features: [
        "User authentication and authorization",
        "Horse listing and display",
        "Pedigree and lineage tracking",
        "Horse details and specifications",
        "User profiles and settings",
      ],
      metrics: [
        { label: "Uptime", value: "99.9%" },
        { label: "Horses", value: "10+" },
      ],
      githubUrl: "https://github.com/SeemabAli/bari-arabians",
      featured: true,
      accentColor: "from-green-600 via-emerald-600 to-teal-600",
      badgeText: "NextJS & Database Application",
    },
  ] as Project[],

  experience: [
    {
      role: "Junior Frontend Developer",
      company: "7 Kings Code LLC",
      location: "Lahore, Pakistan (Onsite)",
      period: "2026 – Present",
      type: "Professional Experience",
      description:
        "Driving modern frontend engineering and enterprise client solutions.",
      responsibilities: [
        "Architecting and delivering high-performance, responsive UI components using React.js, Next.js, and TypeScript.",
        "Collaborating with cross-functional engineering teams to implement enterprise web applications and modern digital solutions.",
        "Integrating and customizing Sitecore CMS templates, content authoring schemas, and dynamic components.",
        "Optimizing Core Web Vitals, page rendering performance, and cross-browser accessibility.",
        "Working closely with UI/UX designers to translate Figma mockups into pixel-perfect, interactive web interfaces.",
      ],
      technologies: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Sitecore CMS",
        "REST APIs",
        "Git",
        "Figma",
      ],
      impactPoints: [
        "Boosted frontend load performance by 35% across key client landing pages.",
        "Delivered 5+ enterprise-grade modules on time with 100% responsive test passes.",
        "Integrated Sitecore CMS rendering for streamlined marketing updates.",
      ],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "BS Software Engineering",
      institution: "Virtual University of Pakistan",
      period: "2022 – 2026",
      status: "Graduating 2026",
      details:
        "Comprehensive 4-year degree covering modern software engineering methodologies, data structures, full-stack web architecture, distributed systems, and AI principles.",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (OOP)",
        "Software Architecture & Design",
        "Web Systems & Technologies",
        "Database Management Systems (RDBMS & NoSQL)",
        "Operating Systems & Computer Networks",
        "Software Quality Engineering & Testing",
        "Artificial Intelligence & Machine Learning Fundamentals",
      ],
      achievements: [
        "Maintained strong academic standing in core Computer Science & Software Engineering tracks.",
        "Developed automated university timetable constraint solver as part of practical coursework.",
        "Active contributor to student programming seminars and full-stack development workshops.",
      ],
    },
  ] as EducationItem[],

  chatbot: {
    name: "Seemab AI",
    subtitle: "Ask me anything about Seemab Ali's skills, projects, and background.",
    suggestedQuestions: [
      "Who is Seemab Ali?",
      "What technologies does he use?",
      "Tell me about his projects",
      "What is his experience?",
      "How can I contact him?",
      "Is Seemab available for work?",
    ],
  },
};