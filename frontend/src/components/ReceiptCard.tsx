'use client';

import React from 'react';
import { Receipt, Calendar, DollarSign, Tag, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ReceiptCardProps } from '@/types';

export function ReceiptCard({ 
  receipt, 
  onEdit, 
  onDelete, 
  onView 
}: ReceiptCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'DISPUTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-primary text-lg">
                {receipt.title || receipt.vendor || 'Untitled Receipt'}
              </h3>
              {receipt.vendor && receipt.title && (
                <p className="text-sm text-secondary">{receipt.vendor}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(receipt.status)}`}>
              {receipt.status}
            </span>
            <Button variant="ghost" size="sm" className="hover:bg-gray-100">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-accent">
              <DollarSign className="h-5 w-5" />
              <span className="font-bold text-xl text-primary">
                {formatCurrency(receipt.amount, receipt.currency)}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-muted">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{formatDate(receipt.date)}</span>
            </div>
          </div>

          {receipt.category && (
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: receipt.category.color }}
              />
              <span className="text-sm font-semibold text-secondary">{receipt.category.name}</span>
            </div>
          )}

          {receipt.tags && receipt.tags.length > 0 && (
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-muted" />
              <div className="flex flex-wrap gap-2">
                {receipt.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-xs font-medium rounded-full shadow-sm"
                    style={{ backgroundColor: tag.color + '20', color: tag.color }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-3">
            {onView && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onView(receipt.id)}
                className="flex-1 hover:bg-accent hover:text-white transition-colors"
              >
                View
              </Button>
            )}
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onEdit(receipt.id)}
                className="flex-1 hover:bg-green-500 hover:text-white transition-colors"
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onDelete(receipt.id)}
                className="flex-1"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
