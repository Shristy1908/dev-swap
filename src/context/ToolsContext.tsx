import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tool, SearchFilters, Category } from '../types';
import { tools as mockTools } from '../data/mockData';
import { getLikedTools, saveLikedTools, getSavedTools, saveSavedTools } from '../utils/localStorage';

type ToolsContextType = {
  tools: Tool[];
  featuredTools: Tool[];
  filteredTools: Tool[];
  filters: SearchFilters;
  likedTools: string[];
  savedTools: string[];
  setFilters: (filters: SearchFilters) => void;
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  getToolsByCategory: (category: Category) => Tool[];
  getTrendingTools: () => Tool[];
  addTool: (tool: Omit<Tool, 'id' | 'likes' | 'views' | 'createdAt'>) => void;
};

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export const ToolsProvider = ({ children }: { children: ReactNode }) => {
  const [tools, setTools] = useState<Tool[]>(mockTools);
  const [filteredTools, setFilteredTools] = useState<Tool[]>(mockTools);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [likedTools, setLikedTools] = useState<string[]>([]);
  const [savedTools, setSavedTools] = useState<string[]>([]);

  // Load liked and saved tools from localStorage
  useEffect(() => {
    setLikedTools(getLikedTools());
    setSavedTools(getSavedTools());
  }, []);

  // Apply filters when tools or filters change
  useEffect(() => {
    let result = [...tools];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        tool => 
          tool.name.toLowerCase().includes(searchLower) || 
          tool.description.toLowerCase().includes(searchLower) || 
          tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(tool => tool.category === filters.category);
    }
    
    // Apply sorting
    if (filters.sortBy) {
      result = [...result].sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'likes':
            return b.likes - a.likes;
          case 'views':
            return b.views - a.views;
          default:
            return 0;
        }
      });
    }
    
    setFilteredTools(result);
  }, [tools, filters]);

  // Get featured tools
  const featuredTools = tools.filter(tool => tool.featured);

  // Toggle like on a tool
  const toggleLike = (id: string) => {
    setLikedTools(prev => {
      const newLikedTools = prev.includes(id)
        ? prev.filter(toolId => toolId !== id)
        : [...prev, id];
      
      // Update localStorage
      saveLikedTools(newLikedTools);
      
      return newLikedTools;
    });
    
    // Update tool likes count
    setTools(prev => 
      prev.map(tool => 
        tool.id === id 
          ? { 
              ...tool, 
              likes: likedTools.includes(id) ? tool.likes - 1 : tool.likes + 1 
            } 
          : tool
      )
    );
  };

  // Toggle save on a tool
  const toggleSave = (id: string) => {
    setSavedTools(prev => {
      const newSavedTools = prev.includes(id)
        ? prev.filter(toolId => toolId !== id)
        : [...prev, id];
      
      // Update localStorage
      saveSavedTools(newSavedTools);
      
      return newSavedTools;
    });
  };

  // Get tools by category
  const getToolsByCategory = (category: Category) => {
    return tools.filter(tool => tool.category === category);
  };

  // Get trending tools (sorted by likes)
  const getTrendingTools = () => {
    return [...tools].sort((a, b) => b.likes - a.likes).slice(0, 6);
  };

  // Add a new tool
  const addTool = (tool: Omit<Tool, 'id' | 'likes' | 'views' | 'createdAt'>) => {
    const newTool: Tool = {
      ...tool,
      id: Date.now().toString(),
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTools(prev => [newTool, ...prev]);
  };

  return (
    <ToolsContext.Provider 
      value={{ 
        tools, 
        featuredTools, 
        filteredTools, 
        filters, 
        likedTools, 
        savedTools, 
        setFilters, 
        toggleLike, 
        toggleSave, 
        getToolsByCategory,
        getTrendingTools,
        addTool
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
};

// Custom hook to use the tools context
export const useTools = () => {
  const context = useContext(ToolsContext);
  if (context === undefined) {
    throw new Error('useTools must be used within a ToolsProvider');
  }
  return context;
};