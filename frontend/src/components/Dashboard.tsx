"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FileText,
  TrendingUp,
  Tag,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { analyticsAPI, receiptsAPI } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { ReceiptCard } from "./ReceiptCard";
import { DashboardProps, Receipt } from "@/types";
import { Receipt as ReceiptIcon } from "lucide-react";

export function Dashboard({
  onUploadReceipt,
  onUploadInvoice,
  onViewReceipt,
  onEditReceipt,
}: DashboardProps) {
  // Mock data for UI testing
  const analytics = {
    data: {
      summary: {
        receiptCount: 12,
        invoiceCount: 5,
        totalReceiptAmount: 2450.75,
        totalInvoiceAmount: 3200.0,
      },
      spendingByCategory: [
        {
          categoryId: "1",
          category: { name: "Office Supplies", color: "#3B82F6" },
          amount: 450.25,
          count: 3,
        },
        {
          categoryId: "2",
          category: { name: "Travel & Transport", color: "#10B981" },
          amount: 890.5,
          count: 4,
        },
        {
          categoryId: "3",
          category: { name: "Meals & Entertainment", color: "#F59E0B" },
          amount: 320.0,
          count: 2,
        },
        {
          categoryId: "4",
          category: { name: "Utilities", color: "#EF4444" },
          amount: 180.0,
          count: 1,
        },
      ],
      monthlySpending: [
        { month: "2024-01", amount: 1200 },
        { month: "2024-02", amount: 1450 },
        { month: "2024-03", amount: 1800 },
        { month: "2024-04", amount: 1650 },
        { month: "2024-05", amount: 2100 },
        { month: "2024-06", amount: 1950 },
        { month: "2024-07", amount: 2200 },
        { month: "2024-08", amount: 2450 },
        { month: "2024-09", amount: 2300 },
        { month: "2024-10", amount: 2600 },
        { month: "2024-11", amount: 2400 },
        { month: "2024-12", amount: 2800 },
      ],
      topVendors: [
        { vendor: "Amazon", amount: 650.25, count: 4 },
        { vendor: "Uber", amount: 320.5, count: 8 },
        { vendor: "Starbucks", amount: 180.75, count: 12 },
        { vendor: "Office Depot", amount: 450.0, count: 2 },
        { vendor: "Shell", amount: 280.25, count: 6 },
      ],
      invoiceStatusSummary: [
        { status: "PENDING", count: 2, amount: 1200.0 },
        { status: "PAID", count: 3, amount: 2000.0 },
        { status: "OVERDUE", count: 0, amount: 0 },
      ],
    },
  };

  const recentReceipts = {
    data: {
      receipts: [
        {
          id: "1",
          title: "Office Supplies Purchase",
          vendor: "Office Depot",
          amount: 125.5,
          currency: "USD",
          date: "2024-01-15",
          status: "VERIFIED",
          category: { id: "1", name: "Office Supplies", color: "#3B82F6" },
          tags: [{ id: "1", name: "Business", color: "#6B7280" }],
        },
        {
          id: "2",
          title: "Lunch Meeting",
          vendor: "Starbucks",
          amount: 24.75,
          currency: "USD",
          date: "2024-01-14",
          status: "VERIFIED",
          category: {
            id: "3",
            name: "Meals & Entertainment",
            color: "#F59E0B",
          },
          tags: [{ id: "2", name: "Client Meeting", color: "#10B981" }],
        },
        {
          id: "3",
          title: "Uber Ride",
          vendor: "Uber",
          amount: 18.5,
          currency: "USD",
          date: "2024-01-13",
          status: "VERIFIED",
          category: { id: "2", name: "Travel & Transport", color: "#10B981" },
          tags: [],
        },
      ],
    },
  };

  const analyticsLoading = false;
  const receiptsLoading = false;

  // const { data: analytics, isLoading: analyticsLoading } = useQuery({
  //   queryKey: ['dashboard-analytics'],
  //   queryFn: () => analyticsAPI.getDashboard()
  // });

  // const { data: recentReceipts, isLoading: receiptsLoading } = useQuery({
  //   queryKey: ['recent-receipts'],
  //   queryFn: () => receiptsAPI.getAll({ page: 1, limit: 5 })
  // });

  if (analyticsLoading || receiptsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = analytics?.data?.summary || {};
  const spendingByCategory = analytics?.data?.spendingByCategory || [];
  const monthlySpending = analytics?.data?.monthlySpending || [];
  const topVendors = analytics?.data?.topVendors || [];
  const recentReceiptsList = recentReceipts?.data?.receipts || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
          <p className="text-secondary text-lg">
            Welcome back! Here&apos;s what&apos;s happening with your documents
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={onUploadReceipt}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Upload Receipt</span>
          </Button>
          <Button
            variant="outline"
            onClick={onUploadInvoice}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Upload Invoice</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">
              Total Receipts
            </CardTitle>
            <ReceiptIcon className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {stats.receiptCount || 0}
            </div>
            <p className="text-sm text-muted font-medium">
              {formatCurrency(stats.totalReceiptAmount || 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">
              Total Invoices
            </CardTitle>
            <FileText className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {stats.invoiceCount || 0}
            </div>
            <p className="text-sm text-muted font-medium">
              {formatCurrency(stats.totalInvoiceAmount || 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">
              This Month
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(
                monthlySpending[monthlySpending.length - 1]?.amount || 0
              )}
            </div>
            <p className="text-sm text-green-600 font-medium">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">
              Categories
            </CardTitle>
            <Tag className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {spendingByCategory.length}
            </div>
            <p className="text-sm text-muted font-medium">Active categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spendingByCategory
                .slice(0, 5)
                .map(
                  (
                    category: {
                      categoryId: string;
                      category: { color: string; name: string };
                      amount: number;
                      count: number;
                    },
                    index: number
                  ) => (
                    <div
                      key={category.categoryId || index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-5 h-5 rounded-full shadow-sm"
                          style={{
                            backgroundColor:
                              category.category?.color || "#6B7280",
                          }}
                        />
                        <span className="text-sm font-semibold text-primary">
                          {category.category?.name || "Uncategorized"}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">
                          {formatCurrency(category.amount)}
                        </div>
                        <div className="text-xs text-muted">
                          {category.count} items
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </CardContent>
        </Card>

        {/* Top Vendors */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-primary">Top Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendors.slice(0, 5).map((vendor: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-sm font-bold text-white">
                        {vendor.vendor?.charAt(0)?.toUpperCase() || "?"}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {vendor.vendor || "Unknown"}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary">
                      {formatCurrency(vendor.amount)}
                    </div>
                    <div className="text-xs text-muted">
                      {vendor.count} transactions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Receipts */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-primary">Recent Receipts</CardTitle>
            <Button variant="outline" size="sm" className="hover:bg-accent hover:text-white transition-colors">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentReceiptsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReceiptsList.map((receipt: any) => (
                <ReceiptCard
                  key={receipt.id}
                  receipt={receipt}
                  onView={onViewReceipt}
                  onEdit={onEditReceipt}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ReceiptIcon className="h-10 w-10 text-accent" />
              </div>
              <h3 className="mt-2 text-lg font-semibold text-primary">
                No receipts yet
              </h3>
              <p className="mt-2 text-secondary">
                Get started by uploading your first receipt.
              </p>
              <div className="mt-8">
                <Button 
                  onClick={onUploadReceipt}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Upload Receipt
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
