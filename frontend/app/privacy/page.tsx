'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Shield, Lock, Eye, Database, Globe, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-linear-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: October 23, 2025
          </p>
          <p className="text-lg text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
              <p className="text-gray-600 mb-4">
                Paperless (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use 
                our receipt and invoice management service.
              </p>
              <p className="text-gray-600">
                By using our service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Information We Collect</h2>
              
              <div className="bg-blue-50 rounded-2xl p-8 mb-8">
                <div className="flex items-center mb-4">
                  <Database className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                </div>
                <ul className="text-gray-600 space-y-2">
                  <li>• Name and email address</li>
                  <li>• Account credentials and profile information</li>
                  <li>• Payment and billing information</li>
                  <li>• Communication preferences</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-2xl p-8 mb-8">
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Document Information</h3>
                </div>
                <ul className="text-gray-600 space-y-2">
                  <li>• Receipts and invoices you upload</li>
                  <li>• Extracted data (vendor, amount, date, etc.)</li>
                  <li>• Document metadata and timestamps</li>
                  <li>• Categorization and tagging information</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Usage Information</h3>
                </div>
                <ul className="text-gray-600 space-y-2">
                  <li>• Device information and IP address</li>
                  <li>• Browser type and version</li>
                  <li>• Usage patterns and feature interactions</li>
                  <li>• Error logs and performance data</li>
                </ul>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Service Delivery</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Process and extract data from documents</li>
                    <li>• Provide AI-powered categorization</li>
                    <li>• Enable search and organization features</li>
                    <li>• Generate reports and analytics</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Account Management</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Create and maintain your account</li>
                    <li>• Process payments and subscriptions</li>
                    <li>• Provide customer support</li>
                    <li>• Send important service updates</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Improvement & Analytics</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Improve our AI algorithms</li>
                    <li>• Analyze usage patterns</li>
                    <li>• Develop new features</li>
                    <li>• Ensure service reliability</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Legal & Security</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Comply with legal obligations</li>
                    <li>• Prevent fraud and abuse</li>
                    <li>• Protect our rights and property</li>
                    <li>• Ensure data security</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Security</h2>
              <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <Lock className="h-8 w-8 text-blue-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Bank-Level Security</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Encryption</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• AES-256 encryption for data at rest</li>
                      <li>• TLS 1.3 for data in transit</li>
                      <li>• End-to-end encryption for sensitive data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Access Controls</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Multi-factor authentication</li>
                      <li>• Role-based access controls</li>
                      <li>• Regular security audits</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Sharing</h2>
              <p className="text-gray-600 mb-6">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Service Providers</h3>
                    <p className="text-gray-600">
                      With trusted third-party service providers who assist us in operating our service, 
                      such as cloud storage providers and payment processors.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Legal Requirements</h3>
                    <p className="text-gray-600">
                      When required by law or to protect our rights, property, or safety, or that of our users.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Business Transfers</h3>
                    <p className="text-gray-600">
                      In connection with a merger, acquisition, or sale of all or part of our business.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights</h2>
              <div className="bg-green-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <UserCheck className="h-8 w-8 text-green-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Control Your Data</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Access & Portability</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Access your personal data</li>
                      <li>• Download your data in standard formats</li>
                      <li>• Transfer data to other services</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Modification & Deletion</h4>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Update or correct your information</li>
                      <li>• Delete your account and data</li>
                      <li>• Restrict data processing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.
              </p>
              <p className="text-gray-600">
                You can control cookie settings through your browser preferences. Note that disabling cookies may affect some functionality.
              </p>
            </div>

            {/* International Transfers */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">International Data Transfers</h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards 
                are in place to protect your data in accordance with applicable privacy laws.
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Children&apos;s Privacy</h2>
              <p className="text-gray-600">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information 
                from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, 
                please contact us.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy 
                on this page and updating the &quot;Last updated&quot; date.
              </p>
              <p className="text-gray-600">
                Your continued use of our service after any modifications constitutes acceptance of the updated policy.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-600 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600"><strong>Email:</strong> privacy@paperless.com</p>
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
