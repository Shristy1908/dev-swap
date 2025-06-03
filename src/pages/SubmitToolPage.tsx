import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { object, string, array } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../components/ui/Button';
import { useTools } from '../context/ToolsContext';
import { categories } from '../data/mockData';
import { Category } from '../types';

// Define form schema
const schema = object({
  name: string().required('Tool name is required').min(3, 'Name must be at least 3 characters'),
  description: string().required('Description is required').min(20, 'Description must be at least 20 characters'),
  category: string().required('Category is required').oneOf(categories as [string, ...string[]], 'Invalid category'),
  imageUrl: string().required('Image URL is required').url('Must be a valid URL'),
  githubUrl: string().required('GitHub URL is required').url('Must be a valid URL'),
  demoUrl: string().url('Must be a valid URL'),
  tags: string().required('At least one tag is required')
});

type FormData = {
  name: string;
  description: string;
  category: Category;
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string;
};

const SubmitToolPage: React.FC = () => {
  const { addTool } = useTools();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      category: undefined,
      imageUrl: '',
      githubUrl: '',
      demoUrl: '',
      tags: ''
    }
  });
  
  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    
    // Process tags
    const tagsArray = data.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    // Add the new tool
    addTool({
      name: data.name,
      description: data.description,
      category: data.category,
      imageUrl: data.imageUrl,
      githubUrl: data.githubUrl,
      demoUrl: data.demoUrl,
      tags: tagsArray,
      author: 'You'
    });
    
    // Show success message
    setIsSuccess(true);
    
    // Reset form
    reset();
    
    // Redirect after delay
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/tools');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Submit a Tool
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Share your favorite developer tools with the community
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Tool Submitted Successfully!
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Thank you for contributing to the developer community.
              </p>
              <p className="text-slate-500 dark:text-slate-500 text-sm">
                Redirecting you to the tools page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Tool Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tool Name *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-slate-800 dark:text-white"
                  placeholder="e.g., React Query"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-slate-800 dark:text-white"
                  placeholder="Describe what this tool does and why it's useful..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description.message}
                  </p>
                )}
              </div>
              
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  {...register('category')}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.category.message}
                  </p>
                )}
              </div>
              
              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Image URL *
                </label>
                <input
                  id="imageUrl"
                  type="text"
                  {...register('imageUrl')}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-slate-800 dark:text-white"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.imageUrl && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.imageUrl.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                  Provide a URL to an image that represents this tool (recommended size: 1200x600px)
                </p>
              </div>
              
              {/* GitHub URL */}
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  GitHub URL *
                </label>
                <input
                  id="githubUrl"
                  type="text"
                  {...register('githubUrl')}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-slate-800 dark:text-white"
                  placeholder="https://github.com/username/repo"
                />
                {errors.githubUrl && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.githubUrl.message}
                  </p>
                )}
              </div>
              
              {/* Demo URL */}
              <div>
                <label htmlFor="demoUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Demo URL (optional)
                </label>
                <input
                  id="demoUrl"
                  type="text"
                  {...register('demoUrl')}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-slate-800 dark:text-white"
                  placeholder="https://demo.example.com"
                />
                {errors.demoUrl && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.demoUrl.message}
                  </p>
                )}
              </div>
              
              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tags *
                </label>
                <input
                  id="tags"
                  type="text"
                  {...register('tags')}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-slate-800 dark:text-white"
                  placeholder="React, State Management, Data Fetching"
                />
                {errors.tags && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.tags.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                  Separate tags with commas
                </p>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Tool'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitToolPage;