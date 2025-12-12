import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { generateBrandChatResponse, generateBrandLogo } from '../services/geminiService';
import { ChatMessage } from '../types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'ai',
    text: 'Halo! Saya siap membantu Anda membuat brand baru. Mari kita mulai. Apa nama brand yang ingin Anda bangun?',
    timestamp: '10:23 AM'
  },
  {
    id: '2',
    sender: 'user',
    text: 'Saya ingin membuat brand kopi kekinian bernama "Kopi Kilat".',
    timestamp: '10:24 AM'
  },
  {
    id: '3',
    sender: 'ai',
    text: 'Nama yang sangat energik! "Kopi Kilat" terdengar cepat dan modern, cocok untuk pasar urban. \n\nSelanjutnya, mari kita tentukan target audiens Anda. Siapa yang akan menjadi pelanggan utama Anda? Silakan pilih atau ketik sendiri.',
    timestamp: '10:24 AM',
    chips: ['🏢 Pekerja Kantor', '🎓 Mahasiswa (Gen Z)', '☕ Pecinta Kopi Spesialti', '🛵 Commuters']
  }
];

const BrandGenerator: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Brand Details State
  const [brandDetails, setBrandDetails] = useState({
    name: 'Kopi Kilat',
    industry: 'F&B / Coffee Shop',
    audience: ''
  });
  
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  
  // Form visibility state - assumes identity established if we have initial context (3 messages)
  const [showDetailsForm, setShowDetailsForm] = useState(INITIAL_MESSAGES.length >= 3);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update form visibility based on conversation progress
  useEffect(() => {
    if (messages.length >= 3) {
      setShowDetailsForm(true);
    }
  }, [messages.length]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Heuristic: Update audience if it's likely the response to the "target audience" question
    if (messages.length === 3) {
       setBrandDetails(prev => ({ ...prev, audience: text }));
    }

    setInputText('');
    setIsTyping(true);

    // Call Gemini Service
    const history = messages.map(m => ({ role: m.sender, content: m.text }));
    const responseText = await generateBrandChatResponse(history, text);

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleGenerateLogo = async () => {
    if (!brandDetails.name) return;
    
    setIsGeneratingLogo(true);
    // Using the requested colors: Primary #1313ec, Secondary #111118
    const generatedImage = await generateBrandLogo(
        brandDetails.name, 
        brandDetails.industry, 
        '#1313ec', 
        '#111118'
    );
    
    if (generatedImage) {
        setLogoUrl(generatedImage);
    }
    setIsGeneratingLogo(false);
  };

  return (
    <div className="flex h-screen w-full bg-background-light overflow-hidden">
      <Sidebar />
      <main className="flex flex-1 flex-col h-full relative min-w-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">Buat Branding Baru</h2>
                    <p className="text-sm text-slate-500 font-medium">AI Branding Assistant • Session #2910</p>
                </div>
            </div>
            <div className="hidden lg:flex flex-col gap-2 w-64">
                <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>Step 2 of 4</span>
                    <span className="text-primary">Target Audience</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/4 rounded-full shadow-[0_0_10px_rgba(19,19,236,0.5)]"></div>
                </div>
            </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col relative bg-[#f6f6f8]">
                <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6 scroll-smooth pb-32">
                    <div className="flex justify-center my-4">
                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-wider">Today</span>
                    </div>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 max-w-3xl group ${msg.sender === 'user' ? 'self-end flex-row-reverse' : ''}`}>
                            <div className={`size-10 shrink-0 rounded-full shadow-sm flex items-center justify-center border ${msg.sender === 'ai' ? 'bg-white text-primary border-slate-100' : 'bg-slate-200 border-white bg-cover'}`} style={msg.sender === 'user' ? {backgroundImage: "url('https://picsum.photos/100')"} : {}}>
                                {msg.sender === 'ai' && <span className="material-symbols-outlined">smart_toy</span>}
                            </div>
                            <div className={`flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'w-full'}`}>
                                <span className={`text-xs text-slate-400 font-bold uppercase tracking-wider ${msg.sender === 'user' ? 'mr-1' : 'ml-1'}`}>
                                    {msg.sender === 'ai' ? 'Branding Assistant' : 'You'}
                                </span>
                                <div className={`p-5 rounded-2xl shadow-sm leading-relaxed text-[15px] whitespace-pre-wrap ${msg.sender === 'ai' ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' : 'bg-primary text-white rounded-tr-none shadow-primary/20'}`}>
                                    {msg.text}
                                </div>
                                {msg.chips && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {msg.chips.map(chip => (
                                            <button 
                                                key={chip} 
                                                onClick={() => handleSendMessage(chip)}
                                                className="group flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-primary hover:text-primary rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
                                            >
                                                {chip}
                                                <span className="material-symbols-outlined text-base opacity-0 group-hover:opacity-100 transition-opacity -mr-1">add</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-4 max-w-3xl">
                             <div className="size-10 shrink-0 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined animate-pulse">smart_toy</span>
                            </div>
                            <div className="flex items-center gap-1 p-4 bg-white rounded-2xl rounded-tl-none shadow-sm">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 bg-white border-t border-slate-200 absolute bottom-0 w-full z-10">
                    <div className="max-w-4xl mx-auto relative flex gap-3 items-end">
                        <div className="flex gap-1">
                            <button className="p-3 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-full transition-colors shrink-0">
                                <span className="material-symbols-outlined">add_photo_alternate</span>
                            </button>
                            <button className="hidden sm:block p-3 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-full transition-colors shrink-0">
                                <span className="material-symbols-outlined">mic</span>
                            </button>
                        </div>
                        <div className="flex-1 relative">
                            <textarea 
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(inputText);
                                    }
                                }}
                                className="w-full bg-slate-100 border-0 rounded-2xl px-5 py-4 pr-12 focus:ring-2 focus:ring-primary text-slate-900 placeholder-slate-500 resize-none overflow-hidden shadow-inner text-base" 
                                placeholder="Ketik jawaban Anda di sini..." 
                                rows={1}
                            />
                        </div>
                        <button 
                            onClick={() => handleSendMessage(inputText)}
                            disabled={!inputText.trim()}
                            className="size-12 bg-primary hover:bg-primary/90 disabled:bg-slate-300 text-white rounded-2xl shadow-lg shadow-primary/30 transition-all shrink-0 flex items-center justify-center hover:scale-105 active:scale-95"
                        >
                            <span className="material-symbols-outlined">arrow_upward</span>
                        </button>
                    </div>
                    <p className="text-center text-[11px] text-slate-400 mt-3 font-medium">BrandingKilat AI can make mistakes. Please review generated assets.</p>
                </div>
            </div>

            {/* Live Preview Panel */}
            <aside className="w-96 bg-white border-l border-slate-200 hidden xl:flex flex-col overflow-y-auto">
                 <div className="p-6 sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary text-xl">splitscreen</span>
                        <h3 className="font-bold text-slate-900 text-lg">Live Brand Preview</h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Updates automatically as you chat</p>
                </div>
                <div className="p-6 flex flex-col gap-6">
                    {/* Brand Card */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <button className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-100 text-slate-500 hover:text-primary">
                                <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center mb-4">
                            {logoUrl ? (
                                <div className="size-32 rounded-2xl shadow-lg mx-auto mb-4 bg-white p-2 border border-slate-100">
                                    <img src={logoUrl} alt="Brand Logo" className="w-full h-full object-contain" />
                                </div>
                            ) : (
                                <div className="size-24 bg-primary rounded-2xl mb-4 flex items-center justify-center shadow-lg shadow-primary/20 mx-auto transform group-hover:scale-105 transition-transform duration-300">
                                    {isGeneratingLogo ? (
                                        <span className="material-symbols-outlined text-3xl text-white animate-spin">sync</span>
                                    ) : (
                                        <span className="text-3xl font-black text-white tracking-tighter">
                                            {brandDetails.name ? brandDetails.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'BK'}
                                        </span>
                                    )}
                                </div>
                            )}

                            {!logoUrl && (
                                <button 
                                    onClick={handleGenerateLogo}
                                    disabled={isGeneratingLogo}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-primary shadow-sm hover:shadow hover:bg-slate-50 transition-all disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-sm">{isGeneratingLogo ? 'hourglass_top' : 'auto_awesome'}</span>
                                    {isGeneratingLogo ? 'Generating...' : 'Generate Logo'}
                                </button>
                            )}
                        </div>

                        <div className="text-center">
                            <h4 className="text-2xl font-bold text-slate-900 mb-2">{brandDetails.name || 'Brand Name'}</h4>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-bold text-slate-600 border border-slate-100">
                                <span className="size-1.5 rounded-full bg-green-500"></span>
                                {brandDetails.industry || 'Unknown Industry'}
                            </span>
                        </div>
                    </div>

                    {/* Attributes Form or Display */}
                    <div className="space-y-4">
                        {showDetailsForm ? (
                            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
                                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                    <h4 className="font-bold text-slate-900 text-sm">Core Identity Details</h4>
                                    <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">Verified</span>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Brand Name</label>
                                    <input
                                        type="text"
                                        value={brandDetails.name}
                                        onChange={(e) => setBrandDetails({...brandDetails, name: e.target.value})}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        placeholder="e.g. Kopi Kilat"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Industry</label>
                                    <input
                                        type="text"
                                        value={brandDetails.industry}
                                        onChange={(e) => setBrandDetails({...brandDetails, industry: e.target.value})}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        placeholder="e.g. Coffee Shop"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Target Audience</label>
                                    <textarea
                                        value={brandDetails.audience}
                                        onChange={(e) => setBrandDetails({...brandDetails, audience: e.target.value})}
                                        rows={3}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                                        placeholder="Describe your ideal customer..."
                                    />
                                </div>

                                <button className="w-full py-2.5 mt-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 active:scale-[0.98] transition-all">
                                    Save & Update Context
                                </button>
                            </div>
                        ) : (
                            // Loading / Waiting State
                            <>
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Brand Name</span>
                                    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <span className="text-sm font-semibold text-slate-900">{brandDetails.name}</span>
                                        <span className="material-symbols-outlined text-green-500 text-base">check_circle</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Target Audience</span>
                                    <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border-2 border-primary/20 border-dashed relative overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
                                        <span className="text-sm text-primary font-medium italic relative z-10">Waiting for input...</span>
                                        <span className="material-symbols-outlined text-primary text-base relative z-10 animate-spin">sync</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Moodboard */}
                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suggested Mood</span>
                            <button className="text-primary text-xs font-semibold hover:underline">Refresh</button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <div className="aspect-video rounded-lg bg-cover bg-center hover:opacity-90 cursor-pointer transition-all hover:scale-[1.02] shadow-sm bg-slate-200" style={{backgroundImage: "url('https://picsum.photos/300/200')"}}></div>
                             <div className="aspect-video rounded-lg bg-cover bg-center hover:opacity-90 cursor-pointer transition-all hover:scale-[1.02] shadow-sm bg-slate-200" style={{backgroundImage: "url('https://picsum.photos/301/200')"}}></div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
      </main>
    </div>
  );
};

export default BrandGenerator;