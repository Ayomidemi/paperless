"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import {
  Users,
  Heart,
  Brain,
  Zap,
  Target,
  Globe,
  CheckCircle,
  Mail,
} from "lucide-react";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="px-6 py-20 bg-linear-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join a small but ambitious team shaping the future of how
            individuals and businesses handle their financial documents.
          </p>
        </div>
      </section>

      {/* Not Hiring Notice */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-linear-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              We&apos;re Not Hiring Right Now
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              While we&apos;re not actively recruiting at the moment, we&apos;re
              always excited to meet passionate individuals who are interested
              in the future of AI-powered financial technology.
            </p>
            <p className="text-gray-600">
              Feel free to reach out to us - we&apos;d love to learn about you
              and keep you in mind for future opportunities!
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600">
              When we do hire, here&apos;s what makes Paperless a great place to
              work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Mission-Driven
              </h3>
              <p className="text-gray-600">
                Work on technology that genuinely helps businesses save time and
                reduce stress in their daily operations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Cutting-Edge AI
              </h3>
              <p className="text-gray-600">
                Work with the latest AI and machine learning technologies to
                solve real-world problems.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Fast-Paced Growth
              </h3>
              <p className="text-gray-600">
                Join a rapidly growing startup where your contributions have
                immediate impact and visibility.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Clear Vision
              </h3>
              <p className="text-gray-600">
                Work with a team that has a clear vision and roadmap for the
                future of financial technology.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Remote-First
              </h3>
              <p className="text-gray-600">
                Work from anywhere in the world with flexible hours and a
                supportive remote culture.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Great Team
              </h3>
              <p className="text-gray-600">
                Work alongside talented, passionate people who are committed to
                building something amazing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide how we work together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Transparency
                  </h3>
                  <p className="text-gray-600">
                    We believe in open communication and sharing information
                    openly across the team.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Innovation
                  </h3>
                  <p className="text-gray-600">
                    We encourage creative thinking and are always looking for
                    better ways to solve problems.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Collaboration
                  </h3>
                  <p className="text-gray-600">
                    We work together as a team, supporting each other and
                    celebrating shared successes.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Quality
                  </h3>
                  <p className="text-gray-600">
                    We take pride in our work and are committed to delivering
                    high-quality solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Growth
                  </h3>
                  <p className="text-gray-600">
                    We invest in our team&apos;s development and provide
                    opportunities for continuous learning.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Impact
                  </h3>
                  <p className="text-gray-600">
                    We focus on building solutions that make a real difference
                    in our users&apos; lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Opportunities */}
      <section className="px-6 py-20 bg-linear-to-r from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Future Opportunities
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re always interested in connecting with talented people. If
            you are skilled in any of the following areas, we&apos;d love to hear
            from you:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Engineering</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Full-Stack Developers</li>
                <li>• AI/ML Engineers</li>
                <li>• DevOps Engineers</li>
                <li>• Mobile Developers</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Product & Design
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Product Managers</li>
                <li>• UX/UI Designers</li>
                <li>• Product Marketing</li>
                <li>• Data Analysts</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay in Touch
            </h3>
            <p className="text-gray-600 mb-6">
              Send us your resume and a brief note about what interests you
              about Paperless. We&apos;ll keep your information on file for
              future opportunities.
            </p>
            <Button
              size="lg"
              className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="/contact" className="flex items-center justify-center">
                <Mail className="mr-2 h-5 w-5" />
                Send Us Your Info
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
