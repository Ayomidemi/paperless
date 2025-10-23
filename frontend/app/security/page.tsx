'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Shield, Lock, Eye, Database, AlertTriangle, CheckCircle, Users, Server } from 'lucide-react';

export default function SecurityPolicyPage() {
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
            Security Policy
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Last updated: October 23, 2025
          </p>
          <p className="text-lg text-gray-600">
            Your data security is our top priority. Learn about our comprehensive security measures.
          </p>
        </div>
      </section>

      {/* Security Content */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* Security Commitment */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Security Commitment</h2>
              <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">Bank-Level Security</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We implement industry-leading security measures to protect your financial documents and personal information. 
                  Our security framework is designed to meet the highest standards of data protection and privacy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Encryption</h4>
                    <p className="text-sm text-gray-600">AES-256 encryption for all data</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Compliance</h4>
                    <p className="text-sm text-gray-600">SOC 2 & GDPR certified</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Monitoring</h4>
                    <p className="text-sm text-gray-600">24/7 security monitoring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Encryption */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Encryption</h2>
              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Lock className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Encryption at Rest</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    All your documents and data are encrypted using AES-256 encryption before being stored on our servers. 
                    This is the same level of encryption used by banks and government agencies.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• AES-256 encryption for all stored data</li>
                    <li>• Unique encryption keys for each customer</li>
                    <li>• Regular key rotation and management</li>
                    <li>• Hardware security modules (HSMs) for key storage</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Database className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Encryption in Transit</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    All data transmission between your device and our servers is protected using TLS 1.3 encryption, 
                    ensuring your information remains secure during upload and download.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• TLS 1.3 for all data transmission</li>
                    <li>• Perfect Forward Secrecy (PFS)</li>
                    <li>• Certificate pinning for mobile apps</li>
                    <li>• HSTS headers for web security</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Access Controls */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Access Controls</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Authentication</h3>
                  </div>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Multi-factor authentication (MFA) required</li>
                    <li>• Strong password requirements</li>
                    <li>• Session management and timeout</li>
                    <li>• Account lockout after failed attempts</li>
                    <li>• Biometric authentication support</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Server className="h-6 w-6 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Authorization</h3>
                  </div>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Role-based access controls (RBAC)</li>
                    <li>• Principle of least privilege</li>
                    <li>• Regular access reviews</li>
                    <li>• API key management</li>
                    <li>• Zero-trust network architecture</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Infrastructure Security */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Infrastructure Security</h2>
              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Cloud Infrastructure</h3>
                  <p className="text-gray-600 mb-4">
                    We use industry-leading cloud providers with robust security certifications and compliance frameworks.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Physical Security</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• 24/7 physical security monitoring</li>
                        <li>• Biometric access controls</li>
                        <li>• Environmental controls and monitoring</li>
                        <li>• Redundant power and cooling systems</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Network Security</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Firewalls and intrusion detection</li>
                        <li>• DDoS protection and mitigation</li>
                        <li>• Network segmentation</li>
                        <li>• Regular security assessments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Data Centers</h3>
                  <p className="text-gray-600 mb-4">
                    Our data is stored in geographically distributed, SOC 2 Type II certified data centers with 
                    multiple layers of redundancy and disaster recovery.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">SOC 2 Type II</h4>
                      <p className="text-sm text-gray-600">Certified data centers</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">ISO 27001</h4>
                      <p className="text-sm text-gray-600">Information security management</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">GDPR</h4>
                      <p className="text-sm text-gray-600">Data protection compliance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring and Incident Response */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Monitoring & Incident Response</h2>
              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Eye className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">24/7 Monitoring</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We continuously monitor our systems for security threats and anomalies using advanced 
                    security information and event management (SIEM) tools.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Real-time threat detection and response</li>
                    <li>• Automated security alerts and notifications</li>
                    <li>• Behavioral analytics and anomaly detection</li>
                    <li>• Regular security log analysis</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Incident Response</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We have a comprehensive incident response plan to quickly address and mitigate any security issues.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Response Process</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Immediate threat containment</li>
                        <li>• Impact assessment and analysis</li>
                        <li>• Customer notification procedures</li>
                        <li>• Recovery and restoration steps</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Communication</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Transparent incident reporting</li>
                        <li>• Regular status updates</li>
                        <li>• Post-incident reviews</li>
                        <li>• Security improvements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Privacy & Compliance</h2>
              <div className="bg-linear-to-r from-green-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Compliance Standards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">GDPR</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      European General Data Protection Regulation compliance for EU users.
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Right to access and portability</li>
                      <li>• Right to erasure</li>
                      <li>• Data processing transparency</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">SOC 2 Type II</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Security, availability, and confidentiality controls audit.
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Security controls assessment</li>
                      <li>• Availability monitoring</li>
                      <li>• Confidentiality protection</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">ISO 27001</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      International standard for information security management.
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Risk management framework</li>
                      <li>• Security policy implementation</li>
                      <li>• Continuous improvement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Best Practices */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Security Best Practices</h2>
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">For Our Users</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Account Security</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Use strong, unique passwords</li>
                        <li>• Enable multi-factor authentication</li>
                        <li>• Regularly review account activity</li>
                        <li>• Log out from shared devices</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Data Protection</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Only upload documents you own</li>
                        <li>• Regularly review and delete old data</li>
                        <li>• Be cautious with sharing permissions</li>
                        <li>• Report suspicious activity immediately</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">For Our Team</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Employee Training</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Regular security awareness training</li>
                        <li>• Phishing simulation exercises</li>
                        <li>• Incident response training</li>
                        <li>• Privacy and compliance education</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Access Management</h4>
                      <ul className="text-gray-600 space-y-2 text-sm">
                        <li>• Principle of least privilege</li>
                        <li>• Regular access reviews</li>
                        <li>• Background checks for all employees</li>
                        <li>• Confidentiality agreements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vulnerability Reporting */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Vulnerability Reporting</h2>
              <div className="bg-yellow-50 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Responsible Disclosure</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  We take security vulnerabilities seriously. If you discover a security issue, please report it 
                  to us responsibly through our security contact.
                </p>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">How to Report</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Email: privacy@paperless.com</li>
                    <li>• Include detailed steps to reproduce the issue</li>
                    <li>• Provide your contact information</li>
                    <li>• Allow reasonable time for us to address the issue</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Security Contact</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-600 mb-4">
                  For security-related questions, concerns, or to report vulnerabilities, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600"><strong>General Contact:</strong> privacy@paperless.com</p>
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
