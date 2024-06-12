"use client";

import { useState, createContext, useContext } from 'react';
import { ChevronRight, ChevronLeft, MoreVertical, Menu } from 'lucide-react';
import Link from 'next/link';
import menuConfig from '../utils/menuConfig'; // Adjust the path as necessary

const SidebarContext = createContext();

export function SidebarItem({ icon, text, href }) {
  const { isMobileOpen, toggleMobileSidebar } = useContext(SidebarContext);
  return (
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isMobileOpen ? "hover:bg-indigo-50 text-gray-600" : "text-gray-600"}`}>
      <Link href={href} className="flex items-center" onClick={toggleMobileSidebar}>
        {icon}
        <span className={`overflow-hidden transition-all ${isMobileOpen ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      </Link>
    </li>
  );
}

export default function MobileSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button onClick={toggleMobileSidebar} className="p-2 text-gray-600 focus:outline-none focus:ring">
          {isMobileOpen ? <ChevronLeft className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <aside className={`h-screen fixed z-20 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden bg-white`}>
        <nav className={`h-full flex flex-col border-r shadow-sm`}>
          <SidebarContext.Provider value={{ isMobileOpen, toggleMobileSidebar }}>
            <ul className="flex-1 px-3 mt-14">
              {menuConfig.map((item, index) => (
                <SidebarItem key={index} {...item} />
              ))}
            </ul>
          </SidebarContext.Provider>
        </nav>
      </aside>

      {/* Content Overlay for Mobile */}
      {isMobileOpen && <div className="fixed inset-0 z-10 bg-black opacity-50 md:hidden" onClick={toggleMobileSidebar}></div>}
    </>
  );
}
