'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { FileUpload } from '@/components/FileUpload';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Receipt, FileText, Upload as UploadIcon, CheckCircle } from 'lucide-react';
import { receiptsAPI, invoicesAPI, categoriesAPI, tagsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function UploadPage() {
  const { user } = useAuth();
  const [uploadType, setUploadType] = useState<'receipt' | 'invoice'>('receipt');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  
  const queryClient = useQueryClient();

  // Mock data for UI testing
  const categories = {
    data: {
      categories: [
        { id: '1', name: 'Office Supplies', color: '#3B82F6' },
        { id: '2', name: 'Travel & Transport', color: '#10B981' },
        { id: '3', name: 'Meals & Entertainment', color: '#F59E0B' },
        { id: '4', name: 'Utilities', color: '#EF4444' },
        { id: '5', name: 'Healthcare', color: '#8B5CF6' },
        { id: '6', name: 'Groceries', color: '#06B6D4' }
      ]
    }
  };

  const tags = {
    data: {
      tags: [
        { id: '1', name: 'Business', color: '#6B7280' },
        { id: '2', name: 'Personal', color: '#10B981' },
        { id: '3', name: 'Client Meeting', color: '#F59E0B' },
        { id: '4', name: 'Tax Deductible', color: '#EF4444' }
      ]
    }
  };

  // const { data: categories } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => categoriesAPI.getAll()
  // });
  // const { data: tags } = useQuery({
  //   queryKey: ['tags'],
  //   queryFn: () => tagsAPI.getAll()
  // });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      // Mock upload for UI testing
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              vendor: 'Sample Vendor',
              amount: 125.50,
              date: '2024-01-15',
              currency: 'USD',
              tax: 12.55,
              description: 'Sample receipt description',
              confidence: 0.95
            }
          });
        }, 2000); // Simulate 2 second processing time
      });
    },
    onSuccess: (response: any) => {
      toast.success(`${uploadType === 'receipt' ? 'Receipt' : 'Invoice'} uploaded successfully!`);
      setExtractedData(response.data);
      // queryClient.invalidateQueries({ queryKey: ['dashboard-analytics'] });
      // queryClient.invalidateQueries({ queryKey: ['recent-receipts'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Upload failed');
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  // const uploadMutation = useMutation({
  //   mutationFn: (file: File) => {
  //     if (uploadType === 'receipt') {
  //       return receiptsAPI.upload(file);
  //     } else {
  //       return invoicesAPI.upload(file);
  //     }
  //   },
  //   onSuccess: (response) => {
  //     toast.success(`${uploadType === 'receipt' ? 'Receipt' : 'Invoice'} uploaded successfully!`);
  //     setExtractedData(response.data);
  //     queryClient.invalidateQueries({ queryKey: ['dashboard-analytics'] });
  //     queryClient.invalidateQueries({ queryKey: ['recent-receipts'] });
  //   },
  //   onError: (error: any) => {
  //     toast.error(error.response?.data?.error || 'Upload failed');
  //   },
  //   onSettled: () => {
  //     setIsUploading(false);
  //   }
  // });

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsUploading(true);
    uploadMutation.mutate(file);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setExtractedData(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Please log in to upload files</h1>
          <p className="text-gray-600 mt-2">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
          <p className="text-gray-600">Upload receipts and invoices with Paperless AI-powered data extraction</p>
        </div>

        {/* Upload Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Document Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUploadType('receipt')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  uploadType === 'receipt'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Receipt className="h-6 w-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">Receipt</h3>
                    <p className="text-sm text-gray-600">Proof of payment</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setUploadType('invoice')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  uploadType === 'invoice'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold">Invoice</h3>
                    <p className="text-sm text-gray-600">Payment due</p>
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload {uploadType === 'receipt' ? 'Receipt' : 'Invoice'}</CardTitle>
          </CardHeader>
          <CardContent>
            {!uploadedFile ? (
              <FileUpload
                onUpload={handleFileUpload}
                disabled={isUploading}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">File uploaded successfully!</p>
                      <p className="text-sm text-green-700">{uploadedFile.name}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Upload Another
                  </Button>
                </div>

                {isUploading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Processing document with AI...</p>
                    </div>
                  </div>
                )}

                {extractedData && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Extracted Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Vendor
                        </label>
                        <Input
                          value={extractedData.vendor || ''}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount
                        </label>
                        <Input
                          value={extractedData.amount || ''}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <Input
                          value={extractedData.date || ''}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md">
                          <option value="">Select category</option>
                          {categories?.data?.categories?.map((category: any) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button className="flex-1">
                        Save {uploadType === 'receipt' ? 'Receipt' : 'Invoice'}
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">For Best Results:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use good lighting when taking photos</li>
                  <li>• Ensure text is clearly visible</li>
                  <li>• Avoid shadows and glare</li>
                  <li>• Keep the document flat</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Supported Formats:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Images: JPG, PNG, GIF</li>
                  <li>• Documents: PDF</li>
                  <li>• Maximum size: 10MB</li>
                  <li>• Mobile camera supported</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
