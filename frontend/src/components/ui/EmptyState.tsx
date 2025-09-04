'use client';

import React from 'react';
import { cn } from '@/utils';
import { FileText, Plus, Search } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  const defaultIcons = {
    posts: <FileText className="h-12 w-12 text-gray-400" />,
    create: <Plus className="h-12 w-12 text-gray-400" />,
    search: <Search className="h-12 w-12 text-gray-400" />,
  };

  const displayIcon = icon || defaultIcons.posts;

  return (
    <div className={cn('text-center py-12 px-4', className)}>
      <div className="flex justify-center mb-4">
        {displayIcon}
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}
      
      {action && (
        <Button
          variant={action.variant || 'primary'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
