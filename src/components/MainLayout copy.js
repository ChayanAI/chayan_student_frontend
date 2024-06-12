"use client";
import { useState } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';
import HeaderBar from './HeaderBar';

export default function MainLayout({ children, showHeader = true }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="flex">
      <DesktopSidebar />
      <MobileSidebar isMobileOpen={isMobileOpen} toggleMobileSidebar={toggleMobileSidebar} />
      <div className="flex flex-col flex-1">
        {showHeader && <HeaderBar onToggleMobileSidebar={toggleMobileSidebar} />}
        <main className={`flex-1 p-6  ${showHeader ? 'pt-16' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
