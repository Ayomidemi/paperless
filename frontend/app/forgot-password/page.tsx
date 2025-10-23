"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Origami,
  Mail,
  ArrowLeft,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { AxiosError } from "axios";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setEmailSent(true);
      toast.success("Password reset email sent!");
    } catch (error: unknown) {
      toast.error(
        (error as AxiosError<{ error: string }>)?.response?.data?.error ||
          "Failed to send reset email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <Navigation />

        {/* Success Section */}
        <section className="px-6 py-20">
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Check your email
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We&apos;ve sent a password reset link to your email address.
              Please check your inbox and follow the instructions to reset your
              password.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What&apos;s next?
              </h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-600">
                    Check your email inbox (and spam folder)
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-600">
                    Click the reset link in the email
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-600">
                    Create a new password for your account
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Login
              </Link>
              <button
                onClick={() => setEmailSent(false)}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
              >
                Try different email
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navigation />

      {/* Forgot Password Form Section */}
      <section className="px-6 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-scale-in">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Origami className="h-7 w-7 text-white" />
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Reset Password
              </h2>
              <p className="text-gray-600">
                Enter your email to receive reset instructions
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8 animate-fade-in-up-delay">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Need help?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-bold">?</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    Check your spam folder
                  </p>
                  <p className="text-sm text-gray-600">
                    Sometimes reset emails end up in spam
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm font-bold">!</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    Link expires in 1 hour
                  </p>
                  <p className="text-sm text-gray-600">
                    For security, reset links are time-limited
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-purple-600 text-sm font-bold">@</span>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    Contact support
                  </p>
                  <p className="text-sm text-gray-600">
                    Still having trouble?{" "}
                    <Link
                      href="/contact"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Get in touch
                    </Link>
                  </p>
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
