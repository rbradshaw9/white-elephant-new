'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  role: 'user' | 'elf';
  content: string;
}

const quickReplies = [
  "What gift should I bring?",
  "How do I win?",
  "Can I steal from anyone?",
  "What if my gift gets stolen?",
  "Should I bring wine?",
  "What's the best strategy?",
  "Can I peek at gifts?",
  "What are the rules?",
  "How many times can I steal?",
  "What's a good cheap gift?",
];

export default function ElfChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'elf', content: "Ho ho HOLD UP! I'm Jingles, your snarky party elf. Need gift advice? Stealing strategies? Or just someone to judge your life choices? I'm here for it all. 🧝‍♂️" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (messageText?: string) => {
    const userMessage = (messageText || input).trim();
    if (!userMessage) return;

    setInput('');
    setShowQuickReplies(false);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/elf-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      const data = await response.json();
      
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setMessages(prev => [...prev, { role: 'elf', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'elf', 
        content: "Oops! My magic is glitching. Try again?" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: hasBeenOpened ? 0 : 6 }}
          className="fixed bottom-24 sm:bottom-20 left-4 z-[85] flex flex-col items-center gap-1"
        >
          <motion.button
            onClick={() => {
              setIsOpen(true);
              setHasBeenOpened(true);
            }}
            className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
          <span className="text-xs font-medium text-gray-700 bg-white/90 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
            Ask an Elf 🧝
          </span>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[95] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-96 z-[96] h-[80vh] md:h-[600px] max-h-[700px] flex flex-col"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-t-2xl p-4 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                    🧝
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg">Jingles the Elf</h3>
                    <p className="text-green-100 text-xs">Your snarky party advisor</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div ref={messagesContainerRef} className="flex-1 bg-white overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-red-600 text-white rounded-br-sm'
                          : 'bg-green-100 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Quick Reply Buttons */}
                {showQuickReplies && messages.length === 1 && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-xs text-gray-500 text-center mb-3">Quick questions:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickReplies.slice(0, 6).map((reply, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => sendMessage(reply)}
                          className="text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg border border-green-200 transition-colors text-left"
                        >
                          {reply}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-green-100 text-gray-800 p-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-green-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-green-600 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-green-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>

              <div className="bg-white border-t border-gray-200 p-4 rounded-b-2xl space-y-3">
                {/* Quick Reply Chips - Always Available */}
                {!showQuickReplies && messages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {quickReplies.slice(0, 4).map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendMessage(reply)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors flex-shrink-0"
                        disabled={isTyping}
                      >
                        {reply}
                      </button>
                    ))}
                    <button
                      onClick={() => setShowQuickReplies(true)}
                      className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors flex-shrink-0"
                      disabled={isTyping}
                    >
                      More...
                    </button>
                  </div>
                )}
                
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Jingles anything..."
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                    disabled={isTyping}
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="bg-green-600 hover:bg-green-700 rounded-full w-10 h-10 p-0 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
