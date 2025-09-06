'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function RegisterForm({ onSuccess, redirectTo = '/' }: RegisterFormProps) {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  
  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    
    try {
      await registerUser(data.username, data.password);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect
      router.push(redirectTo);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(
        err.message || 
        'An error occurred during registration. Please try again.'
      );
    }
  };
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Join the developer community and start sharing your knowledge
          </p>
        </div>
      </CardHeader>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="space-y-4">
          {error && (
            <div className="bg-error-50 border border-error-200 rounded-md p-3">
              <p className="text-sm text-error-600">{error}</p>
            </div>
          )}
          
          <Input
            label="Username"
            name="username"
            placeholder="Choose a username"
            error={errors.username?.message}
            required
            {...register('username')}
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            required
            {...register('password')}
          />
          
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            required
            {...register('confirmPassword')}
          />
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>Password requirements:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>At least 6 characters long</li>
              <li>Contains at least one lowercase letter</li>
              <li>Contains at least one uppercase letter</li>
              <li>Contains at least one number</li>
            </ul>
          </div>
        </CardBody>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
