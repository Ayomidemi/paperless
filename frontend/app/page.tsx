"use client";

import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/LoginForm";
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
  Origami,
  FileSearch,
  Award,
  MessageCircle,
  Mail,
  Heart,
  Smartphone,
} from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
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
      <section className="px-6 py-20 bg-gradient-to-br from-blue-50 to-blue-100">
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
                  className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                <a href="/register">
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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to manage receipts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your document management
              workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Smart Uploads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Drag & drop receipts or snap with your phone. Works with PDFs,
                  images, and even mobile camera captures.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  AI Extraction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI auto-detects vendor, amount, tax, and dates with 99%+
                  accuracy using advanced machine learning.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Searchable & Organized
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find any receipt instantly with smart filters. Automatically
                  categorize and tag your documents.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PieChart className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Financial Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visualize your spending & detect unusual patterns. Get
                  insights into your financial habits with beautiful charts.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-pink-50 to-pink-100">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Secure Cloud Storage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your data is encrypted and accessible anywhere. Bank-level
                  security with end-to-end encryption.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-cyan-50 to-cyan-100">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Export & Integrate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Export to CSV, PDF, or integrate with your accounting
                  software. Tax-ready reports and seamless workflows.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From Upload to Insight
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simplify your receipt management in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                1. Upload
              </h3>
              <p className="text-gray-600">
                Upload receipt or invoice via phone or browser. Drag & drop or
                snap a photo.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                2. AI Processing
              </h3>
              <p className="text-gray-600">
                AI extracts and categorizes the details automatically with 99%+
                accuracy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                3. Save & Search
              </h3>
              <p className="text-gray-600">
                Data saved & searchable in your dashboard with smart filters and
                tags.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                4. Get Insights
              </h3>
              <p className="text-gray-600">
                Get insights, export reports, or share with your accountant
                seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Use Cases Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Perfect for every business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From freelancers to enterprise teams, Paperless adapts to your
              needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Freelancers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Keep receipts organized for tax season. Track business
                  expenses effortlessly.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Small Business
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automate invoice tracking. Streamline expense management for
                  growing businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Accountants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Simplify record-keeping & reporting. Manage multiple clients
                  efficiently.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Enterprise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Manage employee expenses. Track travel costs and company
                  spending at scale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI & Security Highlight Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered. Bank-Level Security.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI meets enterprise-grade security to protect your
              financial data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Automatic Extraction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  High accuracy text extraction with advanced machine learning
                  algorithms.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileSearch className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Semantic Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Chat with your receipts using LLMs. Find anything with natural
                  language.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  End-to-End Encryption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your files are encrypted and secure. Bank-level protection for
                  all data.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  GDPR Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Compliance-ready for enterprise use. GDPR and SOC 2 compliant
                  infrastructure.
                </p>
              </CardContent>
            </Card>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">How accurate is the AI extraction?</h3>
              <p className="text-gray-600">
                Our AI achieves 99%+ accuracy in extracting vendor names, amounts, dates, and line items from receipts and invoices. We use advanced machine learning models trained on millions of documents.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Is my data secure?</h3>
              <p className="text-gray-600">
                Absolutely. We use bank-level encryption (AES-256) for all data storage and transmission. Your documents are processed securely and never shared with third parties. We're GDPR compliant and SOC 2 certified.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What file formats do you support?</h3>
              <p className="text-gray-600">
                We support all major formats including PDF, JPG, PNG, and even mobile camera captures. Simply drag and drop or snap a photo - our AI handles the rest.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Can I integrate with my accounting software?</h3>
              <p className="text-gray-600">
                Yes! We integrate with QuickBooks, Xero, and other popular accounting platforms. You can also export to CSV or PDF for easy import into any system.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Is there a free trial?</h3>
              <p className="text-gray-600">
                Yes! Start with our free plan that includes 10 receipts per month. No credit card required. Upgrade anytime to unlock unlimited uploads and advanced features.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <a href="/register">
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
