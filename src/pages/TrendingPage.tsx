import React from 'react';
import { useTools } from '../context/ToolsContext';
import ToolsGrid from '../components/tool/ToolsGrid';

const TrendingPage: React.FC = () => {
  const { tools } = useTools();
  
  // Get trending tools (sorted by likes and views)
  const trendingTools = [...tools].sort((a, b) => {
    const scoreA = a.likes * 2 + a.views;
    const scoreB = b.likes * 2 + b.views;
    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Trending Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Discover the most popular developer tools right now
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
          <ToolsGrid tools={trendingTools} />
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;