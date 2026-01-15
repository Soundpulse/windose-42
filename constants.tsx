import { User, Code, Terminal, Activity, MessageCircle, Map, Folder, Trophy, Layers, Radio, Eye } from "lucide-react";

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
  { id: "go_out", title: "touch grass", isOpen: false, isMinimized: false, zIndex: 101, icon: <Map size={14} /> },
  { id: "stream", title: "haishin", isOpen: false, isMinimized: false, zIndex: 101, icon: <Radio size={14} /> },
  { id: "project_view", title: "Project", isOpen: false, isMinimized: false, zIndex: 101, icon: <Eye size={14} /> },
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
  { id: "vegas", name: "Las Vegas", label: "Travel", description: "Macau but worse.", line: "usa" },
  { id: "slc", name: "Salt Lake City", label: "Travel", description: "Snowbird & Beer.", line: "usa" },
  { id: "denver", name: "Denver", label: "Travel", description: "Wild Game & Expensive Matcha.", line: "usa" },
  { id: "nyc", name: "NYC", label: "Travel", description: "The city that never sleeps.", line: "east_coast" },
  { id: "buffalo", name: "Buffalo", label: "Travel", description: "Wings and waterfalls.", line: "east_coast" },
  { id: "dc", name: "Washington", label: "Travel", description: "White House & FBI.", line: "east_coast" },
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
    id: "onewaytools",
    title: "OneWayTools 一企通",
    description: "AI-powered productivity suite with GPT assistants for enterprise workflows.",
    longDescription:
      "A comprehensive AI productivity platform featuring multiple GPT-powered assistants including GPT-3.5 and GPT-4 integrations, JSON translation helpers, essay grading systems, and image generation capabilities. Built for enterprise use with a clean, intuitive interface supporting both web and mobile.",
    tech: ["MongoDB", "Express", "Node.js", "jQuery", "TypeScript"],
    link: "",
    image: "/onewaytools/onewaytools.png",
    media: [{ type: "image", src: "/onewaytools/onewaytools.png" }],
    status: "ARCHIVED",
  },
  {
    id: "lora_transfer",
    title: "LoRA Style Transfer",
    description: "3D style transfer across NeRF scenes using LoRA. A+ Project (100/100).",
    longDescription:
      "Research project implementing style transfer on Neural Radiance Fields using Low-Rank Adaptation (LoRA). Enables efficient artistic style transformation of 3D scenes including black & white, saturation adjustments, negative effects, and mixed styles—all while preserving scene geometry and consistency. Awarded A+ (100/100).",
    tech: ["Python", "PyTorch", "CUDA", "NeRF", "LoRA", "Nerfstudio"],
    link: "",
    image: "/lora_transfer/bnw.mp4",
    media: [
      { type: "video", src: "/lora_transfer/bnw.mp4" },
      { type: "video", src: "/lora_transfer/green.mp4" },
      { type: "video", src: "/lora_transfer/saturation.mp4" },
      { type: "video", src: "/lora_transfer/neg.mp4" },
      { type: "video", src: "/lora_transfer/mixed.mp4" },
    ],
    status: "RESEARCH",
  },
  {
    id: "friday",
    title: "Friday @ Taktora",
    description: "AI-powered car manual diagnostics using RAG and ASR-LLM-TTS flow.",
    longDescription:
      "An intelligent automotive diagnostics system that leverages Retrieval-Augmented Generation (RAG) to query car manuals and diagnostic information. Uses ASR-LLM-TTS (Automatic Speech Recognition, Large Language Model, Text-to-Speech) pipeline to process vehicle issues, retrieve relevant manual sections, and provide audio-guided diagnostic assistance. Enables mechanics and car owners to quickly identify problems and access repair information through natural language queries.",
    tech: ["RAG", "LLM", "TTS", "Vector DB", "Python", "ASR"],
    link: "https://friday.taktora.ai",
    image: "/friday/friday_1.png",
    media: [
      { type: "image", src: "/friday/friday_1.png" },
      { type: "image", src: "/friday/friday_2.png" },
      { type: "image", src: "/friday/friday_3.png" },
    ],
    status: "PROTOTYPE",
  },
  {
    id: "misff",
    title: "MISFF 第一屆澳門國際短片節官網",
    description: "Web app and CRM for Macao International Shorts Film Festival.",
    longDescription:
      "Official web application for the Macao International Shorts Film Festival. Features film schedules, screening times, venue information, director profiles, festival news, and an integrated CRM for managing festival operations and attendee relationships.",
    tech: ["MongoDB", "Express", "Vue.js", "Node.js"],
    link: "",
    image: "/misff/misff_1.png",
    media: [
      { type: "image", src: "/misff/misff_1.png" },
      { type: "image", src: "/misff/misff_2.png" },
      { type: "image", src: "/misff/misff_3.png" },
      { type: "image", src: "/misff/misff_4.png" },
    ],
    status: "ARCHIVED",
  },
  {
    id: "getgo",
    title: "GetGo 求奇",
    description: "Web marketplace for anime collectibles and figures. Featured by MYEIC.",
    longDescription:
      "A vibrant web marketplace for buying, selling, and trading second-hand anime figures, collectibles, and merchandise. Features category filtering, price comparisons, user verification, and a unique lime-green aesthetic. Supports second-hand markets and official store integrations. Featured by MYEIC.",
    tech: ["MongoDB", "Express", "Vue.js", "Node.js"],
    link: "https://gogogok.com",
    image: "/getgo/getgo_1.png",
    media: [
      { type: "image", src: "/getgo/getgo_1.png" },
      { type: "image", src: "/getgo/getgo_2.png" },
      { type: "image", src: "/getgo/getgo_3.png" },
    ],
    status: "LIVE",
  },
  {
    id: "doctail",
    title: "Doctail.ai",
    description: "AI-powered documentation assistant for developers. YC Top 10% Application.",
    longDescription:
      "A containerized documentation tool that provides context-aware search and automatic documentation generation using only libraries relevant to your repository. Tailored to your specific codebase dependencies for precise, repository-focused documentation assistance.",
    tech: ["FastMCP", "Docker", "OpenAI", "MongoDB", "Express", "React", "Postgres"],
    link: "",
    image: "/doctail/doctail_1.png",
    media: [
      { type: "image", src: "/doctail/doctail_1.png" },
      { type: "image", src: "/doctail/doctail_2.png" },
      { type: "image", src: "/doctail/doctail_3.png" },
    ],
    status: "MVP",
  },
  {
    id: "taktora",
    title: "Taktora.ai",
    description: "Production scheduling and planning system for manufacturing.",
    longDescription:
      "Enterprise-grade production scheduling platform for beverage manufacturing. Features multi-line scheduling with changeover time calculations, backlog management, due date tracking, and real-time progress monitoring.",
    tech: ["MongoDB", "Express", "React", "Postgres", "CP-SAT", "PydanticAI"],
    link: "https://taktora.ai",
    image: "/taktora/taktora_1.png",
    media: [
      { type: "image", src: "/taktora/taktora_1.png" },
      { type: "image", src: "/taktora/taktora_2.png" },
      { type: "image", src: "/taktora/taktora_3.png" },
    ],
    status: "LIVE",
  },
  {
    id: "propacks",
    title: "ProPack Solutions",
    description: "E-commerce platform for sustainable packaging solutions.",
    longDescription:
      "Full-featured B2B e-commerce platform for sustainable PCR (post-consumer recycled) plastic packaging. Includes product catalog, inventory management, quote requests, and order processing. Clean, eco-friendly design emphasizing the company's commitment to sustainability.",
    tech: ["MongoDB", "Express", "React", "Postgres", "Stripe"],
    link: "https://propacks.net",
    image: "/propacks/landing.png",
    media: [
      { type: "image", src: "/propacks/landing.png" },
      { type: "image", src: "/propacks/catalog.png" },
      { type: "image", src: "/propacks/product.png" },
      { type: "image", src: "/propacks/inventory.png" },
      { type: "image", src: "/propacks/order.png" },
    ],
    status: "LIVE",
  },
  {
    id: "autostitch",
    title: "AutoStitch Panorama",
    description: "Automatic panorama stitching using homography estimation. A+ Project (100/100).",
    longDescription:
      "Computer vision project implementing automatic panorama creation from multiple images. Uses SIFT feature detection, RANSAC-based homography estimation, and multi-band blending for seamless results. Demonstrated on Yosemite National Park imagery. Awarded A+ (100/100).",
    tech: ["Python", "OpenCV", "NumPy", "SIFT", "RANSAC"],
    link: "",
    image: "/autostitch/yosemite_pano_homography_blendwidth50.png",
    media: [
      { type: "image", src: "/autostitch/yosemite_pano_homography_blendwidth50.png" },
      { type: "image", src: "/autostitch/yosemite1_warp.jpg" },
      { type: "image", src: "/autostitch/yosemite2_warp.jpg" },
      { type: "image", src: "/autostitch/yosemite3_warp.jpg" },
      { type: "image", src: "/autostitch/yosemite4_warp.jpg" },
    ],
    status: "RESEARCH",
  },
  {
    id: "dqn",
    title: "DQN Blackjack",
    description: "Deep Q-Network implementation for optimal Blackjack strategy.",
    longDescription:
      "Reinforcement learning project implementing Deep Q-Networks to learn optimal Blackjack strategy. Visualizes expected reward surfaces for scenarios with and without usable aces, demonstrating the agent's learned value function across different game states.",
    tech: ["Python", "PyTorch", "NumPy", "Matplotlib", "RL"],
    link: "",
    image: "/dqn/dqn.png",
    media: [{ type: "image", src: "/dqn/dqn.png" }],
    status: "RESEARCH",
  },
  {
    id: "timeseries",
    title: "Time Series Forecasting",
    description: "Stock price prediction using deep learning. UBS Hackathon Project.",
    longDescription:
      "Machine learning project for financial time series forecasting built during a UBS hackathon. Implements LSTM and transformer-based models to predict stock prices, achieving competitive RMSE scores. Includes visualization of predictions vs. actual values over multi-year horizons.",
    tech: ["Python", "TensorFlow", "LSTM", "Pandas", "Scikit-learn"],
    link: "",
    image: "/time series/time-series.png",
    media: [{ type: "image", src: "/time series/time-series.png" }],
    status: "RESEARCH",
  },
  {
    id: "projectschart",
    title: "ProjectsChart",
    description: "Project management tool bridging factory sales and production floor.",
    longDescription:
      "A visual project management tool connecting factory sales teams with production floor operations. Enables real-time progress tracking and presentation to customers, ensuring transparency between order placement and manufacturing status.",
    tech: ["React", "TypeScript", "D3.js", "Node.js"],
    link: "",
    image: "/projectschart/Using ProjectsChart.mp4",
    media: [{ type: "video", src: "/projectschart/Using ProjectsChart.mp4" }],
    status: "PROTOTYPE",
  },
  {
    id: "webbit-chat",
    title: "Webbit Chat",
    description: "GPT-4 powered chat application. Showcased at Beyond Expo 2023.",
    longDescription:
      "An intelligent chat application powered by GPT-4, enabling natural conversational interactions. Showcased at Beyond Expo 2023, demonstrating cutting-edge AI-driven communication capabilities.",
    tech: ["GPT-4", "React", "Node.js", "WebSocket"],
    link: "https://chat.webbit-tech.com",
    image: "/webbit-chat/chat_1.png",
    media: [
      { type: "image", src: "/webbit-chat/chat_1.png" },
      { type: "image", src: "/webbit-chat/chat_2.png" },
    ],
    status: "LIVE",
  },
  {
    id: "coresda-esg",
    title: "Coresda ESG Platform",
    description: "AI-powered ESG analytics platform for Hovione. Reducing CO2 emissions.",
    longDescription:
      "AI data analysis platform developed for Hovione, aimed at reducing CO2 emissions by identifying redundant energy usage through anomaly detection and time series forecasting. Helps optimize energy consumption and supports sustainability goals.",
    tech: ["MongoDB", "Express", "Vue.js", "Node.js", "Math.js"],
    link: "",
    image: "/hovione/hovione_1.png",
    media: [
      { type: "image", src: "/hovione/hovione_1.png" },
      { type: "image", src: "/hovione/hovione_2.png" },
    ],
    status: "ARCHIVED",
  },
];
