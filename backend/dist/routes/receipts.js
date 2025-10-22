"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../utils/validation");
const fileUpload_1 = require("../services/fileUpload");
const ocrService_1 = require("../services/ocrService");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category, status, startDate, endDate } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = {
            userId: req.user.id
        };
        if (search) {
            where.OR = [
                { vendor: { contains: search, mode: 'insensitive' } },
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        if (category) {
            where.categoryId = category;
        }
        if (status) {
            where.status = status;
        }
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        const [receipts, total] = await Promise.all([
            prisma.receipt.findMany({
                where,
                include: {
                    category: true,
                    tags: true
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit)
            }),
            prisma.receipt.count({ where })
        ]);
        res.json({
            receipts,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Get receipts error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const receipt = await prisma.receipt.findFirst({
            where: {
                id,
                userId: req.user.id
            },
            include: {
                category: true,
                tags: true
            }
        });
        if (!receipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }
        res.json({ receipt });
    }
    catch (error) {
        console.error('Get receipt error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/upload', auth_1.authenticateToken, fileUpload_1.upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const fileUrl = await (0, fileUpload_1.uploadToS3)(req.file, 'receipts');
        const extractedData = await ocrService_1.OCRService.processFile(req.file.buffer, req.file.mimetype);
        const categoryName = await ocrService_1.OCRService.categorizeReceipt(extractedData.vendor || '', extractedData.description || '');
        let category = await prisma.category.findFirst({
            where: {
                name: categoryName,
                userId: req.user.id
            }
        });
        if (!category) {
            category = await prisma.category.create({
                data: {
                    name: categoryName,
                    userId: req.user.id
                }
            });
        }
        const receipt = await prisma.receipt.create({
            data: {
                title: extractedData.vendor || 'Untitled Receipt',
                vendor: extractedData.vendor,
                amount: extractedData.total || 0,
                currency: extractedData.currency || 'USD',
                date: extractedData.date ? new Date(extractedData.date) : new Date(),
                tax: extractedData.tax,
                paymentMethod: extractedData.paymentMethod,
                description: extractedData.description,
                fileUrl,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
                ocrData: extractedData,
                extractedData: extractedData,
                userId: req.user.id,
                categoryId: category.id
            },
            include: {
                category: true,
                tags: true
            }
        });
        res.status(201).json({
            message: 'Receipt uploaded and processed successfully',
            receipt
        });
    }
    catch (error) {
        console.error('Upload receipt error:', error);
        res.status(500).json({ error: 'Failed to process receipt' });
    }
});
router.post('/', auth_1.authenticateToken, (0, validation_1.validate)(validation_1.createReceiptSchema), async (req, res) => {
    try {
        const { tagIds, ...receiptData } = req.body;
        const receipt = await prisma.receipt.create({
            data: {
                ...receiptData,
                userId: req.user.id,
                tags: tagIds ? {
                    connect: tagIds.map((id) => ({ id }))
                } : undefined
            },
            include: {
                category: true,
                tags: true
            }
        });
        res.status(201).json({
            message: 'Receipt created successfully',
            receipt
        });
    }
    catch (error) {
        console.error('Create receipt error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.put('/:id', auth_1.authenticateToken, (0, validation_1.validate)(validation_1.updateReceiptSchema), async (req, res) => {
    try {
        const { id } = req.params;
        const { tagIds, ...updateData } = req.body;
        const existingReceipt = await prisma.receipt.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!existingReceipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }
        const receipt = await prisma.receipt.update({
            where: { id },
            data: {
                ...updateData,
                tags: tagIds ? {
                    set: tagIds.map((id) => ({ id }))
                } : undefined
            },
            include: {
                category: true,
                tags: true
            }
        });
        res.json({
            message: 'Receipt updated successfully',
            receipt
        });
    }
    catch (error) {
        console.error('Update receipt error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const receipt = await prisma.receipt.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!receipt) {
            return res.status(404).json({ error: 'Receipt not found' });
        }
        await prisma.receipt.delete({
            where: { id }
        });
        res.json({ message: 'Receipt deleted successfully' });
    }
    catch (error) {
        console.error('Delete receipt error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=receipts.js.map