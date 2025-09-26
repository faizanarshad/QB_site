"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  quickReplies?: string[];
  reactions?: string[];
}

interface QuickReply {
  text: string;
  action: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm QBrix AI Assistant. I can help you with our AI, ML, Computer Vision, E-commerce, and Robotics services. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      quickReplies: ["Tell me about AI services", "Show me your portfolio", "Contact information", "Pricing details"]
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleQuickReply = (reply: string) => {
    setShowQuickReplies(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    processUserInput(reply);
  };

  const processUserInput = (userInput: string) => {
    setIsTyping(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const response = generateBotResponse(userInput);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        quickReplies: response.quickReplies,
        reactions: response.reactions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setShowQuickReplies(true);
    }, 800 + Math.random() * 600);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const message = inputValue.trim();
    setInputValue("");
    setShowQuickReplies(false);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    processUserInput(message);
  };

  const generateBotResponse = (userInput: string): { text: string; quickReplies?: string[]; reactions?: string[] } => {
    const input = userInput.toLowerCase();
    
    // Greetings
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return {
        text: "Hello! Welcome to QBrix Solutions. I'm here to help you with our cutting-edge AI, ML, Computer Vision, E-commerce, and Robotics services. What would you like to explore today?",
        quickReplies: ["AI & Machine Learning", "Computer Vision", "E-commerce Solutions", "Robotics & Automation"]
      };
    }
    
    // AI Services
    if (input.includes("ai") || input.includes("artificial intelligence") || input.includes("machine learning")) {
      return {
        text: "🤖 Our AI & Machine Learning services include:\n\n• Custom ML Models & Neural Networks\n• Predictive Analytics & Forecasting\n• Natural Language Processing\n• Deep Learning Solutions\n• Automated Decision Making\n\nWe've helped businesses increase efficiency by 40% and reduce costs by 60%. Would you like to see some examples?",
        quickReplies: ["Show AI examples", "Request consultation", "Learn about pricing", "Meet our AI team"]
      };
    }
    
    // Computer Vision
    if (input.includes("computer vision") || input.includes("image") || input.includes("video")) {
      return {
        text: "👁️ Our Computer Vision solutions include:\n\n• Object Detection & Recognition\n• Facial Recognition Systems\n• Quality Control Automation\n• Medical Imaging Analysis\n• Video Analytics & Monitoring\n\nWe've implemented vision systems that improved accuracy by 95%. How can computer vision benefit your industry?",
        quickReplies: ["Manufacturing QC", "Security Systems", "Medical Imaging", "Retail Analytics"]
      };
    }
    
    // E-commerce
    if (input.includes("e-commerce") || input.includes("ecommerce") || input.includes("online store")) {
      return {
        text: "🛒 Our E-commerce solutions include:\n\n• AI-Powered Product Recommendations\n• Custom E-commerce Platforms\n• B2B & B2C Marketplaces\n• Payment Integration & Security\n• Inventory Management Systems\n\nOur platforms have increased conversion rates by 35% on average. What type of e-commerce solution are you looking for?",
        quickReplies: ["B2B Marketplace", "Consumer Retail", "Custom Platform", "AI Recommendations"]
      };
    }
    
    // Robotics & Automation
    if (input.includes("robotics") || input.includes("automation") || input.includes("iot")) {
      return {
        text: "⚙️ Our Robotics & Automation services include:\n\n• Industrial Process Automation\n• Smart Manufacturing Systems\n• IoT Integration & Monitoring\n• Robotic Process Automation (RPA)\n• Quality Control Automation\n\nWe've helped clients reduce operational costs by 70%. What automation challenges are you facing?",
        quickReplies: ["Industrial Automation", "Smart Manufacturing", "RPA Solutions", "IoT Integration"]
      };
    }
    
    // Portfolio/Projects
    if (input.includes("portfolio") || input.includes("projects") || input.includes("examples") || input.includes("case studies")) {
      return {
        text: "📊 Here are some highlights from our portfolio:\n\n🏭 AI-Powered Manufacturing QC\n• Reduced defects by 85%\n• Increased efficiency by 40%\n\n🛒 E-commerce Platform\n• 35% increase in conversion\n• 25% higher order value\n\n📈 Predictive Analytics Dashboard\n• 60% faster decisions\n• 45% improved accuracy\n\nWould you like to see more details about any specific project?",
        quickReplies: ["Manufacturing QC", "E-commerce Platform", "Analytics Dashboard", "Contact Sales"]
      };
    }
    
    // Contact Information
    if (input.includes("contact") || input.includes("phone") || input.includes("email") || input.includes("reach")) {
      return {
        text: "📞 Here's how to reach us:\n\n📧 Email: support@qbrixsolutions.com\n📱 Phone: +92 339 4101341\n💬 WhatsApp: +92 339 4101341\n📍 Office: 3rd Floor Gulberg Emporium, Business Square, Islamabad, Pakistan\n\nOur team is available Mon-Fri, 8am-6pm for consultations. Would you like to schedule a call?",
        quickReplies: ["Schedule Consultation", "Send Email", "WhatsApp Chat", "Visit Office"]
      };
    }
    
    // Pricing
    if (input.includes("pricing") || input.includes("cost") || input.includes("price") || input.includes("quote")) {
      return {
        text: "💰 Our pricing is competitive and flexible:\n\n• Custom AI Solutions: $50K - $500K+\n• E-commerce Platforms: $30K - $200K+\n• Computer Vision Systems: $25K - $150K+\n• Robotics Automation: $100K - $1M+\n\nWe offer:\n✅ Free initial consultation\n✅ Flexible payment terms\n✅ ROI guarantee\n✅ Ongoing support\n\nWould you like a detailed quote for your specific needs?",
        quickReplies: ["Get Free Quote", "Schedule Consultation", "View Pricing Guide", "ROI Calculator"]
      };
    }
    
    // Team
    if (input.includes("team") || input.includes("who") || input.includes("people") || input.includes("experts")) {
      return {
        text: "👥 Our expert team includes:\n\n👩‍💼 Dr. Sarah Chen (CEO)\n• 15+ years AI research\n• PhD in Computer Science\n\n👨‍💻 Michael Rodriguez (CTO)\n• Full-stack & AI specialist\n• System architecture expert\n\n👩‍🔬 Dr. Emily Watson (Head of AI)\n• Deep Learning specialist\n• Computer Vision expert\n\n👨‍🔧 David Kim (Robotics Lead)\n• Industrial automation\n• IoT integration expert\n\nWe have 50+ specialists with PhDs and industry experience.",
        quickReplies: ["Meet the Team", "View LinkedIn Profiles", "Schedule Meeting", "Join Our Team"]
      };
    }
    
    // Technologies
    if (input.includes("technology") || input.includes("tech stack") || input.includes("tools") || input.includes("languages")) {
      return {
        text: "🛠️ Our technology stack includes:\n\nFrontend: React ⚛️, Next.js ⚡, TypeScript 📘\nBackend: Python 🐍, Node.js 🟢, PostgreSQL 🐘\nAI/ML: TensorFlow 🧠, PyTorch 🔥, OpenCV 👁️\nCloud: AWS ☁️, Azure ☁️, Google Cloud ☁️\n\nWe use cutting-edge technologies to deliver scalable, secure, and high-performance solutions.",
        quickReplies: ["AI Technologies", "Web Technologies", "Cloud Services", "Security Features"]
      };
    }
    
    // Default response
    return {
      text: "Thank you for your message! I'm here to help you with information about our AI, ML, Computer Vision, E-commerce, and Robotics services. You can also contact us directly at support@qbrixsolutions.com for detailed discussions about your project.",
      quickReplies: ["AI Services", "Portfolio", "Contact Info", "Pricing"]
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: "1",
      text: "Hello! I'm QBrix AI Assistant. I can help you with our AI, ML, Computer Vision, E-commerce, and Robotics services. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      quickReplies: ["Tell me about AI services", "Show me your portfolio", "Contact information", "Pricing details"]
    }]);
    setShowQuickReplies(true);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">QBrix AI Assistant</h3>
                    <p className="text-sm text-blue-100">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={clearChat}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    title="Clear chat"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-blue-100" : "text-gray-500"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Replies */}
              {showQuickReplies && messages.length > 0 && messages[messages.length - 1].sender === "bot" && messages[messages.length - 1].quickReplies && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {messages[messages.length - 1].quickReplies?.map((reply, index) => (
                    <motion.button
                      key={reply}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply)}
                      className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                    >
                      {reply}
                    </motion.button>
                  ))}
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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