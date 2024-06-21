"use client";

import { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function HeaderBar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <header className="hidden md:flex justify-between items-center px-4 py-2 bg-slate-200 dark:bg-[#161618] z-50 relative">
      <div className="text-lg font-semibold"></div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="p-2 rounded-full focus:outline-none">
          {darkMode ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-gray-500" />}
        </button>
        <button className="p-2 rounded-full focus:outline-none">
          <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
}
