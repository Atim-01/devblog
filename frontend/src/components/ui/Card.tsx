'use client';

import React from 'react';
import { cn } from '@/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false, 
  interactive = false,
  onClick 
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-soft border border-soft-lavender transition-all duration-200';
  const hoverClasses = hover ? 'hover:shadow-medium hover:-translate-y-0.5' : '';
  const interactiveClasses = interactive ? 'cursor-pointer hover:shadow-medium hover:-translate-y-0.5 active:translate-y-0 active:shadow-soft' : '';
  
  return (
    <div 
      className={cn(baseClasses, hoverClasses, interactiveClasses, className)}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={cn('px-6 py-4 border-b border-soft-lavender', className)}>
      {children}
    </div>
  );
};

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={cn('px-6 py-4 border-t border-soft-lavender bg-warm-gray rounded-b-lg', className)}>
      {children}
    </div>
  );
};

// Export the main Card component and its sub-components
export { Card, CardHeader, CardBody, CardFooter };
export default Card;
