import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaUserFriends, FaHandshake, FaBullhorn, FaList } from 'react-icons/fa';

const navItems = [
  // ... (navItems array remains the same)
  { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
  { name: 'Account', path: '/account', icon: FaUser },
  { name: 'Contact', path: '/contacts', icon: FaUserFriends },
  { name: 'Leads', path: '/leads', icon: FaBullhorn },
  { name: 'Deals', path: '/deals', icon: FaHandshake },
  { name: 'Feedback List', path: '/feedback', icon: FaList },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-header">My CRM</h2>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
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