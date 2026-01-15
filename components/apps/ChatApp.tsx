import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Streamdown } from "streamdown";
import guidePrompt from "../../prompts/guide.md?raw";
import collabPrompt from "../../prompts/collab.md?raw";
import techPrompt from "../../prompts/tech.md?raw";

const PERSONAS = [
  {
    id: "guide",
    name: "OS_GUIDE",
    role: "System Support",
    welcome:
      "Welcome to WINDOSE_42. I can help you navigate Toby's portfolio or explain system features. How can I assist?",
    avatar: "◆",
    prompt: guidePrompt,
  },
  {
    id: "collab",
    name: "HIRING_BOT",
    role: "Career Assistant",
    welcome:
      "Hello! I'm here to discuss Toby's professional background. Are you interested in his work at Techstars, Cornell, or his recent AI projects?",
    avatar: "■",
    prompt: collabPrompt,
  },
  {
    id: "tech",
    name: "DEV_PEER",
    role: "Technical Lead",
    welcome:
      "Hey! Let's talk stack. Toby is currently focused on Generative AI, React, and systems architecture. Any specific tech questions?",
    avatar: "▲",
    prompt: techPrompt,
  },
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
  const [activePersonaId, setActivePersonaId] = useState("guide");
  const messageIdCounterRef = useRef<number>(1);

  // Generate unique message ID
  const generateMessageId = () => {
    return Date.now() * 1000 + messageIdCounterRef.current++;
  };

  const [chatState, setChatState] = useState<Record<string, Message[]>>(() => {
    const baseId = generateMessageId();
    return {
      guide: [{ id: baseId, sender: "OS_GUIDE", text: PERSONAS[0].welcome, time: "09:00", system: true }],
      collab: [{ id: baseId + 1, sender: "HIRING_BOT", text: PERSONAS[1].welcome, time: "09:00", system: true }],
      tech: [{ id: baseId + 2, sender: "DEV_PEER", text: PERSONAS[2].welcome, time: "09:00", system: true }],
    };
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePersona = PERSONAS.find((p) => p.id === activePersonaId)!;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState, isTyping]);

  const streamResponse = async (message: string, personaId: string) => {
    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Create streaming message
    const streamingMsgId = generateMessageId();
    setStreamingMessageId(streamingMsgId);

    const streamingMsg: Message = {
      id: streamingMsgId,
      sender: activePersona.name,
      text: "",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatState((prev) => ({
      ...prev,
      [personaId]: [...prev[personaId], streamingMsg],
    }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          personaId,
          prompt: activePersona.prompt,
        }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.error) {
                throw new Error(data.error);
              }

              if (data.done) {
                setStreamingMessageId(null);
                setIsTyping(false);
                break;
              }

              if (data.text) {
                setChatState((prev) => {
                  const updated = { ...prev };
                  const messages = [...updated[personaId]];
                  const msgIndex = messages.findIndex((m) => m.id === streamingMsgId);

                  if (msgIndex !== -1) {
                    messages[msgIndex] = {
                      ...messages[msgIndex],
                      text: messages[msgIndex].text + data.text,
                    };
                    updated[personaId] = messages;
                  }

                  return updated;
                });
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e);
            }
          }
        }
      }

      setStreamingMessageId(null);
      setIsTyping(false);
    } catch (error: any) {
      if (error.name === "AbortError") {
        // Request was cancelled, remove the streaming message
        setChatState((prev) => {
          const updated = { ...prev };
          updated[personaId] = updated[personaId].filter((m) => m.id !== streamingMsgId);
          return updated;
        });
        return;
      }

      console.error("Error streaming response:", error);

      // Update message with error
      setChatState((prev) => {
        const updated = { ...prev };
        const messages = [...updated[personaId]];
        const msgIndex = messages.findIndex((m) => m.id === streamingMsgId);

        if (msgIndex !== -1) {
          messages[msgIndex] = {
            ...messages[msgIndex],
            text: messages[msgIndex].text || "Sorry, I encountered an error. Please try again.",
          };
          updated[personaId] = messages;
        }

        return updated;
      });

      setStreamingMessageId(null);
      setIsTyping(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: generateMessageId(),
      sender: "YOU",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      self: true,
    };

    const messageText = input;
    setChatState((prev) => ({
      ...prev,
      [activePersonaId]: [...prev[activePersonaId], userMsg],
    }));
    setInput("");
    setIsTyping(true);

    // Stream response from Gemini (stateless - no history)
    await streamResponse(messageText, activePersonaId);
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
                activePersonaId === p.id ? "bg-gray-900/50" : ""
              }`}>
              <div
                className={`w-8 h-8 flex items-center justify-center border font-mono text-sm transition-colors ${
                  activePersonaId === p.id
                    ? "bg-white text-black border-white"
                    : "border-gray-800 text-gray-500 group-hover:border-gray-500"
                }`}>
                {p.avatar}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div
                  className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
                    activePersonaId === p.id ? "text-white" : "text-gray-500 group-hover:text-gray-300"
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
          <span className="text-[9px] font-mono text-gray-700 tracking-[0.2em] uppercase hidden sm:block">
            Channel_Verified
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 space-y-6 retro-scroll">
          {chatState[activePersonaId].map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.self ? "items-end" : "items-start"
              } animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className="flex items-center gap-3 mb-2 px-1">
                {!m.self && <span className="text-[8px] font-mono text-gray-700">[{activePersona.avatar}]</span>}
                <span
                  className={`text-[9px] font-mono tracking-[0.1em] uppercase ${
                    m.self ? "text-gray-400" : "text-gray-500 font-bold"
                  }`}>
                  {m.sender}
                </span>
                <span className="text-[8px] text-gray-800 font-mono tracking-tighter">{m.time}</span>
              </div>
              <div
                className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed transition-all shadow-xl font-mono ${
                  m.self ? "bg-white text-black font-bold" : "bg-gray-900/50 border border-gray-800 text-gray-300"
                }`}>
                {m.self ? (
                  m.text
                ) : (
                  <Streamdown mode="streaming" isAnimating={streamingMessageId === m.id} parseIncompleteMarkdown={true}>
                    {m.text}
                  </Streamdown>
                )}
                {streamingMessageId === m.id && (
                  <span className="inline-block w-2 h-3 ml-1 bg-gray-500 animate-pulse" />
                )}
              </div>
            </div>
          ))}
          {isTyping && !streamingMessageId && (
            <div className="flex flex-col items-start animate-pulse">
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[9px] font-mono text-gray-700 uppercase tracking-widest">
                  {activePersona.name}
                </span>
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
          <div ref={messagesEndRef} />
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
              className="bg-white text-black px-6 border border-white hover:invert transition-all flex items-center justify-center disabled:opacity-30 disabled:invert-0">
              <Send size={16} />
            </button>
          </form>
          <div className="mt-2 text-center">
            <span className="text-[8px] font-mono text-gray-700 tracking-[0.3em] uppercase">
              Secure_End_to_End_Encryption_Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
