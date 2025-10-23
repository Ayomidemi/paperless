"use client";

import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { ReceiptCard } from "@/components/ReceiptCard";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Calendar,
  DollarSign,
  Tag,
  FileText,
  Plus,
  Grid,
  List,
  SortAsc,
  SortDesc
} from "lucide-react";
import { Receipt } from "@/types";

// Mock data for receipts
const mockReceipts: Receipt[] = [
  {
    id: "1",
    title: "Office Supplies Purchase",
    vendor: "Office Depot",
    amount: 125.50,
    currency: "USD",
    date: "2024-01-15",
    status: "VERIFIED",
    category: { id: "1", name: "Office Supplies", color: "#3B82F6" },
    tags: [{ id: "1", name: "Business", color: "#6B7280" }],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Lunch Meeting",
    vendor: "Starbucks",
    amount: 24.75,
    currency: "USD",
    date: "2024-01-14",
    status: "VERIFIED",
    category: { id: "3", name: "Meals & Entertainment", color: "#F59E0B" },
    tags: [{ id: "2", name: "Client Meeting", color: "#10B981" }],
    createdAt: "2024-01-14T12:15:00Z",
    updatedAt: "2024-01-14T12:15:00Z"
  },
  {
    id: "3",
    title: "Uber Ride",
    vendor: "Uber",
    amount: 18.50,
    currency: "USD",
    date: "2024-01-13",
    status: "VERIFIED",
    category: { id: "2", name: "Travel & Transport", color: "#10B981" },
    tags: [],
    createdAt: "2024-01-13T09:45:00Z",
    updatedAt: "2024-01-13T09:45:00Z"
  },
  {
    id: "4",
    title: "Software License",
    vendor: "Adobe",
    amount: 299.99,
    currency: "USD",
    date: "2024-01-12",
    status: "VERIFIED",
    category: { id: "5", name: "Software", color: "#8B5CF6" },
    tags: [{ id: "3", name: "Subscription", color: "#F59E0B" }],
    createdAt: "2024-01-12T14:20:00Z",
    updatedAt: "2024-01-12T14:20:00Z"
  },
  {
    id: "5",
    title: "Gas Station",
    vendor: "Shell",
    amount: 45.20,
    currency: "USD",
    date: "2024-01-11",
    status: "PENDING",
    category: { id: "2", name: "Travel & Transport", color: "#10B981" },
    tags: [],
    createdAt: "2024-01-11T16:30:00Z",
    updatedAt: "2024-01-11T16:30:00Z"
  }
];

export default function ReceiptsPage() {
  const [receipts] = useState<Receipt[]>(mockReceipts);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "vendor">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Categories", color: "#6B7280" },
    { id: "1", name: "Office Supplies", color: "#3B82F6" },
    { id: "2", name: "Travel & Transport", color: "#10B981" },
    { id: "3", name: "Meals & Entertainment", color: "#F59E0B" },
    { id: "5", name: "Software", color: "#8B5CF6" }
  ];

  const filteredReceipts = receipts
    .filter(receipt => {
      const matchesSearch = receipt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           receipt.vendor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || receipt.category.id === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "vendor":
          comparison = a.vendor.localeCompare(b.vendor);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const totalAmount = receipts.reduce((sum, receipt) => sum + receipt.amount, 0);
  const verifiedCount = receipts.filter(r => r.status === "VERIFIED").length;
  const pendingCount = receipts.filter(r => r.status === "PENDING").length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Receipts</h1>
              <p className="text-gray-600 mt-2">Manage and organize your receipts</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                <Upload className="h-4 w-4" />
                <span>Upload Receipt</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Receipts</p>
                  <p className="text-2xl font-bold text-gray-900">{receipts.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">{verifiedCount}</p>
                </div>
                <Tag className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-lg border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search receipts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "date" | "amount" | "vendor")}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="vendor">Vendor</option>
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </Button>
                </div>

                {/* View Mode */}
                <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="p-2"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="p-2"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receipts Grid/List */}
        {filteredReceipts.length > 0 ? (
          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredReceipts.map((receipt) => (
              <ReceiptCard
                key={receipt.id}
                receipt={receipt}
                onView={() => console.log("View receipt:", receipt.id)}
                onEdit={() => console.log("Edit receipt:", receipt.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No receipts found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by uploading your first receipt"
                }
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Upload Receipt
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
