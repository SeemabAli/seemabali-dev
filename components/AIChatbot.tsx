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
      content: `Hello! I am **${portfolioData.chatbot.name}**, ${portfolioData.personal.name}'s official portfolio assistant. How can I help you explore his skills, projects, experience, or availability today?`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestedQuestions = portfolioData.chatbot.suggestedQuestions;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Lock page scroll while the chat panel is open on mobile, same pattern
  // used by the project modal, so the page behind doesn't scroll with it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth >= 640) return; // desktop panel is small/fixed, no lock needed
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
        content: `Chat cleared! Ask me anything about ${portfolioData.personal.name}'s background, projects, skills, or get in touch for opportunities.`,
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
      `<a href="$2" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-80" style="color:${ACCENT}">$1</a>`
    );
    const lines = linkFormatted.split("\n");
    return (
      <div className="space-y-1.5 leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;
          if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="mt-1 shrink-0" style={{ color: ACCENT }}>
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
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative group">
          {/* Tooltip */}
          {!isOpen && (
            <div
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black border text-xs font-medium shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ borderColor: `${ACCENT}4D`, color: ACCENT }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask my AI assistant</span>
            </div>
          )}

          {/* Floating Pill / Spark Button */}
          <button
            type="button"
            onClick={onToggle}
            aria-label="Open AI Assistant"
            className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-black border text-white hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
            style={{
              borderColor: `${ACCENT}66`,
              boxShadow: `0 0 25px ${ACCENT}33`,
            }}
          >
            <span
              className="absolute -inset-1 rounded-2xl opacity-40 blur-sm group-hover:opacity-80 transition duration-300"
              style={{ backgroundColor: `${ACCENT}33` }}
            />
            <div className="relative z-10 flex items-center justify-center">
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Sparkles className="w-6 h-6 animate-pulse" style={{ color: ACCENT }} />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Slide-Up Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[600px] h-[82vh] rounded-3xl bg-black/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-2xl border flex items-center justify-center"
                    style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}12`, color: ACCENT }}
                  >
                    <Bot className="w-5 h-5" />
                  </div>
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black animate-pulse"
                    style={{ backgroundColor: ACCENT }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white tracking-tight">
                      {portfolioData.chatbot.name}
                    </h3>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                      style={{ borderColor: `${ACCENT}33`, color: ACCENT }}
                    >
                      AI Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    {portfolioData.chatbot.subtitle}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onToggle}
                  className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {message.role === "assistant" && (
                    <div
                      className="w-7 h-7 rounded-xl border flex items-center justify-center shrink-0 mt-1"
                      style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}12`, color: ACCENT }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`relative max-w-[82%] rounded-2xl p-3.5 group ${message.role === "user"
                        ? "text-black rounded-br-none font-medium"
                        : "bg-white/[0.05] border border-white/10 text-gray-200 rounded-bl-none"
                      }`}
                    style={
                      message.role === "user" ? { backgroundColor: ACCENT } : undefined
                    }
                  >
                    {message.role === "assistant" ? (
                      formatMarkdown(message.content)
                    ) : (
                      <p className="break-words leading-relaxed">{message.content}</p>
                    )}

                    <div
                      className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t text-[10px] ${message.role === "user"
                          ? "border-black/10 text-black/60"
                          : "border-white/5 text-gray-500"
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
                    <div className="w-7 h-7 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5 text-gray-500">
                  <div
                    className="w-7 h-7 rounded-xl border flex items-center justify-center shrink-0"
                    style={{ borderColor: `${ACCENT}4D`, backgroundColor: `${ACCENT}12`, color: ACCENT }}
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-white/[0.05] border border-white/10 px-3 py-2 rounded-2xl rounded-bl-none flex items-center gap-1.5">
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

            {/* Suggested Prompt Chips */}
            <div className="px-4 py-2 border-t border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors shrink-0 disabled:opacity-50"
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
              className="p-3 bg-white/[0.03] border-t border-white/[0.08] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, projects, experience..."
                disabled={isLoading}
                className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ccff00] transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                style={{ backgroundColor: ACCENT }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}