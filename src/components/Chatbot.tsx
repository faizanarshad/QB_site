"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, memo, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CHATBOT_WELCOME, expandQuickReply, matchBotReply } from "../lib/chatbotEngine";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  quickReplies?: string[];
}

/** Brief typing state so layout feels responsive without blocking the main thread long */
const TYPING_MS = 140;

const initialMessages = (): Message[] => [
  {
    id: "1",
    text: CHATBOT_WELCOME.text,
    sender: "bot",
    timestamp: new Date(),
    quickReplies: CHATBOT_WELCOME.quickReplies,
  },
];

type MessageBubbleProps = {
  message: Message;
};

const MessageBubble = memo(function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isUser ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-100 text-gray-800 rounded-bl-md"
        }`}
      >
        <p className="text-sm whitespace-pre-line">{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-blue-100" : "text-gray-500"}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </motion.div>
  );
});

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => initialMessages());
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  const appendBotReply = useCallback((replyText: string) => {
    const response = matchBotReply(replyText);
    const botMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      text: response.text,
      sender: "bot",
      timestamp: new Date(),
      quickReplies: response.quickReplies,
    };
    startTransition(() => {
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setShowQuickReplies(true);
    });
  }, []);

  const processUserInput = useCallback(
    (rawInput: string) => {
      const query = expandQuickReply(rawInput);
      setIsTyping(true);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        typingTimerRef.current = null;
        appendBotReply(query);
      }, TYPING_MS);
    },
    [appendBotReply]
  );

  const handleQuickReply = useCallback(
    (reply: string) => {
      setShowQuickReplies(false);
      const userMessage: Message = {
        id: `${Date.now()}-u`,
        text: reply,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      processUserInput(reply);
    },
    [processUserInput]
  );

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;
    const message = inputValue.trim();
    setInputValue("");
    setShowQuickReplies(false);

    const userMessage: Message = {
      id: `${Date.now()}-u`,
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    processUserInput(message);
  }, [inputValue, processUserInput]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const clearChat = useCallback(() => {
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setIsTyping(false);
    setMessages(initialMessages());
    setShowQuickReplies(true);
  }, []);

  const lastBot = useMemo(() => {
    const last = messages[messages.length - 1];
    if (!last || last.sender !== "bot") return null;
    return last;
  }, [messages]);

  return (
    <>
      <motion.button
        type="button"
        aria-expanded={isOpen}
        aria-controls="qbrix-chat-panel"
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="qbrix-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qbrix-chat-title"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-[min(100vw-2rem,24rem)] h-[min(100dvh-8rem,500px)] max-h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Image
                      src="/images/qbrix-logo.png"
                      alt="QBrix Solutions"
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 id="qbrix-chat-title" className="font-semibold">
                      QBrix assistant
                    </h3>
                    <p className="text-sm text-blue-100">Site guide • Instant replies</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={clearChat}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    title="Clear chat"
                    aria-label="Clear chat history"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {showQuickReplies && lastBot?.quickReplies && lastBot.quickReplies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {lastBot.quickReplies.map((reply) => (
                    <motion.button
                      type="button"
                      key={reply}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200 text-left max-w-full"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </motion.div>
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
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about services, team, careers…"
                  aria-label="Message to assistant"
                  className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Send message"
                  className="w-10 h-10 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
