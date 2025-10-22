'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Brain, Shield, Target, Users, Award, Heart, ArrowRight, CheckCircle, Zap, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-linear-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Paperless
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re on a mission to make receipt and invoice management effortless for businesses of all sizes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                  We believe that managing receipts and invoices shouldn&apos;t be a headache. Our mission is to transform 
                the way businesses handle financial documents through the power of AI and modern technology.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                By automating the tedious process of data extraction and organization, we free up time for what 
                really matters - growing your business and serving your customers.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">AI-Powered</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">Secure</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-gray-700 font-medium">User-Friendly</span>
                </div>
              </div>
            </div>
            <div className="bg-linear-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <div className="text-center">
                <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">99%+ Accuracy</h3>
                <p className="text-gray-600">
                  Our AI technology achieves industry-leading accuracy in extracting data from receipts and invoices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Security First</h3>
              <p className="text-gray-600">
                We prioritize the security and privacy of your financial data with bank-level encryption and compliance standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of AI technology to deliver cutting-edge solutions that solve real problems.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">User-Centric</h3>
              <p className="text-gray-600">
                Every feature we build is designed with our users in mind, ensuring an intuitive and delightful experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate people behind Paperless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">PA</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pease Adeniji</h3>
              <p className="text-blue-600 font-medium mb-2">Founder</p>
              <p className="text-gray-600">
                Former fintech executive with 10+ years of experience in AI and financial technology.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-linear-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">AI</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ayomide Ifeoluwa</h3>
              <p className="text-blue-600 font-medium mb-2">CTO</p>
              <p className="text-gray-600">
                AI researcher and engineer with expertise in machine learning and computer vision.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-linear-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">AD</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Abiola David</h3>
              <p className="text-blue-600 font-medium mb-2">Head of Product</p>
              <p className="text-gray-600">
                Product strategist focused on creating intuitive user experiences and seamless workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-linear-to-r from-blue-500 to-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-xl text-blue-100">
              Numbers that tell our story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">1M+</div>
              <div className="text-blue-100">Documents Processed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">99%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">AI Processing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-xl text-gray-600 mb-8">
            We envision a world where financial document management is completely automated, 
            allowing businesses to focus on what they do best - creating value for their customers.
          </p>
          <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Future of Finance</h3>
            <p className="text-gray-600">
              As we continue to innovate, we&apos;re building towards a future where AI handles all 
              the tedious aspects of financial management, making it accessible and efficient for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to join our mission?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your journey with Paperless today and experience the future of receipt management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <a href="/register" className="flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-300" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
