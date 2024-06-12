// src/utils/menuConfig.js
import { Home, User, Settings, LayoutDashboard, Video, FileCheck, Code, Sparkles, HeartHandshake, MessagesSquare, FlaskConical } from 'lucide-react';

const menuConfig = [
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    text: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    text: "Job List",
    href: "/joblist",
  },
  {
    icon: <Video className="w-6 h-6" />,
    text: "Interview",
    href: "/interview",
  },
  {
    icon: <FileCheck className="w-6 h-6" />,
    text: "Resume",
    href: "/resume",
  },
  {
    icon: <Code className="w-6 h-6" />,
    text: "Technical Skills",
    href: "/technical-skills",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    text: "Soft Skills",
    href: "/soft-skills",
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    text: "Mind-ease",
    href: "/soft-skills",
  },
  {
    icon: <MessagesSquare className="w-6 h-6" />,
    text: "Support",
    href: "/soft-skills",
  },
  {
    icon: <FlaskConical className="w-6 h-6" />,
    text: "Dewansh",
    href: "/dewansh",
  },
];

export default menuConfig;
