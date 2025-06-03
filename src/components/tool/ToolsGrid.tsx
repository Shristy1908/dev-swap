import React from 'react';
import { motion } from 'framer-motion';
import { Tool } from '../../types';
import ToolCard from './ToolCard';

interface ToolsGridProps {
  tools: Tool[];
  title?: string;
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ tools, title }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          {title}
        </h2>
      )}
      
      {tools.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            No tools found matching your criteria.
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={item}>
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ToolsGrid;