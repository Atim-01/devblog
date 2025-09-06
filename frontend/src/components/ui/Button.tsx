'use client';

import React from 'react';
import { cn } from '@/utils';
import { ButtonProps } from '@/types';
import { Loader2 } from 'lucide-react';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-vivid-indigo text-white hover:bg-primary-700 focus:ring-vivid-indigo shadow-sm',
    secondary: 'bg-electric-blue text-white hover:bg-primary-700 focus:ring-electric-blue shadow-sm',
    outline: 'border border-medium-gray text-dark-charcoal bg-white hover:bg-soft-lavender focus:ring-vivid-indigo',
    ghost: 'text-medium-gray hover:text-dark-charcoal hover:bg-soft-lavender focus:ring-medium-gray',
    danger: 'bg-crimson-red text-white hover:bg-error-700 focus:ring-crimson-red shadow-sm',
    success: 'bg-lime-green text-white hover:bg-success-600 focus:ring-lime-green shadow-sm',
    warning: 'bg-sunset-orange text-white hover:bg-warning-600 focus:ring-sunset-orange shadow-sm',
    teal: 'bg-teal text-white hover:bg-accent-600 focus:ring-teal shadow-sm',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
