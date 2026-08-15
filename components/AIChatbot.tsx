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
  MessageSquare,
  ChevronDown,
  Copy,
  Check,
  Minimize2,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

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
      content:
        "Hello! I am **Seemab AI**, Seemab Ali's official portfolio assistant. How can I help you explore his skills, projects, experience, or availability today?",
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

  // Auto-scroll to bottom of chat
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
          "I apologize, I could not complete that response. Please reach out to Seemab directly at seemab.dev@gmail.com!",
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
        content:
          "An error occurred while connecting to the assistant. You can contact Seemab directly at **seemab.dev@gmail.com**!",
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
        content:
          "Chat cleared! Ask me anything about Seemab Ali's background, projects, skills, or get in touch for opportunities.",
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
    // Replace **bold** with <strong>
    const boldFormatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Replace [link](url) with <a>
    const linkFormatted = boldFormatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-300 underline hover:text-cyan-200">$1</a>'
    );
    // Split into paragraphs / bullets
    const lines = linkFormatted.split("\n");
    return (
      <div className="space-y-1.5 leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;
          if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-cyan-400 mt-1 shrink-0">›</span>
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
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b1222] border border-purple-500/30 text-xs font-medium text-purple-200 shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Ask my AI assistant</span>
            </div>
          )}

          {/* Floating Pill / Spark Button */}
          <button
            type="button"
            onClick={onToggle}
            aria-label="Open AI Assistant"
            className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
          >
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 opacity-40 blur-sm group-hover:opacity-80 transition duration-300" />
            <div className="relative z-10 flex items-center justify-center">
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Slide-Up Glassmorphism Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[600px] h-[82vh] rounded-3xl bg-[#090f1e]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#0d162d] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 p-[1px] shadow-md">
                    <div className="w-full h-full bg-[#070d1d] rounded-[15px] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-purple-300" />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#090f1e] radar-dot" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white tracking-tight">
                      {portfolioData.chatbot.name}
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/20">
                      GPT-4o Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {portfolioData.chatbot.subtitle}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onToggle}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
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
                  className={`flex gap-2.5 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-7 h-7 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`relative max-w-[82%] rounded-2xl p-3.5 group ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-md shadow-blue-500/20"
                        : "bg-[#0f172a]/90 border border-white/10 text-slate-200 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {/* Message content */}
                    {message.role === "assistant" ? (
                      formatMarkdown(message.content)
                    ) : (
                      <p className="break-words leading-relaxed">
                        {message.content}
                      </p>
                    )}

                    {/* Timestamp & Copy */}
                    <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-white/5 text-[10px] text-slate-400">
                      <span>{message.timestamp}</span>

                      {message.role === "assistant" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyMessage(message.id, message.content)
                          }
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-white flex items-center gap-1 text-[10px]"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copy</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="w-7 h-7 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5 text-slate-400">
                  <div className="w-7 h-7 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-[#0f172a] border border-white/10 px-3 py-2 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompt Chips */}
            <div className="px-4 py-2 border-t border-white/[0.06] bg-[#070c1a]">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-purple-900/30 border border-white/10 hover:border-purple-400/40 text-slate-300 hover:text-purple-200 transition-colors shrink-0 disabled:opacity-50"
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
              className="p-3 bg-[#0d162d] border-t border-white/[0.08] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about skills, projects, experience..."
                disabled={isLoading}
                className="flex-1 bg-slate-900/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
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
