"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Dashboard } from "@/components/Dashboard";
import { Layout } from "@/components/Layout";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { 
  FileText, 
  Upload, 
  BarChart3, 
  ArrowRight,
  Users,
  Brain,
  Play,
  Check,
  Bot,
  Search,
  PieChart,
  ShieldCheck,
  Database,
  FileSearch,
  Smartphone,
  Award,
} from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showUploadModal, setShowUploadModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return (
    <Layout>
      <Dashboard 
        onUploadReceipt={() => setShowUploadModal(true)}
        onUploadInvoice={() => setShowUploadModal(true)}
        onViewReceipt={(id) => console.log("View receipt:", id)}
        onEditReceipt={(id) => console.log("Edit receipt:", id)}
      />
    </Layout>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-linear-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
                <Brain className="h-4 w-4 mr-2" />
                AI-Powered Receipt Management
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Go Paperless.
              <br />
                <span className="text-blue-600">
                  Manage Receipts & Invoices with AI.
                </span>
            </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Upload, scan, and organize your financial documents in seconds.
                Paperless turns messy receipts into smart, searchable records.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <a
                    href="/register"
                    className="flex items-center justify-center"
                  >
                    Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Trusted by freelancers & small businesses</span>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="animate-fade-in-up-delay">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                  <div className="space-y-6">
                    {/* Upload Flow Mockup */}
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                      <div className="p-3 bg-blue-500 rounded-lg">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="h-4 bg-blue-600 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-blue-300 rounded w-24"></div>
                      </div>
                    </div>

                    {/* Receipt List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <div className="h-4 bg-gray-700 rounded w-24 mb-1"></div>
                            <div className="h-3 bg-gray-400 rounded w-16"></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="h-4 bg-gray-700 rounded w-12 mb-1"></div>
                          <div className="h-3 bg-gray-400 rounded w-8"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="h-4 bg-gray-700 rounded w-20 mb-1"></div>
                            <div className="h-3 bg-gray-400 rounded w-14"></div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="h-4 bg-gray-700 rounded w-10 mb-1"></div>
                          <div className="h-3 bg-gray-400 rounded w-6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Value Proposition / Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to manage receipts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your document management
              workflow
            </p>
          </div>

          {/* Feature Grid with Mixed Layouts */}
          <div className="space-y-16">
            {/* Row 1: Two Large Feature Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Smart Uploads - Large Block */}
              <div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-50 to-blue-100 p-8 hover:shadow-2xl transition-all duration-500 animate-slide-in-left">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Smart Uploads
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Drag & drop receipts or snap with your phone. Works with PDFs,
                    images, and even mobile camera captures.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <span>Try it now</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
          </div>
          
              {/* AI Extraction - Large Block */}
              <div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-green-50 to-green-100 p-8 hover:shadow-2xl transition-all duration-500 animate-slide-in-right">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    AI Extraction
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Our AI auto-detects vendor, amount, tax, and dates with 99%+
                    accuracy using advanced machine learning.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-green-600">99%+</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Row 2: Three Feature Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Searchable & Organized */}
              <div className="text-center group animate-stagger-1">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-wiggle">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Searchable & Organized
                </h3>
                <p className="text-gray-600">
                  Find any receipt instantly with smart filters. Automatically
                  categorize and tag your documents.
                </p>
              </div>

              {/* Financial Insights */}
              <div className="text-center group animate-stagger-2">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce-in">
                  <PieChart className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Financial Insights
                </h3>
                <p className="text-gray-600">
                  Visualize your spending & detect unusual patterns. Get
                  insights into your financial habits with beautiful charts.
                </p>
              </div>

              {/* Export & Integrate */}
              <div className="text-center group animate-stagger-3">
                <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-float">
                  <Database className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Export & Integrate
                </h3>
                <p className="text-gray-600">
                  Export to CSV, PDF, or integrate with your accounting
                  software. Tax-ready reports and seamless workflows.
                </p>
              </div>
            </div>

            {/* Row 3: Security Highlight - Full Width */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-pink-50 to-purple-50 p-12 text-center animate-scale-in">
              <div className="relative z-10">
                <div className="w-24 h-24 bg-linear-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
                  <ShieldCheck className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Bank-Level Security
                </h3>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Your data is encrypted and accessible anywhere. End-to-end encryption
                  with SOC 2 compliance and GDPR ready infrastructure.
                </p>
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">AES-256</div>
                    <div className="text-sm text-gray-600">Encryption</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">SOC 2</div>
                    <div className="text-sm text-gray-600">Certified</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">GDPR</div>
                    <div className="text-sm text-gray-600">Compliant</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-pink-100/20 to-purple-100/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From Upload to Insight
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simplify your receipt management in just a few simple steps
            </p>
          </div>

          {/* Process Flow with Visual Connectors */}
          <div className="relative">
            {/* Background Flow Line */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-linear-to-r from-blue-200 via-green-200 to-orange-200 rounded-full"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1: Upload */}
              <div className="relative text-center group animate-stagger-1">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Upload className="h-10 w-10 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Upload
                  </h3>
                  <p className="text-gray-600">
                    Upload receipt or invoice via phone or browser. Drag & drop or
                    snap a photo.
                  </p>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-300 rounded-full opacity-60 group-hover:animate-float"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-200 rounded-full opacity-40 group-hover:animate-bounce-in"></div>
              </div>

              {/* Step 2: AI Processing */}
              <div className="relative text-center group animate-stagger-2">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Bot className="h-10 w-10 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    AI Processing
                  </h3>
                  <p className="text-gray-600">
                    AI extracts and categorizes the details automatically with 99%+
                    accuracy.
                  </p>
                </div>
                {/* Animated background elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-green-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Step 3: Save & Search */}
              <div className="relative text-center group animate-stagger-3">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Database className="h-10 w-10 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Save & Search
                  </h3>
                  <p className="text-gray-600">
                    Data saved & searchable in your dashboard with smart filters and
                    tags.
                  </p>
                </div>
                {/* Pulsing effect */}
                <div className="absolute inset-0 rounded-full border-2 border-purple-200 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-glow transition-all duration-300"></div>
              </div>

              {/* Step 4: Get Insights */}
              <div className="relative text-center group animate-stagger-4">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <PieChart className="h-10 w-10 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Get Insights
                  </h3>
                  <p className="text-gray-600">
                    Get insights, export reports, or share with your accountant
                    seamlessly.
                  </p>
                </div>
                {/* Success indicator */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 animate-fade-in-up-delay">
            <div className="inline-flex items-center px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Play className="mr-2 h-5 w-5" />
              See it in action
            </div>
          </div>
        </div>
      </section>

      {/* Product Use Cases Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Perfect for every business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From freelancers to enterprise teams, Paperless adapts to your
              needs
            </p>
          </div>

          {/* Mixed Layout: Large Hero + Grid */}
          <div className="space-y-16">
            {/* Hero Use Case - Freelancers */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-50 to-indigo-100 p-12 animate-slide-in-left">
              <div className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mr-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">Freelancers</h3>
                        <p className="text-blue-600 font-semibold">Most Popular</p>
                      </div>
                    </div>
                    <p className="text-xl text-gray-600 mb-8">
                      Keep receipts organized for tax season. Track business expenses effortlessly 
                      with AI-powered categorization and smart search.
                    </p>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">10K+</div>
                        <div className="text-sm text-gray-600">Active Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">$2.3M</div>
                        <div className="text-sm text-gray-600">Expenses Tracked</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <FileText className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Office Supplies</div>
                              <div className="text-sm text-gray-500">Staples • Jan 15</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">$125.50</div>
                            <div className="text-sm text-green-600">Verified</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                              <FileText className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Business Lunch</div>
                              <div className="text-sm text-gray-500">Restaurant • Jan 14</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">$24.75</div>
                            <div className="text-sm text-green-600">Verified</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Use Cases - Compact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Small Business */}
              <div className="group text-center animate-stagger-1">
                <div className="relative">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Small Business
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Automate invoice tracking. Streamline expense management for
                    growing businesses.
                  </p>
                  <div className="text-sm text-green-600 font-semibold">
                    500+ businesses trust us
                  </div>
                </div>
              </div>

              {/* Accountants */}
              <div className="group text-center animate-stagger-2">
                <div className="relative">
                  <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Accountants
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Simplify record-keeping & reporting. Manage multiple clients
                    efficiently.
                  </p>
                  <div className="text-sm text-purple-600 font-semibold">
                    Save 10+ hours/week
                  </div>
                </div>
              </div>

              {/* Enterprise */}
              <div className="group text-center animate-stagger-3">
                <div className="relative">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Enterprise
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Manage employee expenses. Track travel costs and company
                    spending at scale.
                  </p>
                  <div className="text-sm text-orange-600 font-semibold">
                    Enterprise features available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI & Security Highlight Section */}
      <section className="px-6 py-20 bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered. Bank-Level Security.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI meets enterprise-grade security to protect your
              financial data
            </p>
          </div>

          {/* Two-Column Layout with Visual Elements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - AI Features */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">AI-Powered Intelligence</h3>
                      <p className="text-blue-600 font-semibold">99%+ Accuracy</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg mb-6">
                    Our advanced machine learning algorithms automatically extract, categorize, 
                    and analyze your financial documents with unprecedented accuracy.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">99%+</div>
                      <div className="text-sm text-gray-600">Extraction Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">2.3s</div>
                      <div className="text-sm text-gray-600">Average Processing</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-float"></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center group">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <FileSearch className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Semantic Search</h4>
                  <p className="text-sm text-gray-600">Chat with your receipts using natural language</p>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Smart Categorization</h4>
                  <p className="text-sm text-gray-600">Automatically organize by expense type</p>
                </div>
              </div>
            </div>

            {/* Right Column - Security Features */}
            <div className="space-y-8 animate-slide-in-right">
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-linear-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                      <ShieldCheck className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Enterprise Security</h3>
                      <p className="text-green-600 font-semibold">Bank-Level Protection</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg mb-6">
                    Your data is protected with military-grade encryption, SOC 2 compliance, 
                    and GDPR-ready infrastructure that meets the highest security standards.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-semibold text-gray-900">AES-256 Encryption</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-semibold text-gray-900">SOC 2 Type II</span>
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="font-semibold text-gray-900">GDPR Compliant</span>
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-200 rounded-full opacity-30 animate-float" style={{animationDelay: '1s'}}></div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 bg-linear-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold shadow-lg">
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Trusted by 10,000+ users
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Paperless in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of AI-driven receipt management
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Recent Receipts
                    </h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Office Supplies
                          </div>
                          <div className="text-sm text-gray-500">
                            Office Depot • Jan 15, 2024
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">$125.50</div>
                        <div className="text-sm text-green-600">Verified</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Business Lunch
                          </div>
                          <div className="text-sm text-gray-500">
                            Starbucks • Jan 14, 2024
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">$24.75</div>
                        <div className="text-sm text-green-600">Verified</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Spending Analytics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">Office Supplies</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        $450.25
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Travel & Transport
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        $890.50
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Meals & Entertainment
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        $320.00
                      </span>
                    </div>
            </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by thousands
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our users are saying about Paperless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Chinedu</div>
                    <div className="text-sm text-gray-500">
                      Freelance Designer
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;Paperless made tracking expenses ridiculously easy. I
                  used to keep crumpled receipts — now everything&apos;s
                  organized.&quot;
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah</div>
                    <div className="text-sm text-gray-500">
                      Small Business Owner
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;The AI extraction is incredible. It saves me hours every
                  week on expense tracking. Highly recommended!&quot;
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Michael</div>
                    <div className="text-sm text-gray-500">Accountant</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &quot;Finally, a tool that makes receipt management actually
                  enjoyable. The search functionality is a game-changer.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">Free</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  $0<span className="text-lg text-gray-500">/month</span>
                </div>
                <p className="text-gray-600">Perfect for getting started</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">10 receipts per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Basic AI extraction</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Simple search</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-500">Email support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-blue-500 bg-blue-50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
            </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">Pro</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  $9.99<span className="text-lg text-gray-500">/month</span>
                </div>
                <p className="text-gray-600">For growing businesses</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Unlimited receipts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Advanced AI insights</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Smart categorization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Export & integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">
                  Enterprise
                </CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-4">
                  Custom
                </div>
                <p className="text-gray-600">For large organizations</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Team management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Custom integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">SLA guarantee</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
          </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Paperless
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How accurate is the AI extraction?
              </h3>
              <p className="text-gray-600">
                Our AI achieves 99%+ accuracy in extracting vendor names,
                amounts, dates, and line items from receipts and invoices. We
                use advanced machine learning models trained on millions of
                documents.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use bank-level encryption (AES-256) for all data
                storage and transmission. Your documents are processed securely
                and never shared with third parties. We&apos;re GDPR compliant and
                SOC 2 certified.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What file formats do you support?
              </h3>
              <p className="text-gray-600">
                We support all major formats including PDF, JPG, PNG, and even
                mobile camera captures. Simply drag and drop or snap a photo -
                our AI handles the rest.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Can I integrate with my accounting software?
              </h3>
              <p className="text-gray-600">
                Yes! We integrate with QuickBooks, Xero, and other popular
                accounting platforms. You can also export to CSV or PDF for easy
                import into any system.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! Start with our free plan that includes 10 receipts per
                month. No credit card required. Upgrade anytime to unlock
                unlimited uploads and advanced features.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="/register" className="flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
