"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type ChatApiResponse = {
  reply: string;
  intent: "info" | "project" | "pricing" | "casual" | "lead";
  lead_collected: boolean;
  suggested_followups?: string[];
};

const INITIAL_QUICK_OPTIONS = ["Build AI Model", "Create Chatbot", "Automation Solution", "Data Analytics"];

const initialMessages = (): Message[] => [
  {
    id: "welcome-1",
    text:
      "Hi, I am your QBrix AI consultant. Tell me what you want to build and I will recommend a practical AI/ML solution.",
    sender: "bot",
    timestamp: new Date(),
  },
];

const MessageBubble = memo(function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isUser ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-100 text-gray-800 rounded-bl-md"}`}>
        <p className="text-sm whitespace-pre-line">{message.text}</p>
      </div>
    </motion.div>
  );
});

function newSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `qbrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => initialMessages());
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [quickOptions, setQuickOptions] = useState<string[]>(INITIAL_QUICK_OPTIONS);
  const [llmMode, setLlmMode] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const sessionIdRef = useRef<string>(newSessionId());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, quickOptions, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/chat");
        if (!res.ok) return;
        const data = (await res.json()) as { llm?: boolean };
        if (!cancelled) setLlmMode(Boolean(data.llm));
      } catch {
        setLlmMode(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addBotMessage = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-bot-${Math.random().toString(36).slice(2, 7)}`,
        text,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const maybeSaveLead = useCallback(async (transcript: Message[]) => {
    if (leadSaved) return;
    const fullUserText = transcript
      .filter((m) => m.sender === "user")
      .map((m) => m.text)
      .join("\n");

    const email = fullUserText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)?.[0];
    if (!email) return;

    const projectType = /vision|ocr/i.test(fullUserText)
      ? "Computer Vision"
      : /automation/i.test(fullUserText)
        ? "Automation"
        : /analytics|dashboard/i.test(fullUserText)
          ? "Data Analytics"
          : "AI/ML Solution";

    const industry = /health/i.test(fullUserText)
      ? "Healthcare"
      : /e-?commerce|retail/i.test(fullUserText)
        ? "E-commerce"
        : /finance/i.test(fullUserText)
          ? "Finance"
          : "General";

    const name = email.split("@")[0] || "Website Visitor";
    try {
      const res = await fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          project_type: projectType,
          industry,
          description: fullUserText.slice(0, 1800),
          timestamp: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setLeadSaved(true);
      }
    } catch {
      /* non-blocking */
    }
  }, [leadSaved]);

  const askAssistant = useCallback(async (message: string, transcript: Message[]) => {
    setIsTyping(true);
    try {
      if (!llmMode) {
        addBotMessage("LLM mode is not configured yet. Please set OPENAI_API_KEY and refresh.");
        setIsTyping(false);
        return;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          session_id: sessionIdRef.current,
        }),
      });

      if (!res.ok) {
        addBotMessage("I could not process that request right now. Please try again in a moment.");
        setIsTyping(false);
        return;
      }

      const data = (await res.json()) as ChatApiResponse;
      addBotMessage(data.reply);
      if (Array.isArray(data.suggested_followups) && data.suggested_followups.length > 0) {
        setQuickOptions(data.suggested_followups.slice(0, 6));
      }

      if (data.lead_collected) {
        void maybeSaveLead(transcript);
      }
    } catch {
      addBotMessage("Network issue while contacting the assistant. Please retry.");
    } finally {
      setIsTyping(false);
    }
  }, [addBotMessage, llmMode, maybeSaveLead]);

  const send = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text || isTyping) return;
    setInputValue("");

    const userMsg: Message = {
      id: `${Date.now()}-u-${Math.random().toString(36).slice(2, 7)}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };

    const transcript = [...messages, userMsg];
    setMessages(transcript);
    void askAssistant(text, transcript);
  }, [askAssistant, isTyping, messages]);

  const clearChat = useCallback(() => {
    setMessages(initialMessages());
    setInputValue("");
    setQuickOptions(INITIAL_QUICK_OPTIONS);
    setLeadSaved(false);
    sessionIdRef.current = newSessionId();
  }, []);

  return (
    <>
      <motion.button
        type="button"
        aria-expanded={isOpen}
        aria-controls="qbrix-chat-panel"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white text-2xl">
              ×
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white text-xl">
              💬
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="qbrix-chat-panel"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-[min(100vw-2rem,26rem)] h-[min(100dvh-8rem,520px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image src="/images/qbrix-logo-mark.svg" alt="QBrix" width={40} height={40} className="h-10 w-10" />
                  <div>
                    <h3 className="font-semibold">QBrix AI Consultant</h3>
                    <p className="text-sm text-blue-100">{llmMode ? "RAG + Sales Qualification" : "Configure OPENAI_API_KEY"}</p>
                  </div>
                </div>
                <button type="button" onClick={clearChat} className="p-1 hover:bg-white/20 rounded-full" aria-label="Clear chat history">
                  ↻
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md px-4 py-2 text-sm">Thinking...</div>
                </div>
              )}

              {!isTyping && quickOptions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {quickOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => send(option)}
                      className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(inputValue);
                    }
                  }}
                  placeholder="Describe your AI project..."
                  className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isTyping}
                />
                <button
                  type="button"
                  onClick={() => send(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:opacity-50"
                  aria-label="Send message"
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
