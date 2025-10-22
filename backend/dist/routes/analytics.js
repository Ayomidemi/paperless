"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/dashboard', auth_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { startDate, endDate } = req.query;
        const dateFilter = {};
        if (startDate)
            dateFilter.gte = new Date(startDate);
        if (endDate)
            dateFilter.lte = new Date(endDate);
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
        const categoryIds = spendingByCategory.map(item => item.categoryId).filter(Boolean);
        const categories = await prisma.category.findMany({
            where: { id: { in: categoryIds } },
            select: { id: true, name: true, color: true }
        });
        const categoryMap = categories.reduce((acc, cat) => {
            acc[cat.id] = cat;
            return acc;
        }, {});
        const spendingByCategoryWithDetails = spendingByCategory.map(item => ({
            categoryId: item.categoryId,
            category: categoryMap[item.categoryId] || { name: 'Uncategorized', color: '#6B7280' },
            amount: item._sum.amount || 0,
            count: item._count.id
        }));
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
    }
    catch (error) {
        console.error('Dashboard analytics error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/trends', auth_1.authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { period = 'month', limit = 12 } = req.query;
        const periods = Number(limit);
        const now = new Date();
        let startDate;
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
    }
    catch (error) {
        console.error('Trends analytics error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=analytics.js.map