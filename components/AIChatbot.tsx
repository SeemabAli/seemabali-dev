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
  Cpu,
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
      content: `Hello! I am **Seemi AI**, ${portfolioData.personal.name}'s dynamic AI assistant powered by **Gemini 3.6 Flash**. Ask me anything about his AI architecture, full-stack experience, project portfolio, or availability!`,
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
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestedQuestions = [
    "What is CodeScry AI's RAG stack?",
    "What are Seemab's primary technical skills?",
    "Tell me about his enterprise work at CWS Group.",
    "Is Seemab available for full-time roles?",
  ];

  // Track if user has scrolled past the hero banner
  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        const heroBottom = heroElement.getBoundingClientRect().bottom;
        setIsPastHero(heroBottom <= 200);
      } else {
        setIsPastHero(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom("auto");
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 150);
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
          `I apologize, I could not complete that response. Please reach out to Seemab directly at ${portfolioData.personal.email}!`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (error) {
      console.error("Gemini Chatbot request error:", error);
      const errorReply: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `An error occurred while connecting to Gemini API. You can contact Seemab directly at **${portfolioData.personal.email}**!`,
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
        content: `Chat history cleared! Ask me anything about Seemab's technical skills, CodeScry AI architecture, or full-stack projects.`,
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

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && isPastHero && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0d1424] text-white border border-[#ccff00]/40 shadow-[0_0_25px_rgba(204,255,0,0.25)] hover:shadow-[0_0_35px_rgba(204,255,0,0.4)] transition-all duration-300 group"
            aria-label="Toggle Portfolio AI Assistant"
          >
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#ccff00] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 radar-dot" />
            </div>
            <span className="text-xs font-semibold tracking-wide hidden sm:inline text-slate-200 group-hover:text-white">
              Ask Seemi AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Modal / Floating Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "fixed" }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[calc(100vh-4rem)] flex flex-col rounded-2xl glass-card-glow border border-white/15 overflow-hidden shadow-2xl bg-slate-950/90 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center gap-3">
                <div className="relative p-2 rounded-xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00]">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Seemi AI
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      Gemini 3.6
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Seemab Ali Representative
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
                  title="Clear Chat History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onToggle}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div
              ref={messagesContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm scrollbar-thin"
            >
              {messages.map((message) => {
                const isUser = message.role === "user";
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg text-xs font-bold ${
                        isUser
                          ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                          : "bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30"
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div className="flex flex-col max-w-[82%] group">
                      <div
                        className={`p-3.5 rounded-2xl text-slate-200 leading-relaxed ${
                          isUser
                            ? "bg-sky-600/30 border border-sky-500/30 rounded-tr-none text-white"
                            : "bg-slate-900/80 border border-white/10 rounded-tl-none"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>

                      <div
                        className={`flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-500 ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <span>{message.timestamp}</span>
                        {!isUser && (
                          <button
                            onClick={() => handleCopyMessage(message.id, message.content)}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-200 transition-opacity"
                          >
                            {copiedId === message.id ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="p-1.5 rounded-lg bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/30">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-900/80 border border-white/10 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-bounce" />
                    <span
                      className="w-2 h-2 rounded-full bg-[#ccff00] animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-[#ccff00] animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Pills */}
            {messages.length < 4 && (
              <div className="px-4 py-2 border-t border-white/5 bg-slate-950/60 overflow-x-auto flex gap-2 text-xs scrollbar-none">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 hover:border-[#ccff00]/40 transition-all text-[11px]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-white/10 bg-slate-900/90 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, CodeScry AI, or availability..."
                className="flex-1 bg-slate-950 text-white placeholder-slate-500 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#ccff00]/50 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-[#ccff00] text-slate-950 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
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