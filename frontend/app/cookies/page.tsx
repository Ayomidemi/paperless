'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Cookie, Settings, Shield, BarChart3, Target, Eye } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Cookie className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: January 15, 2024
          </p>
          <p className="text-lg text-gray-600">
            Learn how we use cookies and similar technologies to enhance your experience.
          </p>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* What Are Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our service.
              </p>
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Settings className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">How Cookies Work</h3>
                </div>
                <ul className="text-gray-600 space-y-2">
                  <li>• Cookies are created when you first visit our website</li>
                  <li>• They store information about your preferences and activity</li>
                  <li>• They are sent back to our servers on subsequent visits</li>
                  <li>• They help us personalize your experience</li>
                </ul>
              </div>
            </div>

            {/* Types of Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
              
              <div className="space-y-8">
                {/* Essential Cookies */}
                <div className="bg-green-50 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Essential Cookies</h3>
                    <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Required
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    These cookies are necessary for the website to function properly. They cannot be disabled.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Authentication</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Keep you logged in</li>
                        <li>• Remember your session</li>
                        <li>• Secure your account</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Security</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Prevent fraud</li>
                        <li>• Protect against attacks</li>
                        <li>• Ensure data integrity</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-blue-50 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Analytics Cookies</h3>
                    <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Optional
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Usage Analytics</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Page views and visits</li>
                        <li>• Time spent on site</li>
                        <li>• Popular features</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Performance</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Load times</li>
                        <li>• Error tracking</li>
                        <li>• User flows</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="bg-purple-50 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Settings className="h-6 w-6 text-purple-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Functional Cookies</h3>
                    <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Optional
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Preferences</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Language settings</li>
                        <li>• Theme preferences</li>
                        <li>• Display options</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Customization</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Dashboard layout</li>
                        <li>• Notification settings</li>
                        <li>• User interface choices</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-orange-50 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-orange-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Marketing Cookies</h3>
                    <span className="ml-4 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      Optional
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    These cookies are used to deliver advertisements more relevant to you and your interests.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Advertising</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Personalized ads</li>
                        <li>• Ad frequency capping</li>
                        <li>• Campaign effectiveness</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Social Media</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Social sharing buttons</li>
                        <li>• Social media integration</li>
                        <li>• Content recommendations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-6">
                We may use third-party services that set their own cookies. These services help us provide 
                better functionality and analytics.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Google Analytics</h3>
                  <p className="text-gray-600 mb-3">
                    We use Google Analytics to understand how visitors use our website. This service may set 
                    cookies to track your activity across our site.
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">https://policies.google.com/privacy</a>
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Payment Processors</h3>
                  <p className="text-gray-600 mb-3">
                    When you make payments, our payment processors may set cookies to ensure secure transactions 
                    and prevent fraud.
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Examples:</strong> Stripe, PayPal, and other payment service providers
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Customer Support</h3>
                  <p className="text-gray-600 mb-3">
                    Our customer support tools may set cookies to provide better assistance and track support tickets.
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Examples:</strong> Intercom, Zendesk, and other support platforms
                  </p>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Managing Your Cookie Preferences</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
                <div className="flex items-center mb-6">
                  <Settings className="h-8 w-8 text-blue-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Cookie Settings</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  You can control which cookies we use through our cookie preference center. You can change 
                  your preferences at any time.
                </p>
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Essential Cookies</h4>
                      <p className="text-sm text-gray-600">Required for basic website functionality</p>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Always Active
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Analytics Cookies</h4>
                      <p className="text-sm text-gray-600">Help us improve our website</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                      <span className="text-sm text-gray-600">Enabled</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Functional Cookies</h4>
                      <p className="text-sm text-gray-600">Remember your preferences</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                      <span className="text-sm text-gray-600">Enabled</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Marketing Cookies</h4>
                      <p className="text-sm text-gray-600">Personalized advertising</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                      </button>
                      <span className="text-sm text-gray-600">Disabled</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Browser Settings</h3>
                  <p className="text-gray-600 mb-4">
                    You can also control cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• View and delete existing cookies</li>
                    <li>• Block cookies from specific websites</li>
                    <li>• Block all cookies (may affect website functionality)</li>
                    <li>• Receive notifications when cookies are set</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Browser-Specific Instructions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Chrome</h4>
                      <p className="text-sm text-gray-600">
                        Settings → Privacy and security → Cookies and other site data
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Firefox</h4>
                      <p className="text-sm text-gray-600">
                        Options → Privacy & Security → Cookies and Site Data
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Safari</h4>
                      <p className="text-sm text-gray-600">
                        Preferences → Privacy → Manage Website Data
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Edge</h4>
                      <p className="text-sm text-gray-600">
                        Settings → Cookies and site permissions → Cookies and site data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact of Disabling Cookies */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Impact of Disabling Cookies</h2>
              <div className="bg-yellow-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">What Happens If You Disable Cookies?</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Essential Cookies</h4>
                    <p className="text-gray-600">
                      Disabling essential cookies will prevent you from logging in and using our service. 
                      These cookies are required for basic functionality.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Optional Cookies</h4>
                    <p className="text-gray-600">
                      Disabling optional cookies may result in:
                    </p>
                    <ul className="text-gray-600 space-y-1 mt-2 ml-4">
                      <li>• Less personalized experience</li>
                      <li>• Need to re-enter preferences each visit</li>
                      <li>• Reduced functionality in some features</li>
                      <li>• Less relevant advertisements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates to Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Updates to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or 
                for other operational, legal, or regulatory reasons.
              </p>
              <p className="text-gray-600">
                We will notify you of any material changes by posting the updated policy on our website 
                and updating the &quot;Last updated&quot; date at the top of this page.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-600 mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600"><strong>Email:</strong> privacy@paperless.com</p>
                  <p className="text-gray-600"><strong>Address:</strong> 123 Business St, San Francisco, CA 94105</p>
                  <p className="text-gray-600"><strong>Phone:</strong> +1 (555) 123-4567</p>
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
