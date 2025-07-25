// src/Counter_frontend/src/App.jsx

import React, { useEffect, useState } from 'react';
// Explicitly import from the index.js file within the declarations.
// This is often the most robust way to import generated DFX declarations.
import { Counter_backend } from '../../declarations/Counter_backend/index.js'; // <-- Changed import path

function App() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchCount = async () => {
    setLoading(true);
    setMessage('');
    try {
      const currentCount = await Counter_backend.get();
      setCount(Number(currentCount));
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
    } catch (error) {
      console.error("Failed to reset count:", error);
      setMessage("Failed to reset counter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-inter bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 animate-gradient-shift">
      {/* Global Styles for Animations */}
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

        .button-gradient {
          background-image: linear-gradient(45deg, #6366f1, #a855f7);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        }

        .button-gradient:hover {
          background-image: linear-gradient(45deg, #a855f7, #6366f1);
          box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
        }

        .button-reset-gradient {
          background-image: linear-gradient(45deg, #4b5563, #6b7280);
          box-shadow: 0 4px 15px rgba(75, 85, 99, 0.4);
        }

        .button-reset-gradient:hover {
          background-image: linear-gradient(45deg, #6b7280, #4b5563);
          box-shadow: 0 6px 20px rgba(107, 114, 128, 0.6);
        }

        .button-disabled {
          cursor: not-allowed;
          opacity: 0.6;
          filter: grayscale(50%);
        }
        `}
      </style>

      <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center overflow-hidden transform transition-all duration-500 hover:scale-105 border-4 border-transparent hover:border-indigo-500">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 opacity-10 blur-3xl scale-150 animate-pulse-strong"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight drop-shadow-lg">
            Motoko Counter
          </h1>

          {loading ? (
            <p className="text-2xl text-blue-600 animate-pulse-strong font-semibold">Loading...</p>
          ) : (
            <p className="text-8xl font-black text-indigo-700 mb-10 drop-shadow-xl animate-pop-in">
              {count !== null ? count : 'Error'}
            </p>
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
              {loading ? 'Incrementing...' : 'Increment Counter'}
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className={`w-full text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95 button-reset-gradient
                ${loading ? 'button-disabled' : ''}`}
            >
              {loading ? 'Resetting...' : 'Reset Counter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
