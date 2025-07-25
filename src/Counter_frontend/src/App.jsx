// src/Counter_frontend/src/App.jsx

import React, { useEffect, useState } from 'react';
import { Counter_backend } from '../../declarations/Counter_backend';

function App() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [particles, setParticles] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [theme, setTheme] = useState('default');
  const [history, setHistory] = useState([]);

  const themes = {
    default: {
      bg: 'from-purple-600 via-indigo-700 to-blue-800',
      text: 'text-indigo-700',
      button: 'from-indigo-500 to-purple-500',
      reset: 'from-gray-500 to-gray-600'
    },
    sunset: {
      bg: 'from-pink-500 via-red-500 to-yellow-500',
      text: 'text-red-500',
      button: 'from-red-400 to-orange-500',
      reset: 'from-yellow-500 to-orange-500'
    },
    ocean: {
      bg: 'from-cyan-500 via-blue-500 to-teal-500',
      text: 'text-cyan-600',
      button: 'from-cyan-400 to-blue-500',
      reset: 'from-teal-400 to-blue-500'
    },
    forest: {
      bg: 'from-green-600 via-emerald-500 to-teal-600',
      text: 'text-emerald-600',
      button: 'from-green-500 to-emerald-500',
      reset: 'from-teal-500 to-emerald-600'
    }
  };

  const fetchCount = async () => {
    setLoading(true);
    setMessage('');
    try {
      const currentCount = await Counter_backend.get();
      setCount(Number(currentCount));
      setHistory(prev => [...prev.slice(-4), Number(currentCount)]);
    } catch (error) {
      console.error("Failed to fetch count:", error);
      setMessage("Failed to load counter. Please try again.");
      setCount(null);
    } finally {
      setLoading(false);
    }
  };

  const handleIncrement = async () => {
    setLoading(true);
    setMessage('');
    try {
      const newCount = await Counter_backend.increment();
      setCount(Number(newCount));
      setMessage("Counter incremented successfully!");
      setHistory(prev => [...prev.slice(-4), Number(newCount)]);
      createParticles(10);
    } catch (error) {
      console.error("Failed to increment count:", error);
      setMessage("Failed to increment counter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setMessage('');
    try {
      const newCount = await Counter_backend.reset();
      setCount(Number(newCount));
      setMessage("Counter reset successfully!");
      setHistory(prev => [...prev.slice(-4), Number(newCount)]);
      createParticles(15, true);
    } catch (error) {
      console.error("Failed to reset count:", error);
      setMessage("Failed to reset counter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createParticles = (count, isReset = false) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Math.random().toString(36).substr(2, 9),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        color: isReset 
          ? `rgb(156, 163, 175)` 
          : `rgb(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100)}, 255)`,
        life: 100,
        speed: Math.random() * 2 + 1
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ ...p, life: p.life - 1 }))
          .filter(p => p.life > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchCount();
  }, []);

  const changeTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 font-inter bg-gradient-to-br ${themes[theme].bg} animate-gradient-shift`}>
      {/* Global Styles */}
      <style>
        {`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        .animate-pulse-strong {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }

        .animate-fade-in-out {
          animation: fadeInOut 3s forwards;
        }

        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-pop-in {
          animation: popIn 0.3s ease-out;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .button-gradient {
          background-image: linear-gradient(45deg, ${themes[theme].button.split(' ')[0]}, ${themes[theme].button.split(' ')[2]});
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }

        .button-gradient:hover {
          background-image: linear-gradient(45deg, ${themes[theme].button.split(' ')[2]}, ${themes[theme].button.split(' ')[0]});
          box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
        }

        .button-reset-gradient {
          background-image: linear-gradient(45deg, ${themes[theme].reset.split(' ')[0]}, ${themes[theme].reset.split(' ')[2]});
          box-shadow: 0 4px 15px rgba(75, 85, 99, 0.4);
        }

        .button-reset-gradient:hover {
          background-image: linear-gradient(45deg, ${themes[theme].reset.split(' ')[2]}, ${themes[theme].reset.split(' ')[0]});
          box-shadow: 0 6px 20px rgba(107, 114, 128, 0.6);
        }

        .button-disabled {
          cursor: not-allowed;
          opacity: 0.6;
          filter: grayscale(50%);
        }
        `}
      </style>

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life / 100,
            transform: `translateY(-${(100 - particle.life) * particle.speed}px)`
          }}
        />
      ))}

      <div 
        className="relative bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center overflow-hidden transform transition-all duration-500 hover:scale-105 border-4 border-transparent hover:border-white/30 backdrop-blur-sm"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-30 blur-3xl scale-150 animate-pulse-strong"></div>
        
        {/* Theme changer button */}
        <button 
          onClick={changeTheme}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 group"
          title="Change theme"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <span className="absolute top-full right-0 mt-2 w-max bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Change Theme
          </span>
        </button>

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight drop-shadow-lg animate-float">
            Motoko Counter
          </h1>

          {/* History visualization */}
          <div className="flex justify-center mb-6 h-12 items-end gap-1">
            {history.map((h, i) => (
              <div 
                key={i} 
                className="bg-indigo-400/30 w-6 rounded-t transition-all duration-500 ease-out"
                style={{ height: `${Math.min(100, (h / (Math.max(...history, 1) || 1)) * 100)}%` }}
              />
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-2xl text-blue-600 font-semibold">Loading...</p>
            </div>
          ) : (
            <div className="relative">
              <p className={`text-8xl font-black ${themes[theme].text} mb-10 drop-shadow-xl animate-pop-in`}>
                {count !== null ? count : 'Error'}
              </p>
              {isHovering && (
                <div className="absolute -bottom-2 left-0 right-0 text-xs text-gray-500">
                  {new Date().toLocaleTimeString()}
                </div>
              )}
            </div>
          )}

          {message && (
            <div className={`mb-8 p-4 rounded-xl shadow-md text-lg font-medium animate-fade-in-out
              ${message.includes('Failed') ? 'bg-red-200 text-red-800 border border-red-400' : 'bg-green-200 text-green-800 border border-green-400'}`}>
              {message}
            </div>
          )}

          <div className="flex flex-col space-y-6">
            <button
              onClick={handleIncrement}
              disabled={loading}
              className={`w-full text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 button-gradient
                ${loading ? 'button-disabled' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Incrementing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Increment Counter
                </span>
              )}
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className={`w-full text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 button-reset-gradient
                ${loading ? 'button-disabled' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Reset Counter
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;