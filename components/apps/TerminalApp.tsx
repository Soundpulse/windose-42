import React, { useState, useRef, useEffect } from "react";

interface TerminalAppProps {
  onClose?: () => void;
  onOpenLink?: (url: string) => void;
}

const TerminalApp: React.FC<TerminalAppProps> = ({ onClose, onOpenLink }) => {
  const [history, setHistory] = useState<string[]>([
    "Windose Kernel v42.0.0 Initialized.",
    "User authorized: SOUNDPULSE",
    'Type "help" for a list of available commands.',
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdInput = input.trim();
    const cmd = cmdInput.toLowerCase();
    const parts = cmd.split(" ");
    const baseCmd = parts[0];

    if (!cmd) return;

    // Check for rm -rf and redirect to rickroll without popup
    if (cmd.includes("rm -rf") || cmd.includes("rm -r -f") || (baseCmd === "rm" && cmd.includes("-rf"))) {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
      return;
    }

    let response: string | string[] = `Command not found: ${cmd}`;

    const restrictedCmds = ["sudo", "cd", "mkdir", "rm", "touch", "nano", "vim", "cat", "ssh", "apt", "git"];

    if (restrictedCmds.includes(baseCmd)) {
      response = `Permission denied: guest lacks sufficient clearance for "${baseCmd}". This incident will be reported to the Kernel.`;
    } else if (cmd === "help") {
      response = "Available: help, clear, whoami, skills, contact, exit";
    } else if (cmd === "whoami") {
      response = "soundpulse";
    } else if (cmd === "ls") {
      response = [
        "bin   dev  home  lib64  mnt  proc  run   srv  tmp  var",
        "boot  etc  lib   media  opt  root  sbin  sys  usr",
      ].join("\n");
    } else if (cmd === "skills") {
      response = [
        "CORE_MATRIX // FULL_SPECTRUM_CAPABILITIES",
        "----------------------------------------",
        "FRONTEND ARCHITECT: Next.js, React, Vue, TS, TanStack",
        "SYSTEMS ENGINEER: FastAPI, Node.js, Postgres, MongoDB, Redis",
        "DATA STRATEGIST: PowerBI, Python, Pandas, SQL, Spark",
        "CREATIVE OPERATOR: Adobe PS, Adobe AI, Capcut",
        "GENERATIVE AI: Stable Diffusion, Midjourney, AI Video Gen",
        "LLM APPLICATIONS: Gemini, LangChain, Livekit, LoRA",
        "LLM R&D: RAG, Vector DB, Transformer, RL",
        "DEEP LEARNING: CNN, Semantic Analysis, PyTorch, Cuda",
      ].join("\n");
    } else if (cmd === "contact") {
      response = [
        "SIGNAL_CHANNEL: toby.io@outlook.com",
        "GITHUB: https://github.com/soundpulse",
        "LINKEDIN: https://www.linkedin.com/in/toby-io/",
      ].join("\n");
    } else if (cmd === "exit") {
      if (onClose) {
        onClose();
        return;
      }
      response = "Terminal exit signal sent.";
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory((prev) => [...prev, `> ${input}`, response as string]);
    setInput("");
  };

  const renderHistoryLine = (line: string, i: number) => {
    const isInput = line.startsWith(">");

    // Simple URL regex
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = line.split(urlRegex);

    return (
      <div key={i} className={`mb-1 whitespace-pre-wrap ${isInput ? "text-cyan-500" : "text-gray-400"}`}>
        {parts.map((part, index) => {
          if (part.match(urlRegex)) {
            return (
              <button
                key={index}
                onClick={() => onOpenLink?.(part)}
                className="text-cyan-500 hover:underline underline-offset-2 cursor-pointer transition-all">
                {part}
              </button>
            );
          }
          return part;
        })}
      </div>
    );
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="bg-black p-4 font-mono text-sm h-full flex flex-col">
      <div className="flex-1 overflow-auto retro-scroll pb-4">
        {history.map((line, i) => renderHistoryLine(line, i))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleCommand} className="flex items-center border-t border-[#222] pt-2">
        <span className="text-green-500 mr-2">guest@windose:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-white"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalApp;
