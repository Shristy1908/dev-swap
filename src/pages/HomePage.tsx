import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FeaturedTools from '../components/tool/FeaturedTools';
import ToolsGrid from '../components/tool/ToolsGrid';
import Button from '../components/ui/Button';
import { useTools } from '../context/ToolsContext';
import { Category } from '../types';
import { categories } from '../data/mockData';

const HomePage: React.FC = () => {
  const { getTrendingTools, getToolsByCategory } = useTools();
  
  const trendingTools = getTrendingTools();
  
  // Get sample tools for featured categories (just showing 3 per category)
  const featuredCategories: Category[] = ['React Tools', 'VSCode Extensions', 'APIs'];
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <FeaturedTools />
        </div>
      </section>
      
      {/* Trending Tools Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Trending Tools
            </h2>
            <Link to="/trending">
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center"
              >
                View All
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
          
          <ToolsGrid tools={trendingTools} />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div 
                key={category}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 h-full transition-all hover:shadow-lg flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      {category}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Explore {category.toLowerCase()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Categories Sections */}
      {featuredCategories.map((category) => (
        <section key={category} className="py-16 bg-white dark:bg-slate-800 odd:bg-slate-50 odd:dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {category}
              </h2>
              <Link to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center"
                >
                  View All
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <ToolsGrid tools={getToolsByCategory(category).slice(0, 3)} />
          </div>
        </section>
      ))}
      
      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have a tool to share?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Help the developer community by sharing your favorite tools, extensions, and resources.
          </p>
          <Link to="/submit">
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-indigo-600"
            >
              Submit a Tool
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;