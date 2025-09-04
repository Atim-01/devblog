'use client';

import React, { useState } from 'react';
import { cn } from '@/utils';
import { InputProps } from '@/types';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

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
  disabled = false,
  ...props
}) => {
  const inputId = `input-${name}`;
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';
  const stateClasses = error 
    ? 'border-error-300 focus:ring-error-500 focus:border-error-500 bg-error-50' 
    : isFocused
    ? 'border-primary-500 focus:ring-primary-500 focus:border-primary-500 bg-white'
    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500 bg-white hover:border-gray-400';
  
  const disabledClasses = disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : '';
  
  const inputClasses = cn(baseClasses, stateClasses, disabledClasses, className);
  
  if (type === 'textarea') {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            disabled={disabled}
            rows={4}
            className={cn(inputClasses, 'resize-none')}
            {...props}
          />
        </div>
        {error && (
          <div className="flex items-center space-x-1">
            <AlertCircle className="h-4 w-4 text-error-500" />
            <p className="text-sm text-error-600">{error}</p>
          </div>
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
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center space-x-1">
          <AlertCircle className="h-4 w-4 text-error-500" />
          <p className="text-sm text-error-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
