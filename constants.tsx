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
  { id: "stack", title: "Skills", isOpen: false, isMinimized: false, zIndex: 101, icon: <Layers size={14} /> },
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
  { id: "macau", name: "Macau", label: "Hometown", description: "Where I was born and raised.", line: "main" },
  { id: "zhuhai", name: "Zhuhai", label: "HomeTown", description: "Where I hanged out the most often.", line: "main" },
  {
    id: "uk",
    name: "Newcastle",
    label: "Bachelors",
    description: "Where I studied CS.",
    line: "main",
  },
  {
    id: "ny",
    name: "New York (Cornell)",
    label: "Masters",
    description: "Where I further studied CS.",
    line: "main",
  },
  { id: "la", name: "Los Angeles", label: "Current Base", description: "Sunshine and rainbows.", line: "usa" },
  {
    id: "ithaca",
    name: "Ithaca",
    label: "Cornell Campus",
    description: "They got good ice cream.",
    line: "east_coast",
  },

  // Asia (Yellow)
  { id: "chongqing", name: "Chongqing", label: "Travel", description: "Chrysanthemum Opens.", line: "asia_north" },
  { id: "tibet", name: "Tibet", label: "Travel", description: "Snow and Yaks.", line: "asia_north" },
  { id: "wuhan", name: "Wuhan", label: "Travel", description: "Hot Dry Noodles.", line: "asia_north" },
  { id: "guangzhou", name: "Guangzhou", label: "Travel", description: "Even Cheaper Food.", line: "asia_north" },
  { id: "guilin", name: "Guilin", label: "Travel", description: "Top Tier Rice Noodles.", line: "asia_north" },
  { id: "shenzhen", name: "Shenzhen", label: "Travel", description: "Silicon Valley #2.", line: "asia_north" },
  { id: "beijing", name: "Beijing", label: "Travel", description: "Where I originated.", line: "asia_north" },
  { id: "shanghai", name: "Shanghai", label: "Travel", description: "Where my family lives.", line: "asia_north" },
  {
    id: "yunnan",
    name: "Yunnan",
    label: "Travel",
    description: "California with shrooms.",
    line: "asia_north",
  },

  // SE Asia (Purple)
  { id: "philippines", name: "Philippines", label: "Travel", description: "Islands and bad food.", line: "se_asia" },
  { id: "thailand", name: "Thailand", label: "Travel", description: "Papaya Salads!", line: "se_asia" },
  { id: "hk", name: "Hong Kong", label: "Travel", description: "Flight & Friends.", line: "se_asia" },
  { id: "taiwan", name: "Taiwan", label: "Travel", description: "I biked around it!.", line: "se_asia" },
  { id: "malay", name: "Malaysia", label: "Travel", description: "Cheap & Hearty Food.", line: "se_asia" },
  { id: "sg", name: "Singapore", label: "Travel", description: "Gardens everywhere, no cars.", line: "se_asia" },
  { id: "korea", name: "Korea", label: "Travel", description: "K-pop? not my thing.", line: "se_asia" },
  { id: "japan", name: "Japan", label: "Travel", description: "Anime & Games!", line: "se_asia" },

  // Euro Route
  { id: "iceland", name: "Iceland", label: "Travel", description: "Not that cold, auroras.", line: "euro" },
  { id: "harrogate", name: "Harrogate", label: "Travel", description: "Retirement Life.", line: "euro" },
  { id: "manchester", name: "Manchester", label: "Travel", description: "Bad Team.", line: "euro" },
  { id: "edinburgh", name: "Edinburgh", label: "Travel", description: "Castles & Rain.", line: "euro" },
  { id: "cambridge", name: "Cambridge", label: "Travel", description: "Golden Trees & Punting.", line: "euro" },
  { id: "london", name: "London", label: "Travel", description: "King's Cross.", line: "euro" },
  { id: "france", name: "France", label: "Travel", description: "Paris Syndrome.", line: "euro" },
  { id: "italy", name: "Italy", label: "Travel", description: "Pizza & Pasta.", line: "euro" },
  { id: "vatican", name: "Vatican City", label: "Travel", description: "Epic Boss Fight.", line: "euro" },
  { id: "portugal", name: "Portugal", label: "Travel", description: "Pastel de Nata.", line: "euro" },
  { id: "spain", name: "Spain", label: "Travel", description: "Tapas & Sagrada Familia.", line: "euro" },
  { id: "poland", name: "Poland", label: "Travel", description: "Medival RPG & Concentration Camps.", line: "euro" },

  // US Route (Continuous Red Line)
  { id: "sf", name: "San Francisco", label: "Travel", description: "Golden Gate & Homeless People.", line: "usa" },
  { id: "sd", name: "San Diego", label: "Travel", description: "Beaches & Smelly Seals.", line: "usa" },
  { id: "vegas", name: "Vegas", label: "Travel", description: "Macau but worse.", line: "usa" },
  { id: "slc", name: "SLC", label: "Travel", description: "Snowbird & Beer.", line: "usa" },
  { id: "denver", name: "Denver", label: "Travel", description: "Wild Game & Expensive Matcha.", line: "usa" },
  { id: "nyc", name: "NYC", label: "Travel", description: "The city that never sleeps.", line: "east_coast" },
  { id: "buffalo", name: "Buffalo", label: "Travel", description: "Wings and waterfalls.", line: "east_coast" },
  { id: "dc", name: "DC", label: "Travel", description: "White House & FBI.", line: "east_coast" },
  {
    id: "philly",
    name: "Philadelphia",
    label: "Travel",
    description: "Philly Cheese Steaks.",
    line: "east_coast",
  },
  { id: "miami", name: "Miami", label: "Travel", description: "GTA & Shrooms.", line: "east_coast" },
  { id: "hawaii", name: "Hawaii", label: "Travel", description: "Surfing & Pineapple.", line: "east_coast" },
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
