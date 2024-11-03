import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home,
  Brain,
  Calendar,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  BarChart2,
  MessageCircle
} from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', name: 'Dashboard', icon: Home },
    { path: '/mental-health', name: 'Mental Health', icon: Brain },
    { path: '/appointments', name: 'Appointments', icon: Calendar },
    { path: '/analytics', name: 'Analytics', icon: BarChart2 },
    { path: '/chat', name: 'Chat Support', icon: MessageCircle },
    { path: '/profile', name: 'Profile', icon: User },
    { path: '/settings', name: 'Settings', icon: Settings },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className={`fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-in-out
      ${isExpanded ? 'w-64' : 'w-20'}`}>
      {/* Animated gradient border */}
      <div className="absolute -right-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-blue-500 to-purple-600 blur-sm" />

      {/* Main sidebar container */}
      <div className="relative h-full bg-gray-900/80 backdrop-blur-xl border-r border-white/10 overflow-hidden">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Content container */}
        <div className="relative h-full flex flex-col">
          {/* Toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-4 top-6 text-white/70 hover:text-white transition-colors"
          >
            {isExpanded ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo area */}
          <div className="flex items-center h-20 px-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className={`ml-3 font-semibold text-white transition-opacity duration-200
              ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
              MindSpace
            </span>
          </div>

          {/* Navigation items */}
          <nav className="flex-1 px-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-3 py-3 mb-2 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    }
                    ${isActive && 'shadow-[0_0_20px_rgba(59,130,246,0.2)]'}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
                  <span className={`ml-3 transition-opacity duration-200
                    ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                    {item.name}
                  </span>
                  {!isExpanded && isActive && (
                    <div className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-3 mb-3">
            <button className="w-full flex items-center px-3 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
              <LogOut className="w-5 h-5" />
              <span className={`ml-3 transition-opacity duration-200
                ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;