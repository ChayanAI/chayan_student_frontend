"use client";
import { useState } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';
import HeaderBar from './HeaderBar';
import MobileHeader from './MobileHeader';

export default function MainLayout({ children, showHeader = true }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="flex">
      {/* <DesktopSidebar />
      <MobileSidebar isMobileOpen={isMobileOpen} toggleMobileSidebar={toggleMobileSidebar} /> */}
      <div className="flex flex-col flex-1">
        {showHeader && <>
          <div className="hidden md:block">
            <HeaderBar onToggleMobileSidebar={toggleMobileSidebar} />
          </div>
          <div className="md:hidden">
            <MobileHeader onToggleMobileSidebar={toggleMobileSidebar} />
          </div>
        </>}
        <main className={`flex-1 ${showHeader ? 'border-t border-[#E2E2EA] dark:border-black' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
