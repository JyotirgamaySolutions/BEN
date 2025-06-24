import React, { useState } from "react";
import { Bot, Send, X } from 'lucide-react';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch("https://bharatmitra.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponse(data.response || data.error);
    } catch (error) {
        console.error("Chatbot error:", error);
        setResponse("Sorry, there was an error processing your request.");
      }      
    setLoading(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center gap-2 border-4 border-black"
        >
          <Bot className="h-6 w-6" />
          <span className="hidden md:inline">Chat with BharatMitra</span>
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-2xl w-[320px] md:w-[380px] flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white rounded-t-xl">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-orange-600" />
              <h2 className="text-lg font-semibold text-gray-800">BharatMitra</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat Content Area */}
          <div className="flex-1 overflow-y-auto p-4 min-h-[200px] max-h-[400px] scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
            <p className="text-sm text-gray-600 mb-4">
              Ask me anything about Bharat Entrepreneurs Network, business opportunities, or member services.
            </p>
            
            {response && (
              <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">{response}</p>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t bg-gray-50 rounded-b-xl">
            <div className="space-y-3">
              <textarea
                className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white text-sm"
                rows={3}
                placeholder="Ask about BEN membership, events, business listings, or consulting opportunities..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
              
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-white w-full justify-center ${
                  loading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'
                } transition-colors text-sm font-medium`}
                onClick={handleAsk}
                disabled={loading}
              >
                <Send className="h-4 w-4" />
                {loading ? 'Processing...' : 'Ask Question'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}