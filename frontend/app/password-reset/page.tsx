'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Origami, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { AxiosError } from 'axios';

interface PasswordResetFormData {
  password: string;
  confirmPassword: string;
}

export default function PasswordResetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PasswordResetFormData>();

  const password = watch('password');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setIsValidToken(true);
    } else {
      router.push('/forgot-password');
    }
  }, [searchParams, router]);

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPasswordReset(true);
      toast.success("Password reset successfully!");
    } catch (error: unknown) {
      toast.error((error as AxiosError<{ error: string }>)?.response?.data?.error || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-orange-50">
          <div className="max-w-md mx-auto text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <AlertCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Invalid Link</h1>
            <p className="text-xl text-gray-600 mb-8">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex items-center px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Request New Link
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (passwordReset) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <Navigation />

        {/* Success Section */}
        <section className="px-6 py-20 bg-linear-to-br from-green-50 to-blue-50">
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-linear-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Password Reset Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-600">Your password has been securely updated</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-600">You&apos;ll need to sign in again on all devices</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-600">Start managing your receipts with your new password</p>
                </div>
              </div>
            </div>

            <Link
              href="/login"
              className="inline-flex items-center px-8 py-4 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              Sign In Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navigation />


      {/* Password Reset Form Section */}
      <section className="px-6 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-scale-in">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Origami className="h-7 w-7 text-white" />
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
              <p className="text-gray-600">Create a strong, secure password</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: 'Password must contain uppercase, lowercase, and number'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your new password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password || 'Passwords do not match'
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Confirm your new password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Password Requirements:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      password && password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {password && password.length >= 8 && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={password && password.length >= 8 ? 'text-green-600' : 'text-gray-600'}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      password && /[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {password && /[A-Z]/.test(password) && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={password && /[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-600'}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      password && /[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {password && /[a-z]/.test(password) && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={password && /[a-z]/.test(password) ? 'text-green-600' : 'text-gray-600'}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      password && /\d/.test(password) ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {password && /\d/.test(password) && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={password && /\d/.test(password) ? 'text-green-600' : 'text-gray-600'}>
                      One number
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Remember your password?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Security Tips */}
          <div className="mt-12 bg-blue-50 rounded-2xl p-8 animate-fade-in-up-delay">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Security Tips
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">Use a unique password</p>
                  <p className="text-sm text-gray-600">Don&apos;t reuse passwords from other accounts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">Enable 2FA when available</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">Keep your password private</p>
                  <p className="text-sm text-gray-600">Never share your password with anyone</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
