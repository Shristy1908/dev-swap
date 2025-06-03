import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import SearchInput from '../components/ui/SearchInput';
import ToolsGrid from '../components/tool/ToolsGrid';
import Button from '../components/ui/Button';
import { useTools } from '../context/ToolsContext';
import { SearchFilters, Category } from '../types';
import { categories } from '../data/mockData';

const ToolsPage: React.FC = () => {
  const { filters, setFilters, filteredTools } = useTools();
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 6;
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  
  // Calculate pagination
  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool);
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage);
  
  // Handle search input
  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value });
  };
  
  // Handle category filter
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Category | undefined;
    setFilters({ ...filters, category: value === "all" ? undefined : value as Category });
  };
  
  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ 
      ...filters, 
      sortBy: event.target.value === "newest" 
        ? "newest" 
        : event.target.value === "likes" 
        ? "likes" 
        : event.target.value === "views" 
        ? "views" 
        : undefined 
    });
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Explore Developer Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Discover the best tools, extensions, and resources for developers
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="w-full md:w-2/3">
              <SearchInput 
                value={filters.search || ''} 
                onChange={handleSearch}
                placeholder="Search for tools, extensions, resources..."
                className="w-full"
              />
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="flex items-center"
                icon={<SlidersHorizontal className="w-4 h-4" />}
              >
                Filters
              </Button>
              <select
                value={filters.sortBy || 'newest'}
                onChange={handleSortChange}
                className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white"
              >
                <option value="newest">Newest</option>
                <option value="likes">Most Liked</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
          
          {showFilters && (
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 mb-6 flex flex-wrap gap-6">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category || 'all'}
                  onChange={handleCategoryChange}
                  className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:text-white w-full"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="self-end">
                <Button
                  onClick={() => {
                    setFilters({});
                    setShowFilters(false);
                  }}
                  variant="outline"
                  size="sm"
                  icon={<Filter className="w-4 h-4" />}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
          
          <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'result' : 'results'}
              {filters.search && ` for "${filters.search}"`}
              {filters.category && ` in ${filters.category}`}
            </p>
            
            <ToolsGrid tools={currentTools} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-md flex items-center justify-center ${
                        page === currentPage
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;