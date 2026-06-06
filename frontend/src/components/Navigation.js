import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">🔖</span>
          </div>
          <span>BookmarkMe</span>
        </Link>
        
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-gray-300">{user.email}</span>
              <Link to="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
