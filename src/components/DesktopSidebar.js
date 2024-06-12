"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { ChevronFirst, ChevronLast, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import menuConfig from '../utils/menuConfig'; // Adjust the path as necessary
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const SidebarContext = createContext();

export function SidebarItem({ icon, text, href }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      data-tip={text}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${expanded ? "hover:bg-indigo-50 text-gray-600" : "text-gray-600"}`}
    >
      <Link href={href} className="flex items-center">
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      </Link>
      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
        {text}
    </div>
      )}
    </li>
  );
}

export default function DesktopSidebar() {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem('sidebar-expanded');
    if (storedState) {
      setExpanded(JSON.parse(storedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !expanded;
    setExpanded(newState);
    localStorage.setItem('sidebar-expanded', JSON.stringify(newState));
  };

  return (
    <aside className="h-screen hidden md:flex flex-col bg-white border-r shadow-sm">
      <div className="p-4 pb-2 flex justify-between items-center">
        <img src="/media/logo/logo.png" className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} />
        <button onClick={toggleSidebar} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
          {expanded ? <ChevronFirst /> : <ChevronLast />}
        </button>
      </div>
      <SidebarContext.Provider value={{ expanded }}>
        <ul className="flex-1 px-3">
          {menuConfig.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
        </ul>
      </SidebarContext.Provider>
      <div className="border-t flex p-3">
        <img src="/media/logo/profile.png" className="w-10 h-10 rounded-md" />
        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
          <div className="leading-4">
            <h4 className="font-semibold">constGenius</h4>
            <span className="text-xs text-gray-600">constgenius@gmail.com</span>
          </div>
          <MoreVertical size={20} />
        </div>
      </div>
    </aside>
  );
}
