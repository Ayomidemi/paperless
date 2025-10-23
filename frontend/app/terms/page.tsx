'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FileText, Scale, AlertTriangle, Shield, CreditCard } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-linear-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: October 23, 2025
          </p>
          <p className="text-lg text-gray-600">
            Please read these terms carefully before using our service.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* Agreement */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Agreement to Terms</h2>
              <p className="text-gray-600 mb-4">
                These Terms of Service (&quot;Terms&quot;) govern your use of the Paperless service (&quot;Service&quot;) 
                operated by Paperless Inc. (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
              </p>
              <p className="text-gray-600 mb-4">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part 
                of these terms, you may not access the Service.
              </p>
            </div>

            {/* Service Description */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Description</h2>
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">What We Provide</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Paperless is an AI-powered receipt and invoice management service that helps you:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Upload and organize receipts and invoices</li>
                  <li>• Extract data using artificial intelligence</li>
                  <li>• Categorize and search your documents</li>
                  <li>• Generate reports and analytics</li>
                  <li>• Export data to accounting software</li>
                </ul>
              </div>
            </div>

            {/* User Accounts */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">User Accounts</h2>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Account Creation</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• You must provide accurate and complete information</li>
                    <li>• You are responsible for maintaining account security</li>
                    <li>• You must be at least 18 years old to create an account</li>
                    <li>• One account per person or business entity</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Account Security</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Keep your login credentials confidential</li>
                    <li>• Notify us immediately of any unauthorized access</li>
                    <li>• You are responsible for all activities under your account</li>
                    <li>• We may suspend accounts that violate these terms</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Acceptable Use */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Acceptable Use</h2>
              <div className="bg-green-50 rounded-2xl p-8 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">You May:</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Use the Service for legitimate business purposes</li>
                  <li>• Upload your own receipts and invoices</li>
                  <li>• Export your data in standard formats</li>
                  <li>• Contact support for assistance</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">You May Not:</h3>
                </div>
                <ul className="text-gray-600 space-y-2">
                  <li>• Upload illegal, harmful, or malicious content</li>
                  <li>• Attempt to reverse engineer our AI systems</li>
                  <li>• Share your account with others</li>
                  <li>• Use the Service for any unlawful purpose</li>
                  <li>• Interfere with the Service&apos;s operation</li>
                  <li>• Upload documents you don&apos;t own or have permission to process</li>
                </ul>
              </div>
            </div>

            {/* Data and Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data and Privacy</h2>
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Your Data Rights</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Data Ownership</h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• You retain ownership of your documents</li>
                      <li>• We process data only to provide our service</li>
                      <li>• You can export your data at any time</li>
                      <li>• You can delete your account and data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">Data Processing</h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• We use AI to extract and categorize data</li>
                      <li>• Data is encrypted and securely stored</li>
                      <li>• We don&apos;t sell your personal information</li>
                      <li>• See our Privacy Policy for details</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Terms</h2>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">Billing</h3>
                  </div>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Free plan includes 10 receipts per month</li>
                    <li>• Paid plans are billed monthly or annually</li>
                    <li>• All fees are non-refundable except as required by law</li>
                    <li>• Prices may change with 30 days notice</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Cancellation</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• You may cancel your subscription at any time</li>
                    <li>• Cancellation takes effect at the end of your billing period</li>
                    <li>• You retain access to your data after cancellation</li>
                    <li>• No refunds for partial billing periods</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Our Rights</h3>
                  <p className="text-gray-600 mb-3">
                    The Service and its original content, features, and functionality are owned by Paperless Inc. 
                    and are protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Your Rights</h3>
                  <p className="text-gray-600">
                    You retain all rights to your documents and data. By using our Service, you grant us a limited 
                    license to process your data solely for the purpose of providing our Service.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Availability */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Availability</h2>
              <div className="bg-yellow-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">No Guarantees</h3>
                </div>
                <ul className="text-gray-600 space-y-2">
                  <li>• We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
                  <li>• We may perform maintenance that temporarily affects availability</li>
                  <li>• We are not liable for service interruptions beyond our control</li>
                  <li>• We may modify or discontinue features with notice</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-600 mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, PAPERLESS INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF 
                  PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p className="text-gray-600">
                  Our total liability to you for any damages arising from or related to these Terms or the Service 
                  shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </div>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Indemnification</h2>
              <p className="text-gray-600 mb-4">
                You agree to defend, indemnify, and hold harmless Paperless Inc. and its officers, directors, 
                employees, and agents from and against any claims, damages, obligations, losses, liabilities, 
                costs, or debt, and expenses (including attorney&apos;s fees) arising from:
              </p>
              <ul className="text-gray-600 space-y-2 ml-6">
                <li>• Your use of the Service</li>
                <li>• Your violation of these Terms</li>
                <li>• Your violation of any third-party rights</li>
                <li>• Any content you submit to the Service</li>
              </ul>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Termination</h2>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">By You</h3>
                  <p className="text-gray-600">
                    You may terminate your account at any time by contacting us or using the account deletion 
                    feature in your settings.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">By Us</h3>
                  <p className="text-gray-600">
                    We may terminate or suspend your account immediately, without prior notice, for conduct that 
                    we believe violates these Terms or is harmful to other users, us, or third parties.
                  </p>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These Terms shall be interpreted and governed by the laws of the State of California, United States, 
                without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-600">
                Any disputes arising from these Terms or the Service shall be resolved in the state or federal 
                courts located in San Francisco, California.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of any material 
                changes by email or through the Service.
              </p>
              <p className="text-gray-600">
                Your continued use of the Service after any modifications constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
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
