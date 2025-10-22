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
                { client: { contains: search, mode: 'insensitive' } },
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
        const [invoices, total] = await Promise.all([
            prisma.invoice.findMany({
                where,
                include: {
                    category: true,
                    tags: true
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit)
            }),
            prisma.invoice.count({ where })
        ]);
        res.json({
            invoices,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
    }
    catch (error) {
        console.error('Get invoices error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await prisma.invoice.findFirst({
            where: {
                id,
                userId: req.user.id
            },
            include: {
                category: true,
                tags: true
            }
        });
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.json({ invoice });
    }
    catch (error) {
        console.error('Get invoice error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/upload', auth_1.authenticateToken, fileUpload_1.upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const fileUrl = await (0, fileUpload_1.uploadToS3)(req.file, 'invoices');
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
        const invoice = await prisma.invoice.create({
            data: {
                title: extractedData.vendor || 'Untitled Invoice',
                vendor: extractedData.vendor,
                client: extractedData.vendor,
                amount: extractedData.total || 0,
                currency: extractedData.currency || 'USD',
                date: extractedData.date ? new Date(extractedData.date) : new Date(),
                dueDate: extractedData.date ? new Date(new Date(extractedData.date).getTime() + 30 * 24 * 60 * 60 * 1000) : undefined,
                tax: extractedData.tax,
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
            message: 'Invoice uploaded and processed successfully',
            invoice
        });
    }
    catch (error) {
        console.error('Upload invoice error:', error);
        res.status(500).json({ error: 'Failed to process invoice' });
    }
});
router.post('/', auth_1.authenticateToken, (0, validation_1.validate)(validation_1.createInvoiceSchema), async (req, res) => {
    try {
        const { tagIds, ...invoiceData } = req.body;
        const invoice = await prisma.invoice.create({
            data: {
                ...invoiceData,
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
            message: 'Invoice created successfully',
            invoice
        });
    }
    catch (error) {
        console.error('Create invoice error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.put('/:id', auth_1.authenticateToken, (0, validation_1.validate)(validation_1.updateInvoiceSchema), async (req, res) => {
    try {
        const { id } = req.params;
        const { tagIds, ...updateData } = req.body;
        const existingInvoice = await prisma.invoice.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!existingInvoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        const invoice = await prisma.invoice.update({
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
            message: 'Invoice updated successfully',
            invoice
        });
    }
    catch (error) {
        console.error('Update invoice error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await prisma.invoice.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        await prisma.invoice.delete({
            where: { id }
        });
        res.json({ message: 'Invoice deleted successfully' });
    }
    catch (error) {
        console.error('Delete invoice error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=invoices.js.map