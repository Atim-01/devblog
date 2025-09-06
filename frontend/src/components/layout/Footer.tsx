'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated, user } = useAuth();
  
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Dev-Blog
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              A platform for developers to share their knowledge and experiences through blog posts. 
              Connect, learn, and grow with the developer community.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-600 hover:text-primary-600 transition-colors">
                  All Posts
                </Link>
              </li>
              {isAuthenticated && user && (
                <>
                  
                  <li>
                    <Link href="/create-post" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Create Post
                    </Link>
                  </li>
                </>
              )
            }
            </ul>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
             
            </h3>
            <ul className="space-y-3">
              {isAuthenticated && user ? (
                <>
                  
                 
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="text-gray-600 hover:text-primary-600 transition-colors">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Dev-Blog. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/privacy" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-primary-600 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
