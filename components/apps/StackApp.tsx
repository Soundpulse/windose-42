import React from "react";
import { Monitor, Server, BarChart3, Scissors, Cpu, Zap, Command, Brain, Sparkles } from "lucide-react";

const StackApp: React.FC = () => {
  const roles = [
    {
      role: "Frontend Architect",
      icon: <Monitor size={18} />,
      desc: "Crafting immersive, high-performance user interfaces from scratch.",
      techs: ["Next.js", "React", "Vue", "TypeScript", "TanStack"],
      color: "border-white",
    },
    {
      role: "Systems Engineer",
      icon: <Server size={18} />,
      desc: "Building scalable backend infrastructure and robust data flows.",
      techs: ["FastAPI", "Node.js", "Postgres", "MongoDB", "Redis", "RabbitMQ"],
      color: "border-gray-400",
    },
    {
      role: "Data Strategist",
      icon: <BarChart3 size={18} />,
      desc: "Extracting actionable insights through advanced analytics and modeling.",
      techs: ["PowerBI", "Python", "Pandas", "SQL", "Spark"],
      color: "border-gray-500",
    },
    {
      role: "Creative Operator",
      icon: <Scissors size={18} />,
      desc: "High-speed content production and visual brand manipulation.",
      techs: ["Adobe PS", "Adobe AI", "Capcut"],
      color: "border-gray-600",
    },
    {
      role: "Generative AI",
      icon: <Sparkles size={18} />,
      desc: "Mastering the frontier of creative synthesis and style control.",
      techs: ["Stable Diffusion", "Midjourney", "AI Video Gen", "Nano Banana"],
      color: "border-white/40",
    },
    {
      role: "LLM Applications",
      icon: <Cpu size={18} />,
      desc: "Designing production-ready agentic systems and toolchains.",
      techs: ["Gemini", "LangChain", "Livekit", "LoRA", "ComfyUI", "Prompting"],
      color: "border-gray-700",
    },
    {
      role: "LLM R&D",
      icon: <Zap size={18} />,
      desc: "Deep research into RAG architectures and neural foundations.",
      techs: ["RAG", "Vector DB", "Transformer", "Memory Layer", "RL", "Embedding"],
      color: "border-gray-800",
    },
    {
      role: "Deep Learning",
      icon: <Brain size={18} />,
      desc: "Solving complex domain problems with advanced machine learning.",
      techs: ["CNN", "Semantic Analysis", "PyTorch", "Cuda"],
      color: "border-white/20",
    },
  ];

  return (
    <div className="h-full bg-black text-white p-6 font-mono overflow-auto retro-scroll">
      <div className="max-w-4xl mx-auto py-8">
        {/* Philosophy Header */}
        <div className="mb-16 relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-white text-black">
              <Command size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-light tracking-tighter uppercase italic">Tech Stack</h1>
              <div className="text-[10px] text-gray-500 tracking-[0.4em] mt-1 uppercase">0 TO 1 PRODUCT ARCHITECT</div>
            </div>
          </div>
          <p className="text-gray-200 text-xs leading-relaxed max-w-xl border-l border-gray-800 pl-4 py-2 italic uppercase tracking-tighter">
            "I excel at built-from-zero initiatives. A Generalist by design, I bridge the gap between abstract business
            strategy and low-level technical execution."
          </p>
        </div>

        {/* Cross-Disciplinary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((item, idx) => (
            <div
              key={idx}
              className={`group relative p-5 border ${item.color} bg-[#050505] hover:bg-white hover:text-black transition-all duration-300 flex flex-col h-full`}>
              <div className="flex justify-between items-start mb-6">
                <div className="p-2 border border-current group-hover:border-black">{item.icon}</div>
                <span className="text-[8px] opacity-30 group-hover:opacity-100 group-hover:text-black font-bold uppercase tracking-widest">
                  SR_UNIT_0{idx + 1}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-bold uppercase tracking-tighter mb-2">{item.role}</h3>
                <p className="text-[10px] leading-relaxed group-hover:opacity-100 mb-6 uppercase text-white group-hover:text-black">
                  {item.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-auto pt-4 border-t border-gray-900 group-hover:border-black/10">
                {item.techs.map((t, i) => (
                  <span
                    key={i}
                    className="text-[8px] px-1.5 py-0.5 border border-gray-700 group-hover:border-black/20 uppercase text-gray-200 group-hover:text-black">
                    {t}
                  </span>
                ))}
              </div>

              {/* Decorative nodes */}
              <div className="absolute top-0 right-0 w-1 h-1 bg-white opacity-0 group-hover:opacity-100 group-hover:bg-black" />
              <div className="absolute bottom-0 left-0 w-1 h-1 bg-white opacity-0 group-hover:opacity-100 group-hover:bg-black" />
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-wrap justify-between gap-8">
          <div>
            <div className="text-[8px] text-gray-400 mb-2 tracking-[0.2em] uppercase">Deployment Range</div>
            <div className="text-xs font-bold uppercase tracking-widest text-white">END_TO_END</div>
          </div>
          <div>
            <div className="text-[8px] text-gray-400 mb-2 tracking-[0.2em] uppercase">Philosophy</div>
            <div className="text-xs font-bold uppercase tracking-widest text-white">BUILT_FROM_ZERO</div>
          </div>
          <div className="text-right">
            <div className="text-[8px] text-gray-400 mb-2 tracking-[0.2em] uppercase">System Version</div>
            <div className="text-xs font-bold uppercase tracking-widest text-white">MODULAR_v4.2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackApp;
