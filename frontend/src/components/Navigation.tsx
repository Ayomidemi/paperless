'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Origami, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <Origami className="h-8 w-8 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">Paperless</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            Pricing
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            Contact
          </Link>
          <Link href="/careers" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            Careers
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
            Sign In
          </Link>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href="/register">Get Started Free</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
          <div className="flex flex-col space-y-4 pt-4">
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Pricing
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Contact
            </Link>
            <Link href="/careers" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Careers
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Sign In
            </Link>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 w-full">
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
