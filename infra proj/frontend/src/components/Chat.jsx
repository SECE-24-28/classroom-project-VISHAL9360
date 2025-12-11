import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '👋 Hello! I\'m your AI shopping assistant. How can I help you find the perfect product today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });
            const data = await response.json();

            const aiContent = data.choices?.[0]?.message?.content || "I'm here to help! Could you rephrase that?";

            setMessages([...newMessages, { role: 'assistant', content: aiContent }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages([...newMessages, { role: 'assistant', content: '✨ I\'m currently in demo mode. I recommend checking out our premium collection!' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 glass-card p-4 rounded-full hover:scale-110 transition-all duration-300 glow-purple group"
                >
                    <MessageCircle className="w-6 h-6 text-primary-300 group-hover:text-primary-200" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-pink rounded-full animate-pulse"></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] glass-card flex flex-col animate-slide-up shadow-2xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                            <h3 className="font-bold text-lg">AI Shopping Assistant</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg'
                                            : 'glass-card text-white/90'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="glass-card p-3 rounded-2xl">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                className="input-glass flex-1 text-sm"
                                placeholder="Ask me anything..."
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading}
                                className="bg-gradient-to-r from-primary-600 to-primary-500 p-3 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chat;
