import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa'; // Import hamburger icon

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="layout-container">
      {/* Overlay for mobile view */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Pass state and setter to Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      {/* Main content area */}
      <main className="main-content">
        {/* Hamburger Menu Button for mobile */}
        <button 
          className="mobile-menu-button" 
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars size={20} />
        </button>
        {children}
      </main>
    </div>
  );
};

export default Layout;