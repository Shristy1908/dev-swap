import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useTools } from '../../context/ToolsContext';

const FeaturedTools: React.FC = () => {
  const { featuredTools } = useTools();
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredTools.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, featuredTools.length]);
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % featuredTools.length);
  };
  
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + featuredTools.length) % featuredTools.length);
  };
  
  if (featuredTools.length === 0) return null;
  
  return (
    <div 
      className="relative overflow-hidden rounded-xl h-[500px] md:h-[600px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Controls */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <div 
            className="relative h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredTools[current].imageUrl})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium mb-4">
                Featured Tool
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                {featuredTools[current].name}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
                {featuredTools[current].description}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {featuredTools[current].tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/20 text-white text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to={`/tool/${featuredTools[current].id}`}>
                  <Button variant="primary" size="lg">
                    View Details
                  </Button>
                </Link>
                <a
                  href={featuredTools[current].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                    GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredTools.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === current 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedTools;