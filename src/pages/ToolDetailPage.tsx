import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Bookmark, ExternalLink, Github, Calendar, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { useTools } from '../context/ToolsContext';

const ToolDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tools, likedTools, savedTools, toggleLike, toggleSave } = useTools();
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Find the tool by ID
  const tool = tools.find(t => t.id === id);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    // Scroll to top when navigating to this page
    window.scrollTo(0, 0);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Check if the tool is liked or saved
  const isLiked = tool ? likedTools.includes(tool.id) : false;
  const isSaved = tool ? savedTools.includes(tool.id) : false;
  
  // Handle like button click
  const handleLikeClick = () => {
    if (tool) {
      toggleLike(tool.id);
    }
  };
  
  // Handle save button click
  const handleSaveClick = () => {
    if (tool) {
      toggleSave(tool.id);
    }
  };
  
  // Open image in lightbox
  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    document.body.style.overflow = 'hidden';
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setActiveImageIndex(null);
    document.body.style.overflow = 'auto';
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Tool Not Found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          The tool you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/tools">
          <Button variant="primary">
            Browse All Tools
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-64 md:h-80 overflow-hidden relative">
            <img 
              src={tool.imageUrl} 
              alt={tool.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium mb-4">
                {tool.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {tool.name}
              </h1>
              <p className="text-white/90 max-w-3xl">
                {tool.description}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tags */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Screenshots */}
            {tool.screenshots && tool.screenshots.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Screenshots
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tool.screenshots.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer rounded-md overflow-hidden"
                      onClick={() => openLightbox(index)}
                    >
                      <img 
                        src={screenshot} 
                        alt={`${tool.name} screenshot ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Action Buttons */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col space-y-4">
                {tool.demoUrl && (
                  <a 
                    href={tool.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button 
                      variant="primary" 
                      size="lg"
                      icon={<ExternalLink className="w-4 h-4" />}
                      fullWidth
                    >
                      View Demo
                    </Button>
                  </a>
                )}
                
                <a 
                  href={tool.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    icon={<Github className="w-4 h-4" />}
                    fullWidth
                  >
                    GitHub Repository
                  </Button>
                </a>
                
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleLikeClick}
                    className={`flex items-center justify-center ${isLiked ? 'text-red-500 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isLiked ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400' : ''}`} />
                    {isLiked ? 'Liked' : 'Like'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleSaveClick}
                    className={`flex items-center justify-center ${isSaved ? 'text-amber-500 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    <Bookmark className={`w-5 h-5 mr-2 ${isSaved ? 'fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Tool Info */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Tool Information
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-700 dark:text-slate-300">
                  <Calendar className="w-5 h-5 mr-3 text-slate-500 dark:text-slate-400" />
                  <div>
                    <span className="block text-sm text-slate-500 dark:text-slate-400">Added on</span>
                    <span>{tool.createdAt}</span>
                  </div>
                </li>
                <li className="flex items-center text-slate-700 dark:text-slate-300">
                  <Eye className="w-5 h-5 mr-3 text-slate-500 dark:text-slate-400" />
                  <div>
                    <span className="block text-sm text-slate-500 dark:text-slate-400">Views</span>
                    <span>{tool.views}</span>
                  </div>
                </li>
                <li className="flex items-center text-slate-700 dark:text-slate-300">
                  <Heart className="w-5 h-5 mr-3 text-slate-500 dark:text-slate-400" />
                  <div>
                    <span className="block text-sm text-slate-500 dark:text-slate-400">Likes</span>
                    <span>{tool.likes}</span>
                  </div>
                </li>
                <li className="flex items-center text-slate-700 dark:text-slate-300">
                  <svg className="w-5 h-5 mr-3 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <span className="block text-sm text-slate-500 dark:text-slate-400">Author</span>
                    <span>{tool.author}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {activeImageIndex !== null && tool.screenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={tool.screenshots[activeImageIndex]}
              alt={`${tool.name} screenshot ${activeImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {tool.screenshots.length > 1 && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
                {tool.screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full ${
                      index === activeImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`View screenshot ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolDetailPage;