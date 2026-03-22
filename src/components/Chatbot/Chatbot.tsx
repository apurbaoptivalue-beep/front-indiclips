"use client";
import { useState } from "react";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'bot' | 'user'}[]>([
    { id: 1, text: "Hi! I'm IndiBot. How can I help you grow your audience today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMsgId = messages.length + 1;
    setMessages(prev => [...prev, { id: newMsgId, text: input, sender: 'user' }]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: newMsgId + 1, 
        text: "That's a great question! Based on successful creators, using vibrant neon thumbnails and engaging the first 3 seconds dramatically improves retention.", 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] flex items-center justify-center text-white hover:scale-110 transition-all z-50 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">1</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-background border border-glass-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 flex items-center justify-between border-b border-glass-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                   <Bot className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white flex items-center">IndiBot <Sparkles className="w-3 h-3 text-yellow-400 ml-1" /></h3>
                <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-black/40">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-sm shadow-md' 
                    : 'bg-glass border border-glass-border text-gray-200 rounded-tl-sm shadow-lg shadow-black/20'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-glass border-t border-glass-border">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask IndiBot..."
                className="w-full bg-black/50 border border-gray-800 rounded-full h-12 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white shadow-md disabled:opacity-50 disabled:grayscale transition-all"
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
