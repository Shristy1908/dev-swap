import { Tool } from '../types';

// Save liked tools to localStorage
export const saveLikedTools = (likedTools: string[]): void => {
  localStorage.setItem('likedTools', JSON.stringify(likedTools));
};

// Get liked tools from localStorage
export const getLikedTools = (): string[] => {
  const stored = localStorage.getItem('likedTools');
  return stored ? JSON.parse(stored) : [];
};

// Save saved/bookmarked tools to localStorage
export const saveSavedTools = (savedTools: string[]): void => {
  localStorage.setItem('savedTools', JSON.stringify(savedTools));
};

// Get saved tools from localStorage
export const getSavedTools = (): string[] => {
  const stored = localStorage.getItem('savedTools');
  return stored ? JSON.parse(stored) : [];
};

// Save theme preference to localStorage
export const saveThemePreference = (isDarkMode: boolean): void => {
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
};

// Get theme preference from localStorage
export const getThemePreference = (): boolean => {
  const stored = localStorage.getItem('darkMode');
  return stored ? JSON.parse(stored) : false;
};

// Save user submitted tools to localStorage
export const saveUserTools = (tools: Tool[]): void => {
  localStorage.setItem('userTools', JSON.stringify(tools));
};

// Get user submitted tools from localStorage
export const getUserTools = (): Tool[] => {
  const stored = localStorage.getItem('userTools');
  return stored ? JSON.parse(stored) : [];
};