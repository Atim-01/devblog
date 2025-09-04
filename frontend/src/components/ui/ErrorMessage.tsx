'use client';

import React from 'react';
import { cn } from '@/utils';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  variant?: 'error' | 'warning' | 'info';
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  variant = 'error',
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const variantClasses = {
    error: 'bg-error-50 border-error-200 text-error-800',
    warning: 'bg-warning-50 border-warning-200 text-warning-800',
    info: 'bg-primary-50 border-primary-200 text-primary-800',
  };

  const iconClasses = {
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-primary-500',
  };

  return (
    <div
      className={cn(
        'flex items-start space-x-3 p-4 border rounded-lg',
        variantClasses[variant],
        className
      )}
      role="alert"
    >
      <AlertCircle className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconClasses[variant])} />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className={cn(
            'flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors',
            iconClasses[variant]
          )}
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
