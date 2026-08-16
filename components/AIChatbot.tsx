"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Trash2,
  Bot,
  User,
  Copy,
  Check,
  Minimize2,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const ACCENT = "#ccff00";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AIChatbot({ isOpen, onToggle }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: `Hello! I am **${portfolioData.chatbot.name}**, ${portfolioData.personal.name}'s portfolio AI assistant. How can I help you explore his skills, projects, work experience, or availability today?`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPastHero, setIsPastHero] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestedQuestions = portfolioData.chatbot.suggestedQuestions;

  // Track if user has scrolled past the hero banner
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        // Show floating button when hero banner is ending/ended (or past 200px)
        setIsPastHero(heroBottom <= 200);
      } else {
        setIsPastHero(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.reply ||
          `I apologize, I could not complete that response. Please reach out to ${portfolioData.personal.name.split(" ")[0]} directly at ${portfolioData.personal.email}!`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error("Chatbot request error:", error);
      const errorReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `An error occurred while connecting to the assistant. You can contact ${portfolioData.personal.name.split(" ")[0]} directly at **${portfolioData.personal.email}**!`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: `Chat cleared! Ask me anything about ${portfolioData.personal.name}'s background, engineering projects, tech stack, or full-time opportunities.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Simple Markdown Formatter Helper
  const formatMarkdown = (text: string) => {
    const boldFormatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const linkFormatted = boldFormatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      `<a href="$2" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80 font-medium" style="color:${ACCENT}">$1</a>`
    );
    const lines = linkFormatted.split("\n");
    return (
      <div className="space-y-1.5 leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;
          if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="mt-0.5 shrink-0 font-bold" style={{ color: ACCENT }}>
                  ›
                </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: line.replace(/^[-•]\s*/, ""),
                  }}
                />
              </div>
            );
          }
          return (
            <p
              key={idx}
              dangerouslySetInnerHTML={{ __html: line }}
              className="break-words"
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Button (Shown once hero banner has ended or when chat is open) */}
      <AnimatePresence>
        {(isPastHero || isOpen) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-[60]"
          >
            <div className="relative group">
              {/* Hover Tooltip */}
              {!isOpen && (
                <div
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border text-xs font-mono shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none"
                  style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI Assistant</span>
                </div>
              )}

              {/* Floating Pill / Spark Button */}
              <button
                type="button"
                onClick={onToggle}
                aria-label="Toggle AI Assistant"
                className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#080808] border text-white hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none shadow-[0_0_20px_rgba(204,255,0,0.25)]"
                style={{
                  borderColor: isOpen ? "#ffffff33" : `${ACCENT}66`,
                }}
              >
                <span
                  className="absolute -inset-1 rounded-2xl opacity-40 blur-sm group-hover:opacity-80 transition duration-300 pointer-events-none"
                  style={{ backgroundColor: `${ACCENT}22` }}
                />
                <div className="relative z-10 flex items-center justify-center">
                  {isOpen ? (
                    <X className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
                  ) : (
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" style={{ color: ACCENT }} />
                  )}
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Card (Z-index 60: sits above navbar and content) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-20 sm:bottom-22 right-3 sm:right-6 z-[60] w-[calc(100vw-1.5rem)] sm:w-[410px] max-h-[calc(100dvh-6.5rem)] sm:max-h-[580px] h-[75vh] rounded-3xl bg-[#080808]/98 backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="px-4 py-3.5 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-xl border flex items-center justify-center shadow-[0_0_12px_rgba(204,255,0,0.2)]"
                    style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}12`, color: ACCENT }}
                  >
                    <Bot className="w-4 h-4" />
                  </div>
                  <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-black animate-pulse shadow-[0_0_6px_#ccff00]"
                    style={{ backgroundColor: ACCENT }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white tracking-tight">
                      {portfolioData.chatbot.name}
                    </h3>
                    <span
                      className="text-[9px] font-mono px-1.5 py-0.2 rounded border"
                      style={{ borderColor: `${ACCENT}4D`, color: ACCENT, backgroundColor: `${ACCENT}0D` }}
                    >
                      AI Online
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {portfolioData.chatbot.subtitle}
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onToggle}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  title="Minimize chat"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm [scrollbar-width:thin] [scrollbar-color:#333_transparent]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div
                      className="w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5"
                      style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}12`, color: ACCENT }}
                    >
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`relative max-w-[84%] rounded-2xl p-3.5 group shadow-sm ${
                      message.role === "user"
                        ? "text-black rounded-tr-none font-semibold shadow-[0_0_15px_rgba(204,255,0,0.15)]"
                        : "bg-white/[0.04] border border-white/10 text-gray-200 rounded-tl-none"
                    }`}
                    style={
                      message.role === "user" ? { backgroundColor: ACCENT } : undefined
                    }
                  >
                    {message.role === "assistant" ? (
                      formatMarkdown(message.content)
                    ) : (
                      <p className="break-words leading-relaxed text-xs sm:text-sm">{message.content}</p>
                    )}

                    <div
                      className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t text-[10px] ${
                        message.role === "user"
                          ? "border-black/15 text-black/60 font-mono"
                          : "border-white/5 text-gray-500 font-mono"
                      }`}
                    >
                      <span>{message.timestamp}</span>

                      {message.role === "assistant" && (
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white flex items-center gap-1 text-[10px]"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3 h-3" style={{ color: ACCENT }} />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copy</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="w-6 h-6 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-300 shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5 text-gray-400">
                  <div
                    className="w-6 h-6 rounded-lg border flex items-center justify-center shrink-0"
                    style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}12`, color: ACCENT }}
                  >
                    <Sparkles className="w-3 h-3 animate-spin" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/10 px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s]"
                      style={{ backgroundColor: ACCENT, opacity: 0.7 }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s]"
                      style={{ backgroundColor: ACCENT, opacity: 0.45 }}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3.5 py-2 border-t border-white/[0.06] bg-white/[0.01]">
              <div className="flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden text-[11px]">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/10 border border-white/10 hover:border-[#ccff00]/40 text-gray-300 hover:text-[#ccff00] transition-colors shrink-0 disabled:opacity-50 text-[11px]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white/[0.02] border-t border-white/[0.08] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Seemab's projects, skills..."
                disabled={isLoading}
                className="flex-1 bg-black/70 border border-white/10 focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl text-black font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shrink-0 shadow-[0_0_12px_rgba(204,255,0,0.3)]"
                style={{ backgroundColor: ACCENT }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}