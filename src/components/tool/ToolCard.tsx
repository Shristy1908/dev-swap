import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tool } from '../../types';
import Card from '../ui/Card';
import { useTools } from '../../context/ToolsContext';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { likedTools, savedTools, toggleLike, toggleSave } = useTools();
  const isLiked = likedTools.includes(tool.id);
  const isSaved = savedTools.includes(tool.id);
  
  return (
    <Card className="flex flex-col h-full">
      {/* Image */}
      <Link to={`/tool/${tool.id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img 
            src={tool.imageUrl} 
            alt={tool.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/tool/${tool.id}`} className="block">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {tool.name}
            </h3>
          </Link>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            {tool.category}
          </span>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">
          {tool.description.length > 100 
            ? tool.description.substring(0, 100) + '...'
            : tool.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <motion.button
              onClick={() => toggleLike(tool.id)}
              whileTap={{ scale: 0.9 }}
              className="flex items-center text-slate-600 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400' : ''}`} />
              <span className="text-xs">{tool.likes}</span>
            </motion.button>
            
            {/* View Count */}
            <div className="flex items-center text-slate-600 dark:text-slate-400">
              <Eye className="w-4 h-4 mr-1" />
              <span className="text-xs">{tool.views}</span>
            </div>
          </div>
          
          {/* Save Button */}
          <motion.button
            onClick={() => toggleSave(tool.id)}
            whileTap={{ scale: 0.9 }}
            className="flex items-center text-slate-600 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400"
            aria-label={isSaved ? "Unsave" : "Save"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
          </motion.button>
        </div>
      </div>
    </Card>
  );
};

export default ToolCard;