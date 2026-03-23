"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I&apos;m Rishabh&apos;s AI Assistant. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is not configured.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemPrompt = `
        You are Rishabh's AI Assistant. 
        
        CRITICAL RULES:
        1. Reply in a VERY CONCISE (short) manner. No long paragraphs.
        2. Do NOT provide too much detail. Be direct.
        3. Highlight IMPORTANT words in **bold** using markdown.
        4. Do NOT use any other symbols like bullet points, dashes, or asterisks (except for bolding).
        5. Sound like a human, not a robot. Be friendly but brief.
        
        Rishabh's Background:
        - AI Workflow Developer and Digital Marketing Consultant.
        
        Services:
        - AI Workflow Development: ₹15,000 / project.
        - Digital Marketing Consulting: ₹8,000 / month.
        - Content Strategy: ₹5,000 / month.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.concat(userMessage).map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
        config: {
          systemInstruction: systemPrompt,
        },
      });

      const text = response.text || "I'm sorry, I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: text },
      ]);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble responding right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-[350px] max-w-[90vw] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-accent p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="font-syne font-bold text-sm">Rishabh&apos;s AI Assistant</h3>
                  <p className="text-[10px] opacity-80">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl font-jetbrains text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                    }`}
                  >
                    <div className="markdown-body">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-accent" />
                    <span className="font-jetbrains text-xs">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-grow bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-accent outline-none text-gray-800"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-accent text-white rounded-full hover:bg-accent-glow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-accent text-white rounded-full shadow-lg flex items-center justify-center hover:bg-accent-glow transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}
