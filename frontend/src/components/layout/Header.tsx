'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Menu, X, Home, Plus, LogOut, User, FileText, BookOpen } from 'lucide-react';
import { cn } from '@/utils';

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect to login even if logout fails
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-soft-lavender sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold text-vivid-indigo hover:text-electric-blue transition-colors duration-200"
            >
              Dev-Blog
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-medium-gray hover:text-vivid-indigo px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/posts"
              className="flex items-center gap-2 text-medium-gray hover:text-vivid-indigo px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              <BookOpen className="h-4 w-4" />
              All Posts
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/my-posts"
                  className="flex items-center gap-2 text-medium-gray hover:text-vivid-indigo px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  <FileText className="h-4 w-4" />
                  My Posts
                </Link>
                <Link
                  href="/create-post"
                  className="flex items-center gap-2 text-medium-gray hover:text-vivid-indigo px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Create Post
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="text-sm text-medium-gray">Loading...</div>
            ) : isAuthenticated && user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-soft-lavender to-lavender-200 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                    <span className="text-vivid-indigo text-sm font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-dark-charcoal font-medium">
                    {user.username}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  loading={isLoggingOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-medium-gray hover:text-vivid-indigo hover:bg-soft-lavender transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-soft-lavender">
            <Link
              href="/"
              className="flex items-center gap-3 text-medium-gray hover:text-vivid-indigo hover:bg-soft-lavender px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link
              href="/posts"
              className="flex items-center gap-3 text-medium-gray hover:text-vivid-indigo hover:bg-soft-lavender px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen className="h-5 w-5" />
              All Posts
            </Link>
            
            {isAuthenticated && (
              <>
                <Link
                  href="/my-posts"
                  className="flex items-center gap-3 text-medium-gray hover:text-vivid-indigo hover:bg-soft-lavender px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FileText className="h-5 w-5" />
                  My Posts
                </Link>
                <Link
                  href="/create-post"
                  className="flex items-center gap-3 text-medium-gray hover:text-vivid-indigo hover:bg-soft-lavender px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus className="h-5 w-5" />
                  Create Post
                </Link>
              </>
            )}

            {isLoading ? (
              <div className="border-t border-soft-lavender pt-3 mt-3">
                <div className="text-center text-sm text-medium-gray px-3 py-2">Loading...</div>
              </div>
            ) : isAuthenticated && user ? (
              <div className="border-t border-soft-lavender pt-3 mt-3">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-soft-lavender to-lavender-200 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                    <span className="text-vivid-indigo text-sm font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-charcoal">{user.username}</p>
                    <p className="text-xs text-medium-gray">Logged in</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isLoggingOut}
                  className="flex items-center gap-3 w-full text-medium-gray hover:text-vivid-indigo hover:bg-soft-lavender px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOut className="h-5 w-5" />
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            ) : (
              <div className="border-t border-soft-lavender pt-3 mt-3 space-y-2">
                <Link
                  href="/login"
                  className="block w-full text-center text-medium-gray hover:text-vivid-indigo hover:bg-soft-lavender px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center bg-vivid-indigo text-white hover:bg-primary-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
