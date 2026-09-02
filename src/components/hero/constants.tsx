import React from "react";
import {
  Sparkles,
  Globe,
  Cpu,
  Smartphone,
  Server,
  TrendingUp,
} from "lucide-react";

export const START_FRAME = 1;
export const TOTAL_FRAMES = 120;

// Duration in ms for smooth cinematic travel (snappy & responsive)
export const SCROLL_TRANSITION_DURATION = 1100;

export const FRAME_PATH = (index: number) =>
  `/frames/frame_${String(index).padStart(4, "0")}.jpg`;

// 20 Discrete Visual Milestones (1 per scroll step)
export const SECTION_STEPS = [
  { id: 0, num: "01", label: "Hero", progress: 0.0 },
  { id: 1, num: "02", label: "Vision", progress: 0.14 },
  { id: 2, num: "03", label: "Overview", progress: 0.26 },
  { id: 3, num: "04", label: "Core Services", progress: 0.38 },
  { id: 4, num: "05", label: "Scale Services", progress: 0.5 },
  { id: 5, num: "06", label: "Systems", progress: 0.6 },
  { id: 6, num: "07", label: "Video 01", progress: 0.68 },
  { id: 7, num: "08", label: "Video 02", progress: 0.76 },
  { id: 8, num: "09", label: "Video 03", progress: 0.84 },
  { id: 9, num: "10", label: "Isofinity", progress: 0.92 },
  { id: 10, num: "11", label: "Framework", progress: 1.0 },
  { id: 11, num: "12", label: "Discovery", progress: 1.08 },
  { id: 12, num: "13", label: "Strategy", progress: 1.16 },
  { id: 13, num: "14", label: "Design & Dev", progress: 1.24 },
  { id: 14, num: "15", label: "Launch & Support", progress: 1.32 },
  { id: 15, num: "16", label: "Real World", progress: 1.40 },
  { id: 16, num: "17", label: "Design + Eng", progress: 1.48 },
  { id: 17, num: "18", label: "AI Purpose", progress: 1.56 },
  { id: 18, num: "19", label: "Built to Evolve", progress: 1.64 },
  { id: 19, num: "20", label: "Clients", progress: 1.72 },
  { id: 20, num: "21", label: "Connect", progress: 1.80 },
];

export interface FrameworkStepItem {
  id: number;
  stepNumber: string;
  title: string;
  description: string;
  side: "right" | "left";
}

export const FRAMEWORK_STEPS: FrameworkStepItem[] = [
  {
    id: 1,
    stepNumber: "01",
    title: "Discovery",
    description:
      "Identifying the core of your business ideas, pain points, current systems and technical landscape constraints.",
    side: "right",
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Strategy",
    description:
      "Develop the tailored IT strategy and architect a premium visual & interactive logic framework.",
    side: "left",
  },
  {
    id: 3,
    stepNumber: "03",
    title: "Design & Development",
    description:
      "Our experienced team handles the entire deployment with minimal disruption and highly intelligent backend systems.",
    side: "right",
  },
  {
    id: 4,
    stepNumber: "04",
    title: "Launch & Support",
    description:
      "Identifying the core of your business ideas, pain points, current systems and technical landscape constraints.",
    side: "left",
  },
];

export interface PointOfViewItem {
  id: number;
  cardNumber: string;
  title: string;
  description: string;
  image: string;
}

export const POINT_OF_VIEW_ITEMS: PointOfViewItem[] = [
  {
    id: 1,
    cardNumber: "01",
    title: "BUILT FOR THE REAL WORLD",
    description:
      "We design around real business problems, not technology for technology's sake.",
    image: "/images/image1.png",
  },
  {
    id: 2,
    cardNumber: "02",
    title: "DESIGN + ENGINEERING",
    description:
      "Creating experiences and engineering solutions that scale from the beginning.",
    image: "/images/image2.png",
  },
  {
    id: 3,
    cardNumber: "03",
    title: "AI WITH PURPOSE",
    description:
      "We use AI where it creates real value and leverage — not vanity features or gimmicks.",
    image: "/images/image3.png",
  },
  {
    id: 4,
    cardNumber: "04",
    title: "BUILT TO EVOLVE",
    description:
      "Systems should grow and endure as your business grows.",
    image: "/images/image4.png",
  },
];

export interface ServiceItem {
  id: number;
  cardNumber?: string | number;
  category?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  tags?: string[];
}

// Phase 1 Core Services
export const PHASE_1_SERVICES: ServiceItem[] = [
  {
    id: 1,
    cardNumber: "01",
    category: "INTERFACE & 3D",
    title: "UI/UX DESIGN & 3D VISUALIZATION",
    description:
      "High-impact visual storytelling, brutalist design systems, and immersive 3D web interfaces.",
    icon: <Sparkles className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    tags: ["Brutalist UI", "3D WebGL", "Motion Systems"],
  },
  {
    id: 2,
    cardNumber: "02",
    category: "CORE ARCHITECTURE",
    title: "FULL-STACK WEB & PLATFORMS",
    description:
      "High-performance modern web apps, reactive frontends, and robust cloud architectures.",
    icon: <Globe className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js App", "Reactive Cloud", "API Mesh"],
  },
  {
    id: 3,
    cardNumber: "03",
    category: "NEURAL WORKFLOWS",
    title: "AI & WORKFLOW AUTOMATION",
    description:
      "Intelligent automations, autonomous LLM agents, and custom AI pipeline integrations.",
    icon: <Cpu className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    tags: ["LLM Agents", "AI Pipelines", "Autonomous Ops"],
  },
];

// Phase 2 Scale & Growth Services
export const PHASE_2_SERVICES: ServiceItem[] = [
  {
    id: 4,
    cardNumber: "04",
    category: "MOBILE ECOSYSTEMS",
    title: "MOBILE APP ECOSYSTEMS",
    description:
      "Native and cross-platform iOS and Android apps engineered for speed and conversion.",
    icon: <Smartphone className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    tags: ["iOS & Android", "Native Engine", "Micro-UX"],
  },
  {
    id: 5,
    cardNumber: "05",
    category: "CLOUD & DEVOPS",
    title: "CLOUD INFRASTRUCTURE & DEVOPS",
    description:
      "Scalable cloud clusters, automated CI/CD deployment pipelines, and global CDN delivery.",
    icon: <Server className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    tags: ["Kubernetes", "Global Edge", "Zero Downtime"],
  },
  {
    id: 6,
    cardNumber: "06",
    category: "GROWTH & ANALYTICS",
    title: "GROWTH & PERFORMANCE MARKETING",
    description:
      "Data-driven growth strategies, conversion optimization, and real-time behavioral analytics.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tags: ["Conversion AI", "Metrics Funnel", "Growth Loops"],
  },
];

export interface CinematicVideoItem {
  id: number;
  src: string;
}

// 3 Cinematic Full-Focus Video Showcases
export const CINEMATIC_VIDEOS: CinematicVideoItem[] = [
  {
    id: 1,
    src: "/videos/video1.mp4",
  },
  {
    id: 2,
    src: "/videos/video2.mp4",
  },
  {
    id: 3,
    src: "/videos/video3.mp4",
  },
];

// Ultra-smooth, natural continuous cosine ease-in-out curve
export const easeInOutSmooth = (t: number): number => {
  return (1 - Math.cos(Math.PI * t)) / 2;
};

// Helper for smooth progress clamping
export const clamp = (val: number, min: number, max: number): number =>
  Math.min(1, Math.max(0, (val - min) / (max - min)));
