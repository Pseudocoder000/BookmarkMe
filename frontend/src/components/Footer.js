import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">About</h3>
            <p className="text-sm leading-relaxed">
              BookmarkMe is a privacy-first bookmarks app that lets you save, organize, and share your favorite links with complete control.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-blue-400 transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-400 transition">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition">Pricing</a></li>
              <li><a href="#blog" className="hover:text-blue-400 transition">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-400 transition">Terms of Service</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition">Contact Us</a></li>
              <li><a href="/cookies" className="hover:text-blue-400 transition">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#help" className="hover:text-blue-400 transition">Help Center</a></li>
              <li><a href="#docs" className="hover:text-blue-400 transition">Documentation</a></li>
              <li><a href="#api" className="hover:text-blue-400 transition">API Docs</a></li>
              <li><a href="#status" className="hover:text-blue-400 transition">Status</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-500 rounded-full flex items-center justify-center transition transform hover:scale-110"
                title="Twitter/X"
              >
                𝕏
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition transform hover:scale-110"
                title="Facebook"
              >
                f
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-pink-500 rounded-full flex items-center justify-center transition transform hover:scale-110"
                title="Instagram"
              >
                📷
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition transform hover:scale-110"
                title="LinkedIn"
              >
                in
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 hover:bg-gray-400 rounded-full flex items-center justify-center transition transform hover:scale-110"
                title="GitHub"
              >
                🐙
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="text-center text-sm text-gray-400">
            <p className="mb-2">Created with ❤️ by Jaya Ganguly</p>
            <p>© {currentYear} Jaya Ganguly. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
