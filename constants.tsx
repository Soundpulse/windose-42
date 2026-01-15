import { User, Code, Terminal, Activity, MessageCircle, Map, Folder, Trophy, Layers, Radio } from "lucide-react";

import { Project, WindowState } from "./types";

export const INITIAL_WINDOWS: WindowState[] = [
  { id: "about", title: "About.md", isOpen: true, isMinimized: false, zIndex: 110, icon: <User size={14} /> },
  { id: "projects", title: "Projects", isOpen: false, isMinimized: false, zIndex: 101, icon: <Folder size={14} /> },
  { id: "terminal", title: "Terminal", isOpen: false, isMinimized: false, zIndex: 101, icon: <Terminal size={14} /> },
  { id: "stats", title: "System", isOpen: true, isMinimized: false, zIndex: 105, icon: <Activity size={14} /> },
  {
    id: "achievements",
    title: "Achievements",
    isOpen: false,
    isMinimized: false,
    zIndex: 101,
    icon: <Trophy size={14} />,
  },
  { id: "stack", title: "Core Matrix", isOpen: false, isMinimized: false, zIndex: 101, icon: <Layers size={14} /> },
  { id: "chat", title: "Messages", isOpen: false, isMinimized: false, zIndex: 101, icon: <MessageCircle size={14} /> },
  { id: "go_out", title: "Travel Log", isOpen: false, isMinimized: false, zIndex: 101, icon: <Map size={14} /> },
  { id: "stream", title: "haishin", isOpen: false, isMinimized: false, zIndex: 101, icon: <Radio size={14} /> },
];

export interface Location {
  id: string;
  name: string;
  label: string;
  description: string;
  line: "main" | "asia_north" | "se_asia" | "euro" | "usa" | "east_coast";
}

export const LOCATIONS: Location[] = [
  // Main Education/Work Line
  { id: "macau", name: "Macau", label: "Hometown", description: "Origin: Macau, Macao.", line: "main" },
  { id: "zhuhai", name: "Zhuhai", label: "Travel Hub", description: "High-tech hub adjacent to Macau.", line: "main" },
  {
    id: "uk",
    name: "Newcastle",
    label: "Bachelors @ Newcastle",
    description: "BSc Computer Science | 2017-2020",
    line: "main",
  },
  {
    id: "ny",
    name: "New York (Cornell)",
    label: "Masters @ Cornell",
    description: "Cornell Tech NYC | MEng Computer Science | 2024-2025",
    line: "main",
  },
  { id: "la", name: "Los Angeles", label: "Current Base", description: "West Coast hub.", line: "usa" },
  { id: "ithaca", name: "Ithaca", label: "Cornell Campus", description: "Upstate NY hub.", line: "east_coast" },

  // Asia (Yellow)
  { id: "chongqing", name: "Chongqing", label: "Travel", description: "Cyperpunk mountain city.", line: "asia_north" },
  { id: "tibet", name: "Tibet", label: "Travel", description: "The roof of the world.", line: "asia_north" },
  { id: "wuhan", name: "Wuhan", label: "Travel", description: "Hub of Central China.", line: "asia_north" },
  { id: "guangzhou", name: "Guangzhou", label: "Travel", description: "South China metropolis.", line: "asia_north" },
  { id: "guilin", name: "Guilin", label: "Travel", description: "Stunning karst mountains.", line: "asia_north" },
  { id: "shenzhen", name: "Shenzhen", label: "Travel", description: "Silicon Valley of Hardware.", line: "asia_north" },
  { id: "beijing", name: "Beijing", label: "Travel", description: "The Capital of China.", line: "asia_north" },
  { id: "shanghai", name: "Shanghai", label: "Travel", description: "The Pearl of the Orient.", line: "asia_north" },
  {
    id: "yunnan",
    name: "Yunnan",
    label: "Travel",
    description: "Ethnic diversity and natural beauty.",
    line: "asia_north",
  },

  // SE Asia (Purple)
  { id: "philippines", name: "Philippines", label: "Travel", description: "Island paradise.", line: "se_asia" },
  { id: "thailand", name: "Thailand", label: "Travel", description: "Land of smiles.", line: "se_asia" },
  { id: "hk", name: "Hong Kong", label: "Travel", description: "Fragrant Harbour.", line: "se_asia" },
  { id: "taiwan", name: "Taiwan", label: "Travel", description: "The heart of Asia.", line: "se_asia" },
  { id: "malay", name: "Malaysia", label: "Travel", description: "Truly Asia.", line: "se_asia" },
  { id: "sg", name: "Singapore", label: "Travel", description: "Garden city.", line: "se_asia" },
  { id: "korea", name: "Korea", label: "Travel", description: "K-Wave origin.", line: "se_asia" },
  { id: "japan", name: "Japan", label: "Travel", description: "Land of rising sun.", line: "se_asia" },

  // Euro Route
  { id: "harrogate", name: "Harrogate", label: "Travel", description: "Tea and gardens.", line: "euro" },
  { id: "manchester", name: "Manchester", label: "Travel", description: "Industrial heritage.", line: "euro" },
  { id: "edinburgh", name: "Edinburgh", label: "Travel", description: "Royal Mile.", line: "euro" },
  { id: "cambridge", name: "Cambridge", label: "Travel", description: "Punting.", line: "euro" },
  { id: "london", name: "London", label: "Travel", description: "The Big Smoke.", line: "euro" },
  { id: "france", name: "France", label: "Travel", description: "The French Riviera.", line: "euro" },
  { id: "italy", name: "Italy", label: "Travel", description: "Pasta.", line: "euro" },
  { id: "vatican", name: "Vatican City", label: "Travel", description: "Basilica.", line: "euro" },
  { id: "portugal", name: "Portugal", label: "Travel", description: "Tiles.", line: "euro" },
  { id: "spain", name: "Spain", label: "Travel", description: "Tapas.", line: "euro" },
  { id: "poland", name: "Poland", label: "Travel", description: "History.", line: "euro" },

  // US Route (Continuous Red Line)
  { id: "sf", name: "San Francisco", label: "Travel", description: "Golden Gate.", line: "usa" },
  { id: "sd", name: "San Diego", label: "Travel", description: "Beaches.", line: "usa" },
  { id: "vegas", name: "Vegas", label: "Travel", description: "Neon desert.", line: "usa" },
  { id: "slc", name: "SLC", label: "Travel", description: "Salt Lake City.", line: "usa" },
  { id: "denver", name: "Denver", label: "Travel", description: "Mountains.", line: "usa" },
  { id: "nyc", name: "NYC", label: "Travel", description: "The city that never sleeps.", line: "east_coast" },
  { id: "buffalo", name: "Buffalo", label: "Travel", description: "Wings and waterfalls.", line: "east_coast" },
  { id: "dc", name: "DC", label: "Travel", description: "The capital.", line: "east_coast" },
  {
    id: "philly",
    name: "Philadelphia",
    label: "Travel",
    description: "The City of Brotherly Love.",
    line: "east_coast",
  },
  { id: "miami", name: "Miami", label: "Travel", description: "Magic City.", line: "east_coast" },
  { id: "hawaii", name: "Hawaii", label: "Travel", description: "Tropical paradise.", line: "east_coast" },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "MVP Architecture",
    description:
      "Modern full-stack architecture featuring Next.js, FastAPI, PostgreSQL and Redis for low-latency SaaS.",
    tech: ["Next.js", "FastAPI", "Prisma", "PostgreSQL", "Redis"],
    link: "#",
    image: "https://picsum.photos/seed/arch/400/200",
  },
  {
    id: "2",
    title: "LoRA Style Transfer",
    description: "Efficient 3D style transfer across NeRF scenes using LoRA-based weights for high-fidelity rendering.",
    tech: ["Python", "PyTorch", "Cuda", "NeRF"],
    link: "#",
    image: "https://picsum.photos/seed/nerf/400/200",
  },
  {
    id: "3",
    title: "AI Productivity Suite",
    description: "Custom AI-driven tools reducing code integration time and raising product quality metrics.",
    tech: ["Node.js", "OpenAI", "LangChain", "shadcn/ui"],
    link: "#",
    image: "https://picsum.photos/seed/ai/400/200",
  },
];
