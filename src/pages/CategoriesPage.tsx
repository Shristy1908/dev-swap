import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '../data/mockData';
import { useTools } from '../context/ToolsContext';
import ToolsGrid from '../components/tool/ToolsGrid';

const CategoriesPage: React.FC = () => {
  const { getToolsByCategory } = useTools();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Browse by Category
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Explore developer tools organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {category}
                </h2>
                <div className="space-y-4">
                  {getToolsByCategory(category).slice(0, 3).map(tool => (
                    <Link
                      key={tool.id}
                      to={`/tool/${tool.id}`}
                      className="block group"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={tool.imageUrl}
                          alt={tool.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="flex-grow">
                          <h3 className="text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-medium">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {tool.description.length > 50
                              ? tool.description.substring(0, 50) + '...'
                              : tool.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to={`/tools?category=${encodeURIComponent(category)}`}
                    className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    View all {category}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;