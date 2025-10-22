import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get dashboard analytics
router.get('/dashboard', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { startDate, endDate } = req.query;

    const dateFilter: any = {};
    if (startDate) dateFilter.gte = new Date(startDate as string);
    if (endDate) dateFilter.lte = new Date(endDate as string);

    // Get basic counts
    const [receiptCount, invoiceCount, totalReceiptAmount, totalInvoiceAmount] = await Promise.all([
      prisma.receipt.count({
        where: {
          userId,
          ...(Object.keys(dateFilter).length > 0 && { date: dateFilter })
        }
      }),
      prisma.invoice.count({
        where: {
          userId,
          ...(Object.keys(dateFilter).length > 0 && { date: dateFilter })
        }
      }),
      prisma.receipt.aggregate({
        where: {
          userId,
          ...(Object.keys(dateFilter).length > 0 && { date: dateFilter })
        },
        _sum: { amount: true }
      }),
      prisma.invoice.aggregate({
        where: {
          userId,
          ...(Object.keys(dateFilter).length > 0 && { date: dateFilter })
        },
        _sum: { amount: true }
      })
    ]);

    // Get spending by category
    const spendingByCategory = await prisma.receipt.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        ...(Object.keys(dateFilter).length > 0 && { date: dateFilter })
      },
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 10
    });

    // Get category details
    const categoryIds = spendingByCategory.map(item => item.categoryId).filter(Boolean) as string[];
    const categories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true, name: true, color: true }
    });

    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    }, {} as Record<string, any>);

    const spendingByCategoryWithDetails = spendingByCategory.map(item => ({
      categoryId: item.categoryId,
      category: categoryMap[item.categoryId || ''] || { name: 'Uncategorized', color: '#6B7280' },
      amount: item._sum.amount || 0,
      count: item._count.id
    }));

    // Get monthly spending trend (last 12 months)
    const monthlySpending = await prisma.receipt.groupBy({
      by: ['date'],
      where: {
        userId,
        date: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))
        }
      },
      _sum: { amount: true },
      orderBy: { date: 'asc' }
    });

    // Process monthly data
    const monthlyData = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      const monthData = monthlySpending.find(item => {
        const itemDate = new Date(item.date);
        const itemMonthKey = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, '0')}`;
        return itemMonthKey === monthKey;
      });

      return {
        month: monthKey,
        amount: monthData?._sum.amount || 0
      };
    });

    // Get top vendors
    const topVendors = await prisma.receipt.groupBy({
      by: ['vendor'],
      where: {
        userId,
        vendor: { not: null },
        ...(Object.keys(dateFilter).length > 0 && { date: dateFilter })
      },
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: 10
    });

    // Get invoice status summary
    const invoiceStatusSummary = await prisma.invoice.groupBy({
      by: ['status'],
      where: {
        userId,
        ...(Object.keys(dateFilter).length > 0 && { date: dateFilter })
      },
      _count: { id: true },
      _sum: { amount: true }
    });

    return res.json({
      summary: {
        receiptCount,
        invoiceCount,
        totalReceiptAmount: totalReceiptAmount._sum.amount || 0,
        totalInvoiceAmount: totalInvoiceAmount._sum.amount || 0
      },
      spendingByCategory: spendingByCategoryWithDetails,
      monthlySpending: monthlyData,
      topVendors: topVendors.map(vendor => ({
        vendor: vendor.vendor,
        amount: vendor._sum.amount || 0,
        count: vendor._count.id
      })),
      invoiceStatusSummary: invoiceStatusSummary.map(status => ({
        status: status.status,
        count: status._count.id,
        amount: status._sum.amount || 0
      }))
    });
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get spending trends
router.get('/trends', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { period = 'month', limit = 12 } = req.query;

    const periods = Number(limit);
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - (periods * 7 * 24 * 60 * 60 * 1000));
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - periods, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear() - periods, 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth() - periods, 1);
    }

    const trends = await prisma.receipt.groupBy({
      by: ['date'],
      where: {
        userId,
        date: { gte: startDate }
      },
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { date: 'asc' }
    });

    res.json({ trends });
  } catch (error) {
    console.error('Trends analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
