"use client";

import { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import NavOverlay from './NavOverlay';

export default function HeaderBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <header className="hidden md:flex justify-between items-center px-16 py-3 bg-white dark:bg-[#161618] z-50 relative">
      <div className="flex justify-center items-center">
        <img src="/media/images/NavLogo.svg" alt="Chayan.ai" className="h-9" />
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="p-2 rounded-full focus:outline-none">
          {darkMode ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-gray-500" />}
        </button>
        <button onClick={toggleOverlay} className="p-2 flex gap-2 items-center rounded-full focus:outline-none">
          <img src="/media/images/Profile.svg" alt="Profile" />
          <img src="/media/images/ChevronDown.svg" alt="open" />
        </button>
      </div>
      {isOpen && <NavOverlay darkMode={darkMode} setDarkMode={setDarkMode} />}
    </header>
  );
}
