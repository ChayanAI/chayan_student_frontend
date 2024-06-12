"use client";

import { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon, Menu } from '@heroicons/react/24/solid';

export default function HeaderBar({ onToggleMobileSidebar }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <header className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800">
      <div className="md:hidden flex items-center">
        <button onClick={onToggleMobileSidebar} className="p-2 text-gray-600 focus:outline-none focus:ring">
          <Menu className="w-6 h-6" />
        </button>
        <div className="ml-3 text-lg font-semibold">My App</div>
      </div>
      <div className="hidden md:block text-lg font-semibold">My App</div>
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
