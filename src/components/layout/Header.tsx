import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Code, PlusCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Check if page is scrolled to add background to header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Helper function to check if a path is active
  const isActivePath = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  // Active link styles
  const getNavLinkStyles = (path: string): string => {
    const baseStyles = "font-medium transition-colors";
    const defaultStyles = "text-slate-700 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-400";
    const activeStyles = "text-indigo-600 dark:text-indigo-400";
    
    return `${baseStyles} ${isActivePath(path) ? activeStyles : defaultStyles}`;
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold text-slate-900 dark:text-white">DevTools</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/tools" 
            className={getNavLinkStyles('/tools')}
          >
            Explore
          </Link>
          <Link 
            to="/categories" 
            className={getNavLinkStyles('/categories')}
          >
            Categories
          </Link>
          <Link 
            to="/trending" 
            className={getNavLinkStyles('/trending')}
          >
            Trending
          </Link>
        </nav>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {/* Submit Tool Button */}
          <Link to="/submit">
            <Button 
              variant="primary" 
              size="md"
              icon={<PlusCircle className="w-4 h-4" />}
              className={isActivePath('/submit') ? 'bg-indigo-700 dark:bg-indigo-600' : ''}
            >
              Submit Tool
            </Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg py-4 px-4 flex flex-col space-y-4">
          <Link 
            to="/tools" 
            className={`px-4 py-2 rounded-lg ${getNavLinkStyles('/tools')}`}
          >
            Explore
          </Link>
          <Link 
            to="/categories" 
            className={`px-4 py-2 rounded-lg ${getNavLinkStyles('/categories')}`}
          >
            Categories
          </Link>
          <Link 
            to="/trending" 
            className={`px-4 py-2 rounded-lg ${getNavLinkStyles('/trending')}`}
          >
            Trending
          </Link>
          <hr className="border-slate-200 dark:border-slate-700" />
          <div className="flex items-center justify-between px-4">
            <span className="text-slate-700 dark:text-slate-200">Theme</span>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <Link to="/submit" className="px-4">
            <Button 
              variant="primary" 
              size="md"
              icon={<PlusCircle className="w-4 h-4" />}
              fullWidth
              className={isActivePath('/submit') ? 'bg-indigo-700 dark:bg-indigo-600' : ''}
            >
              Submit Tool
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;