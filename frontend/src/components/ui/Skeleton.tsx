'use client';

import React from 'react';
import { cn } from '@/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variantClasses = {
    text: 'h-4',
    rectangular: 'h-4',
    circular: 'rounded-full',
  };

  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  if (lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses[variant],
              index === lines - 1 ? 'w-3/4' : 'w-full'
            )}
            style={index === lines - 1 ? { ...style, width: '75%' } : style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={style}
    />
  );
};

// Pre-built skeleton components
export const PostCardSkeleton: React.FC = () => (
  <div className="card p-6 space-y-4">
    <div className="flex items-center space-x-3">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="space-y-2 flex-1">
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
    <Skeleton lines={3} />
    <div className="flex justify-between items-center">
      <Skeleton width="30%" height={14} />
      <Skeleton width="20%" height={14} />
    </div>
  </div>
);

export const PostListSkeleton: React.FC = () => (
  <div className="space-y-6">
    {Array.from({ length: 3 }).map((_, index) => (
      <PostCardSkeleton key={index} />
    ))}
  </div>
);

export const PostViewSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto space-y-6">
    <div className="card p-8 space-y-6">
      <div className="space-y-4">
        <Skeleton width="80%" height={32} />
        <div className="flex items-center space-x-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="space-y-2">
            <Skeleton width="120px" height={16} />
            <Skeleton width="80px" height={14} />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton lines={8} />
      </div>
    </div>
  </div>
);

export const FormSkeleton: React.FC = () => (
  <div className="card p-6 space-y-6">
    <div className="space-y-4">
      <Skeleton width="40%" height={20} />
      <Skeleton height={40} />
    </div>
    <div className="space-y-4">
      <Skeleton width="30%" height={20} />
      <Skeleton height={120} />
    </div>
    <div className="flex justify-end space-x-3">
      <Skeleton width={80} height={36} />
      <Skeleton width={100} height={36} />
    </div>
  </div>
);

export default Skeleton;
