"use client";

import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Receipt, 
  FileText, 
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff
} from "lucide-react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  AreaChart,
  Area
} from "recharts";

// Mock data for analytics
const monthlyData = [
  { month: 'Jan', receipts: 1200, invoices: 800, total: 2000 },
  { month: 'Feb', receipts: 1500, invoices: 1200, total: 2700 },
  { month: 'Mar', receipts: 1800, invoices: 1000, total: 2800 },
  { month: 'Apr', receipts: 1600, invoices: 1400, total: 3000 },
  { month: 'May', receipts: 2200, invoices: 1600, total: 3800 },
  { month: 'Jun', receipts: 1900, invoices: 1800, total: 3700 },
  { month: 'Jul', receipts: 2100, invoices: 2000, total: 4100 },
  { month: 'Aug', receipts: 2400, invoices: 1700, total: 4100 },
  { month: 'Sep', receipts: 2000, invoices: 1900, total: 3900 },
  { month: 'Oct', receipts: 2300, invoices: 2100, total: 4400 },
  { month: 'Nov', receipts: 2500, invoices: 2200, total: 4700 },
  { month: 'Dec', receipts: 2800, invoices: 2400, total: 5200 },
];

const categoryData = [
  { name: 'Office Supplies', value: 4500, color: '#3B82F6' },
  { name: 'Travel & Transport', value: 3200, color: '#10B981' },
  { name: 'Meals & Entertainment', value: 2800, color: '#F59E0B' },
  { name: 'Software', value: 2200, color: '#8B5CF6' },
  { name: 'Utilities', value: 1800, color: '#EF4444' },
  { name: 'Other', value: 1500, color: '#6B7280' },
];

const vendorData = [
  { name: 'Amazon', amount: 2500, count: 45 },
  { name: 'Office Depot', amount: 1800, count: 32 },
  { name: 'Uber', amount: 1200, count: 28 },
  { name: 'Starbucks', amount: 800, count: 35 },
  { name: 'Adobe', amount: 600, count: 2 },
];

const weeklyData = [
  { day: 'Mon', amount: 450 },
  { day: 'Tue', amount: 320 },
  { day: 'Wed', amount: 680 },
  { day: 'Thu', amount: 520 },
  { day: 'Fri', amount: 890 },
  { day: 'Sat', amount: 240 },
  { day: 'Sun', amount: 180 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [showDetailed, setShowDetailed] = useState(false);

  const totalAmount = monthlyData.reduce((sum, item) => sum + item.total, 0);
  const avgMonthly = totalAmount / monthlyData.length;
  const growthRate = ((monthlyData[monthlyData.length - 1].total - monthlyData[monthlyData.length - 2].total) / monthlyData[monthlyData.length - 2].total * 100);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600 mt-2">Insights and trends for your financial data</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowDetailed(!showDetailed)}
                className="flex items-center space-x-2"
              >
                {showDetailed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showDetailed ? 'Hide Details' : 'Show Details'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range === '7d' ? '7 Days' : 
                 range === '30d' ? '30 Days' : 
                 range === '90d' ? '90 Days' : '1 Year'}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spending</p>
                  <p className="text-2xl font-bold text-gray-900">${totalAmount.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    {growthRate > 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${growthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(growthRate).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Monthly</p>
                  <p className="text-2xl font-bold text-gray-900">${avgMonthly.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Per month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Receipts</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                  <p className="text-sm text-gray-500 mt-1">This year</p>
                </div>
                <Receipt className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                  <p className="text-2xl font-bold text-gray-900">892</p>
                  <p className="text-sm text-gray-500 mt-1">This year</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend Chart */}
          <Card className="shadow-lg border-0 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-900">Monthly Spending Trend</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Receipts</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Invoices</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#666"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#666"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-semibold text-gray-900">{label}</p>
                              {payload.map((entry, index) => (
                                <p key={index} className="text-sm" style={{ color: entry.color }}>
                                  {entry.name}: ${entry.value?.toLocaleString()}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="receipts" 
                      stackId="1"
                      stroke="#3b82f6" 
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="invoices" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Distribution */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-semibold text-gray-900">{data.name}</p>
                              <p className="text-blue-600">
                                Amount: <span className="font-bold">${data.value.toLocaleString()}</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-gray-600">{category.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">${category.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Vendors */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">Top Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={vendorData}
                    layout="horizontal"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      type="number" 
                      stroke="#666"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      stroke="#666"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={80}
                    />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                              <p className="font-semibold text-gray-900">{label}</p>
                              <p className="text-blue-600">
                                Amount: <span className="font-bold">${data.amount.toLocaleString()}</span>
                              </p>
                              <p className="text-gray-600">
                                Transactions: <span className="font-bold">{data.count}</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#3b82f6" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Breakdown */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Weekly Spending Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#666"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-semibold text-gray-900">{label}</p>
                            <p className="text-blue-600">
                              Amount: <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
