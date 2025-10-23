"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Origami,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  User,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { AxiosError } from "axios";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

export default function RegisterPage() {
  const { user, loading, register: registerUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  useEffect(() => {
    if (user && !loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      toast.success("Account created successfully!");
    } catch (error: unknown) {
      toast.error(
        (error as AxiosError<{ error: string }>)?.response?.data?.error ||
          "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <Navigation />

      {/* Register Form Section */}
      <section className="px-6 py-20">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-scale-in">
            <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Origami className="h-7 w-7 text-white" />
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("firstName")}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="John"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("lastName")}
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Doe"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

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
                    placeholder="john@example.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Create a password"
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
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Confirm your password"
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
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-700">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3 text-lg font-semibold"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-center py-3 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  disabled
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center py-3 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  disabled
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Microsoft
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center animate-stagger-1">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Free to Start
              </h3>
              <p className="text-sm text-gray-600">10 receipts per month</p>
            </div>
            <div className="text-center animate-stagger-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Instant Setup
              </h3>
              <p className="text-sm text-gray-600">Start in under 2 minutes</p>
            </div>
            <div className="text-center animate-stagger-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                No Credit Card
              </h3>
              <p className="text-sm text-gray-600">Required to get started</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
