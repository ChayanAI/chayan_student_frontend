import { useState } from 'react';
import { MenuIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function MobileHeader({ onToggleMobileSidebar }) {
  const [notifications, setNotifications] = useState(0);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };


  return (
    
    <header className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 w-full">
      <button onClick={onToggleMobileSidebar} className="p-2 rounded-md focus:outline-none">
        
      </button>
      <div className="text-lg font-semibold"></div>
      <div className="flex items-center space-x-2">
        <button onClick={toggleDarkMode} className="p-2 rounded-md focus:outline-none">
          {darkMode ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-gray-500" />}
        </button>
        <button className="p-2 rounded-md focus:outline-none">
          <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
}
