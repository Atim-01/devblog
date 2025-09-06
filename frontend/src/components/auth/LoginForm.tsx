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

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function LoginForm({ onSuccess, redirectTo = '/' }: LoginFormProps) {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    
    try {
      await login(data.username, data.password);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect
      router.push(redirectTo);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(
        err.message || 
        'An error occurred during login. Please try again.'
      );
    }
  };
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
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
            placeholder="Enter your username"
            error={errors.username?.message}
            required
            {...register('username')}
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            required
            {...register('password')}
          />
        </CardBody>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
