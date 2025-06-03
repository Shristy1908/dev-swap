import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">DevTools</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
              The platform for developers to discover, share, and manage the best coding tools, extensions, and resources.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tools" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                  Explore Tools
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                  Submit Tool
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/react-tools" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                  React Tools
                </Link>
              </li>
              <li>
                <Link to="/category/vscode-extensions" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                  VSCode Extensions
                </Link>
              </li>
              <li>
                <Link to="/category/apis" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                  APIs
                </Link>
              </li>
              <li>
                <Link to="/category/ui-kits" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">
                  UI Kits
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} DevTools. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link to="/privacy" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;