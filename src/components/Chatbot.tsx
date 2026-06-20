"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { parseCompanyName, parseTimeline } from "@/lib/chatbot/leadParsing";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type ChatDoneEvent = {
  type: "done";
  intent: "info" | "project" | "pricing" | "casual" | "lead";
  lead_collected: boolean;
  lead_draft?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    project_type?: string;
    industry?: string;
    description?: string;
    timeline?: string;
    selected_services?: string[];
  };
  suggested_followups?: string[];
};

const SESSION_KEY = "qbrix_chat_session_id";
const INITIAL_QUICK_OPTIONS = [
  "I need an AI chatbot",
  "Automate manual workflows",
  "Build a custom ML model",
  "AI for analytics",
];

function getOrCreateSessionId(): string {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) return stored;
  } catch {}
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `qbrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  try {
    localStorage.setItem(SESSION_KEY, id);
  } catch {}
  return id;
}

function newSessionId(): string {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `qbrix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  try {
    localStorage.setItem(SESSION_KEY, id);
  } catch {}
  return id;
}

const welcomeMessage = (): Message => ({
  id: "welcome-1",
  text: "Hi! Tell me what you want to build and I'll suggest a practical AI approach for your business.",
  sender: "bot",
  timestamp: new Date(),
});

// --- Sub-components ---

const TypingDots = () => (
  <div className="flex justify-start items-start gap-2">
    <Image src="/images/qbrix-logo-mark.svg" alt="" width={24} height={24} className="w-6 h-6 mt-1 shrink-0" />
    <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-gray-400 rounded-full block"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.13 }}
        />
      ))}
    </div>
  </div>
);

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }).catch(() => {});
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full w-6 h-6 text-[10px] flex items-center justify-center shadow-sm hover:bg-gray-50 z-10"
      aria-label={copied ? "Copied!" : "Copy message"}
      title={copied ? "Copied!" : "Copy"}
    >
      {copied ? "✓" : "⧉"}
    </button>
  );
}

const MessageBubble = memo(function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "user";
  const time = message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (isUser) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
        <div className="max-w-[80%]">
          <div className="px-4 py-2.5 rounded-2xl rounded-br-md bg-blue-600 text-white text-sm leading-relaxed">
            {message.text}
          </div>
          <p className="text-[10px] text-gray-400 text-right mt-0.5 pr-1">{time}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start items-start gap-2">
      <Image src="/images/qbrix-logo-mark.svg" alt="QBrix" width={24} height={24} className="w-6 h-6 mt-1 shrink-0" />
      <div className="max-w-[80%]">
        <div className="relative group px-4 py-2.5 rounded-2xl rounded-bl-md bg-gray-100 text-gray-800 text-sm leading-relaxed">
          <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:text-gray-900 prose-code:text-xs prose-code:bg-gray-200 prose-code:px-1 prose-code:rounded prose-headings:text-sm prose-headings:font-semibold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
          </div>
          <CopyButton text={message.text} />
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5 pl-1">{time}</p>
      </div>
    </motion.div>
  );
});

// --- Main component ---

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage()]);
  const [inputValue, setInputValue] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [quickOptions, setQuickOptions] = useState<string[]>(INITIAL_QUICK_OPTIONS);
  const [llmMode, setLlmMode] = useState<boolean | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const sessionIdRef = useRef<string>("");
  const leadSavedRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Keep ref in sync
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  // Init session from localStorage
  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();
  }, []);

  // Check LLM config
  useEffect(() => {
    let cancelled = false;
    fetch("/api/chat", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { llm?: boolean }) => { if (!cancelled) setLlmMode(Boolean(d.llm)); })
      .catch(() => { if (!cancelled) setLlmMode(false); });
    return () => { cancelled = true; };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [inputValue]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaiting, quickOptions]);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
      setUnreadCount(0);
    }
  }, [isOpen]);

  const maybeSaveLead = useCallback(async (transcript: Message[], draft?: ChatDoneEvent["lead_draft"]) => {
    if (leadSavedRef.current) return;
    const fullText = transcript.filter((m) => m.sender === "user").map((m) => m.text).join("\n");
    const email = draft?.email || fullText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)?.[0];
    if (!email) return;

    try {
      const res = await fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft?.name || email.split("@")[0],
          email,
          phone: draft?.phone || fullText.match(/(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/)?.[0] || undefined,
          company: draft?.company || parseCompanyName(fullText) || undefined,
          project_type: draft?.project_type || "AI/ML Solution",
          industry: draft?.industry || "General",
          timeline: draft?.timeline || parseTimeline(fullText) || undefined,
          selected_services: draft?.selected_services || [],
          description: (draft?.description || fullText).slice(0, 1800),
          transcript: fullText.slice(0, 7000),
          session_id: sessionIdRef.current,
          timestamp: new Date().toISOString(),
        }),
      });
      if (res.ok) leadSavedRef.current = true;
    } catch { /* non-blocking */ }
  }, []);

  const askAssistant = useCallback(async (message: string, transcript: Message[]) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsWaiting(true);
    setIsStreaming(false);

    const botMsgId = `${Date.now()}-bot`;
    let firstToken = true;

    try {
      if (llmMode === false) {
        setIsWaiting(false);
        const errMsg: Message = {
          id: botMsgId,
          text: "The assistant needs **OPENAI_API_KEY** configured.\n\n- **Local:** add it to `.env.local` and restart `npm run dev`\n- **Vercel:** Project → Settings → Environment Variables → add `OPENAI_API_KEY` → Redeploy",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errMsg]);
        if (!isOpenRef.current) setUnreadCount((n) => n + 1);
        return;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, session_id: sessionIdRef.current }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        setIsWaiting(false);
        setMessages((prev) => [
          ...prev,
          { id: botMsgId, text: "Something went wrong. Please try again.", sender: "bot", timestamp: new Date() },
        ]);
        if (!isOpenRef.current) setUnreadCount((n) => n + 1);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const raw = line.slice(5).trim();
          if (!raw) continue;

          let evt: Record<string, unknown>;
          try { evt = JSON.parse(raw) as Record<string, unknown>; } catch { continue; }

          if (evt.type === "token" && typeof evt.content === "string") {
            if (firstToken) {
              firstToken = false;
              setIsWaiting(false);
              setIsStreaming(true);
              setMessages((prev) => [
                ...prev,
                { id: botMsgId, text: evt.content as string, sender: "bot", timestamp: new Date() },
              ]);
            } else {
              setMessages((prev) =>
                prev.map((m) => m.id === botMsgId ? { ...m, text: m.text + (evt.content as string) } : m)
              );
            }
          } else if (evt.type === "done") {
            setIsStreaming(false);
            const done = evt as unknown as ChatDoneEvent;
            if (Array.isArray(done.suggested_followups) && done.suggested_followups.length > 0) {
              setQuickOptions(done.suggested_followups.slice(0, 5));
            }
            if (done.lead_collected) void maybeSaveLead(transcript, done.lead_draft);
            if (!isOpenRef.current) setUnreadCount((n) => n + 1);
          } else if (evt.type === "error") {
            setIsWaiting(false);
            setIsStreaming(false);
            if (firstToken) {
              firstToken = false;
              const rawErr = typeof evt.message === "string" ? evt.message : "";
              const friendly = rawErr.includes("401") || rawErr.includes("Authentication")
                ? "Invalid API key — check **OPENAI_API_KEY** in Vercel environment variables."
                : rawErr.includes("429")
                ? "OpenAI rate limit reached. Please try again in a moment."
                : rawErr.includes("404") || rawErr.includes("model")
                ? `Model not found. Set **OPENAI_MODEL=gpt-4o-mini** in Vercel environment variables.`
                : "Assistant unavailable. Please try again.";
              setMessages((prev) => [
                ...prev,
                { id: botMsgId, text: friendly, sender: "bot", timestamp: new Date() },
              ]);
              if (!isOpenRef.current) setUnreadCount((n) => n + 1);
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setIsWaiting(false);
      setIsStreaming(false);
      if (firstToken) {
        setMessages((prev) => [
          ...prev,
          { id: botMsgId, text: "Network error — check your connection and try again.", sender: "bot", timestamp: new Date() },
        ]);
        if (!isOpenRef.current) setUnreadCount((n) => n + 1);
      }
    } finally {
      setIsWaiting(false);
      setIsStreaming(false);
    }
  }, [llmMode, maybeSaveLead]);

  const isBusy = isWaiting || isStreaming;

  const send = useCallback((raw: string) => {
    const text = raw.trim();
    if (!text || isBusy || llmMode === null || !sessionIdRef.current) return;
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    const userMsg: Message = {
      id: `${Date.now()}-u-${Math.random().toString(36).slice(2, 7)}`,
      text,
      sender: "user",
      timestamp: new Date(),
    };
    const transcript = [...messages, userMsg];
    setMessages(transcript);
    setQuickOptions([]);
    void askAssistant(text, transcript);
  }, [askAssistant, isBusy, llmMode, messages]);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    leadSavedRef.current = false;
    setMessages([welcomeMessage()]);
    setInputValue("");
    setQuickOptions(INITIAL_QUICK_OPTIONS);
    setIsWaiting(false);
    setIsStreaming(false);
    setUnreadCount(0);
    sessionIdRef.current = newSessionId();
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, []);

  const statusLabel =
    llmMode === null ? "Connecting…" :
    !llmMode ? "Configure API key" :
    isBusy ? "Typing…" : "Online · AI Consultant";

  return (
    <>
      {/* Floating action button */}
      <motion.button
        type="button"
        aria-expanded={isOpen}
        aria-controls="qbrix-chat-panel"
        aria-label={isOpen ? "Close chat" : "Open chat with QBrix AI Consultant"}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
              className="w-6 h-6 text-white"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="w-7 h-7 text-white"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {!isOpen && unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="qbrix-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-label="QBrix AI Consultant"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-[min(100vw-2rem,28rem)] h-[min(100dvh-8rem,580px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Image src="/images/qbrix-logo-mark.svg" alt="QBrix" width={28} height={28} className="w-7 h-7" />
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-blue-600 ${
                      llmMode === true ? "bg-green-400" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">QBrix AI Consultant</h3>
                  <p className="text-xs text-blue-100">{statusLabel}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={clearChat}
                title="New conversation"
                aria-label="Start new conversation"
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isWaiting && <TypingDots />}

              {!isBusy && quickOptions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-1.5 pt-1 pl-8"
                >
                  {quickOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => send(opt)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-medium hover:bg-blue-100 active:scale-95 transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-4 pt-3 pb-4 border-t border-gray-100 shrink-0 bg-white">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(inputValue);
                    }
                  }}
                  placeholder="What are you trying to build?"
                  disabled={isBusy || llmMode === null}
                  className="flex-1 min-w-0 px-4 py-2.5 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden leading-snug disabled:opacity-50"
                  style={{ minHeight: "42px", maxHeight: "120px" }}
                />
                <button
                  type="button"
                  onClick={() => send(inputValue)}
                  disabled={!inputValue.trim() || isBusy || llmMode === null}
                  aria-label="Send message"
                  className="w-10 h-10 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:opacity-40 hover:bg-blue-700 active:scale-95 transition-all mb-0.5"
                >
                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-1.5">
                Shift+Enter for new line · Powered by GPT-4o
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
