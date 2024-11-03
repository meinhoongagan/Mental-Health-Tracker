import React, { useMemo } from 'react';
import Sidebar from './components/SideBar';

const Layout = ({ children }) => {
  // Generate random particles with varied properties
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      initialLeft: `${Math.random() * 100}%`,
      initialTop: `${Math.random() * 100}%`,
      duration: `${Math.random() * 20 + 10}s`,
      delay: `${Math.random() * -20}s`,
      opacity: Math.random() * 0.5 + 0.3
    }));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-x" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full animate-particle-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.initialLeft,
              top: particle.initialTop,
              opacity: particle.opacity,
              animation: `particle-float ${particle.duration} infinite linear`,
              animationDelay: particle.delay,
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Slow moving nebula effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-full h-full animate-nebula">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: '40%',
                height: '40%',
                background: `radial-gradient(circle, ${['rgba(147, 51, 234, 0.2)', 'rgba(59, 130, 246, 0.2)', 'rgba(236, 72, 153, 0.2)'][i]} 0%, transparent 70%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: 'translate(-50%, -50%)',
                animation: `nebula-float ${30 + i * 10}s infinite linear`
              }}
            />
          ))}
        </div>
      </div>
          <Sidebar/>
      {/* Content */}
      <div className="relative z-10 container mx-auto  flex-1 ml-20 p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;