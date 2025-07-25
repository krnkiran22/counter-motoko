// src/Counter_frontend/src/App.jsx

import React, { useEffect, useState } from 'react';
// Import the agent for your Counter_backend canister.
// The path is adjusted based on your directory structure:
// from src/Counter_frontend/src/App.jsx, go up two levels to src/,
// then into declarations/Counter_backend.
import { Counter_backend } from '../../declarations/Counter_backend';

function App() {
  // State to hold the current counter value
  // No type annotations needed for JavaScript
  const [count, setCount] = useState(null);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State for displaying messages to the user (e.g., errors, success)
  const [message, setMessage] = useState('');

  // Function to fetch the current count from the Motoko backend
  const fetchCount = async () => {
    setLoading(true);
    setMessage('');
    try {
      // Call the 'get' function on the Counter_backend canister
      const currentCount = await Counter_backend.get();
      // Convert BigInt to number for React state
      setCount(Number(currentCount));
    } catch (error) {
      console.error("Failed to fetch count:", error);
      setMessage("Failed to load counter. Please try again.");
      setCount(null); // Clear count on error
    } finally {
      setLoading(false);
    }
  };

  // Function to increment the counter
  const handleIncrement = async () => {
    setLoading(true);
    setMessage('');
    try {
      // Call the 'increment' function on the Counter_backend canister
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

  // Function to reset the counter
  const handleReset = async () => {
    setLoading(true);
    setMessage('');
    try {
      // Call the 'reset' function on the Counter_backend canister
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

  // useEffect hook to fetch the count when the component mounts
  useEffect(() => {
    fetchCount();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Motoko Counter App
        </h1>

        {loading ? (
          <p className="text-xl text-blue-600 animate-pulse">Loading counter...</p>
        ) : (
          <p className="text-6xl font-bold text-indigo-700 mb-8">
            {count !== null ? count : 'Error'}
          </p>
        )}

        {message && (
          <div className={`mb-6 p-3 rounded-lg ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleIncrement}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Incrementing...' : 'Increment'}
          </button>
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting...' : 'Reset'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
