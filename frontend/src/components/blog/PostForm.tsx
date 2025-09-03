'use client';

import { useState, useEffect } from 'react';
import { CreatePostData, UpdatePostData, Post } from '@/lib/api';

interface PostFormProps {
  mode: 'create' | 'edit';
  initialData?: Post;
  onSubmit: (data: CreatePostData | UpdatePostData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitError?: string;
}

export default function PostForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitError = ''
}: PostFormProps) {
  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with existing data when editing
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
      });
    }
  }, [mode, initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const hasChanges = () => {
    if (mode === 'create') return true;
    if (!initialData) return false;
    return formData.title !== initialData.title || formData.content !== initialData.content;
  };

  const resetForm = () => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
      });
    } else {
      setFormData({ title: '', content: '' });
    }
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Display */}
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Post Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleInputChange}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter your post title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {formData.title.length}/100 characters
        </p>
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Post Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={15}
          required
          value={formData.content}
          onChange={handleInputChange}
          className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm resize-vertical ${
            errors.content ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Write your post content here. You can use markdown formatting for better structure."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {formData.content.length} characters (minimum 50)
        </p>
      </div>

      {/* Writing Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              {mode === 'create' ? 'Writing Tips' : 'Editing Tips'}
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                {mode === 'create' ? (
                  <>
                    <li>Start with a clear introduction</li>
                    <li>Use headings and subheadings for structure</li>
                    <li>Include code examples when relevant</li>
                    <li>End with a conclusion or call to action</li>
                  </>
                ) : (
                  <>
                    <li>Review your changes before saving</li>
                    <li>Keep your content clear and engaging</li>
                    <li>Update any outdated information</li>
                    <li>Consider adding new examples or insights</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          
          {mode === 'edit' && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading || (mode === 'edit' && !hasChanges())}
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'create' ? 'Creating...' : 'Updating...'}
            </div>
          ) : (
            mode === 'create' ? 'Create Post' : 'Update Post'
          )}
        </button>
      </div>
    </form>
  );
}
