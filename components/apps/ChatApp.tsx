
import React, { useState } from 'react';
import { Send, User } from 'lucide-react';

const PERSONAS = [
  { 
    id: 'guide', 
    name: 'OS_GUIDE', 
    role: 'System Support', 
    welcome: 'Welcome to WINDOSE_42. I can help you navigate Toby\'s portfolio or explain system features. How can I assist?',
    avatar: '◆'
  },
  { 
    id: 'collab', 
    name: 'HIRING_BOT', 
    role: 'Career Assistant', 
    welcome: 'Hello! I\'m here to discuss Toby\'s professional background. Are you interested in his work at Techstars, Cornell, or his recent AI projects?',
    avatar: '■'
  },
  { 
    id: 'tech', 
    name: 'DEV_PEER', 
    role: 'Technical Lead', 
    welcome: 'Hey! Let\'s talk stack. Toby is currently focused on Generative AI, React, and systems architecture. Any specific tech questions?',
    avatar: '▲'
  }
];

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  self?: boolean;
  system?: boolean;
}

const ChatApp: React.FC = () => {
  const [activePersonaId, setActivePersonaId] = useState('guide');
  const [chatState, setChatState] = useState<Record<string, Message[]>>({
    guide: [{ id: 1, sender: 'OS_GUIDE', text: PERSONAS[0].welcome, time: '09:00' }],
    collab: [{ id: 1, sender: 'HIRING_BOT', text: PERSONAS[1].welcome, time: '09:00' }],
    tech: [{ id: 1, sender: 'DEV_PEER', text: PERSONAS[2].welcome, time: '09:00' }],
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activePersona = PERSONAS.find(p => p.id === activePersonaId)!;

  const getAutoResponse = (text: string, personaId: string) => {
    const input = text.toLowerCase();
    if (personaId === 'guide') {
      if (input.includes('navigate') || input.includes('how')) return "You can use the Terminal for deep-dives, or check the Travel Log for Toby's locations.";
      if (input.includes('windose')) return "WINDOSE_42 is a custom portfolio environment built with React and Tailwind CSS.";
      return "I'm here to ensure your session is smooth. Feel free to explore the desktop icons!";
    }
    if (personaId === 'collab') {
      if (input.includes('techstars')) return "Toby won 1st place at Techstars Startup Weekend Macau. It was a 54-hour sprint developing AI logistics.";
      if (input.includes('cornell')) return "Toby is a Cornell Tech graduate with a 3.8 GPA, specializing in Connective Media.";
      if (input.includes('hire') || input.includes('job')) return "Toby is always open to interesting collaborations. You can find his contact info in the Terminal or About app.";
      return "Toby's career is focused on the intersection of AI and user experience. Would you like to know more about his specific roles?";
    }
    if (personaId === 'tech') {
      if (input.includes('stack') || input.includes('tech')) return "He's proficient in TS, Rust, Python, and SQL. Check the 'Core Matrix' app for the full breakdown.";
      if (input.includes('ai') || input.includes('llm')) return "Toby works extensively with Gemini, LangChain, and RAG architectures.";
      return "Clean code and scalable architecture are Toby's top priorities. He loves talking about optimized UI and backend efficiency.";
    }
    return "Understood. Signal received.";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'YOU',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      self: true
    };

    setChatState(prev => ({
      ...prev,
      [activePersonaId]: [...prev[activePersonaId], userMsg]
    }));
    setInput('');

    // Trigger auto-reply
    setIsTyping(true);
    setTimeout(() => {
      const responseText = getAutoResponse(input, activePersonaId);
      const replyMsg: Message = {
        id: Date.now() + 1,
        sender: activePersona.name,
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatState(prev => ({
        ...prev,
        [activePersonaId]: [...prev[activePersonaId], replyMsg]
      }));
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-full bg-[#0a0a0a] text-gray-300">
      {/* Sidebar */}
      <div className="w-56 border-r border-gray-800 bg-black hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-800 text-[10px] font-mono text-gray-600 tracking-[0.2em] uppercase">
          Signal_Groups
        </div>
        <div className="flex-1 overflow-auto retro-scroll">
          {PERSONAS.map((p) => (
            <button 
              key={p.id} 
              onClick={() => setActivePersonaId(p.id)}
              className={`w-full p-4 flex items-center gap-4 hover:bg-gray-900 transition-colors border-b border-gray-900 group ${
                activePersonaId === p.id ? 'bg-gray-900/50' : ''
              }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center border font-mono text-sm transition-colors ${
                activePersonaId === p.id ? 'bg-white text-black border-white' : 'border-gray-800 text-gray-500 group-hover:border-gray-500'
              }`}>
                {p.avatar}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
                  activePersonaId === p.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                }`}>
                  {p.name}
                </div>
                <div className="text-[9px] text-gray-700 font-mono truncate">{p.role}</div>
              </div>
              {activePersonaId === p.id && <div className="w-1.5 h-1.5 bg-white shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-black/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-white animate-pulse" />
            <span className="text-[10px] font-mono text-white tracking-[0.2em] uppercase font-bold">
              {activePersona.name} <span className="text-gray-600 ml-2 font-light">// {activePersona.role}</span>
            </span>
          </div>
          <span className="text-[9px] font-mono text-gray-700 tracking-[0.2em] uppercase hidden sm:block">Channel_Verified</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 space-y-6 retro-scroll">
          {chatState[activePersonaId].map((m) => (
            <div key={m.id} className={`flex flex-col ${m.self ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className="flex items-center gap-3 mb-2 px-1">
                {!m.self && <span className="text-[8px] font-mono text-gray-700">[{activePersona.avatar}]</span>}
                <span className={`text-[9px] font-mono tracking-[0.1em] uppercase ${m.self ? 'text-gray-400' : 'text-gray-500 font-bold'}`}>
                  {m.sender}
                </span>
                <span className="text-[8px] text-gray-800 font-mono tracking-tighter">{m.time}</span>
              </div>
              <div className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed transition-all shadow-xl font-mono ${
                m.self 
                  ? 'bg-white text-black font-bold' 
                  : 'bg-gray-900/50 border border-gray-800 text-gray-300'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start animate-pulse">
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[9px] font-mono text-gray-700 uppercase tracking-widest">{activePersona.name}</span>
                <span className="text-[8px] text-gray-800 font-mono tracking-tighter">TYPING...</span>
              </div>
              <div className="bg-gray-900/30 border border-gray-900 px-4 py-3 text-gray-600">
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-gray-700 rounded-full animate-bounce" />
                  <span className="w-1 h-1 bg-gray-700 rounded-full animate-bounce delay-75" />
                  <span className="w-1 h-1 bg-gray-700 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-black/50 border-t border-gray-800">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message ${activePersona.name}...`}
                disabled={isTyping}
                className="w-full bg-black border border-gray-800 px-4 py-3 text-xs text-white font-mono tracking-wide placeholder:text-gray-700 focus:border-white focus:outline-none transition-all disabled:opacity-50"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden sm:block">
                <span className="text-[8px] font-mono text-white">CMD_SHIFT_ENTER</span>
              </div>
            </div>
            <button 
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-white text-black px-6 border border-white hover:invert transition-all flex items-center justify-center disabled:opacity-30 disabled:invert-0"
            >
              <Send size={16} />
            </button>
          </form>
          <div className="mt-2 text-center">
            <span className="text-[8px] font-mono text-gray-700 tracking-[0.3em] uppercase">Secure_End_to_End_Encryption_Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
