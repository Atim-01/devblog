'use client';

import React from 'react';
import { cn } from '@/utils';
import { InputProps } from '@/types';

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  ...props
}) => {
  const inputId = `input-${name}`;
  
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const stateClasses = error 
    ? 'border-error-300 focus:ring-error-500 focus:border-error-500' 
    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500';
  
  const inputClasses = cn(baseClasses, stateClasses, className);
  
  if (type === 'textarea') {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
