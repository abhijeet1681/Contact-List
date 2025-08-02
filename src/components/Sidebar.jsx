import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaUserFriends, FaHandshake, FaBullhorn, FaList } from 'react-icons/fa';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
  { name: 'Account', path: '/account', icon: FaUser },
  { name: 'Contact', path: '/contacts', icon: FaUserFriends },
  { name: 'Leads', path: '/leads', icon: FaBullhorn },
  { name: 'Deals', path: '/deals', icon: FaHandshake },
  { name: 'Feedback List', path: '/feedback', icon: FaList },
];

// Sidebar now accepts props to control its state on mobile
const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const location = useLocation();

  const handleLinkClick = () => {
    // Close the sidebar when a link is clicked on smaller screens
    if (window.innerWidth <= 768) {
        closeSidebar();
    }
  };

  return (
    // Conditionally apply the 'open' class based on the prop
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <h2 className="sidebar-header">Abhijeet Jadhav</h2>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                onClick={handleLinkClick} // Add the click handler here
              >
                <item.icon />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;