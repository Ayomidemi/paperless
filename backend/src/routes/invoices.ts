import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { createInvoiceSchema, updateInvoiceSchema, validate } from '../utils/validation';
import { upload, uploadToS3 } from '../services/fileUpload';
import { OCRService } from '../services/ocrService';

const router = express.Router();
const prisma = new PrismaClient();

// Get all invoices for a user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { page = 1, limit = 10, search, category, status, startDate, endDate } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
      userId: req.user!.id
    };

    if (search) {
      where.OR = [
        { vendor: { contains: search as string, mode: 'insensitive' } },
        { client: { contains: search as string, mode: 'insensitive' } },
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
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
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
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
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single invoice
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findFirst({
      where: {
        id,
        userId: req.user!.id
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
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload and create invoice
router.post('/upload', authenticateToken, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload file to S3
    const fileUrl = await uploadToS3(req.file, 'invoices');

    // Extract data using OCR
    const extractedData = await OCRService.processFile(req.file.buffer, req.file.mimetype);

    // Categorize the invoice
    const categoryName = await OCRService.categorizeReceipt(
      extractedData.vendor || '',
      extractedData.description || ''
    );

    // Find or create category
    let category = await prisma.category.findFirst({
      where: {
        name: categoryName,
        userId: req.user!.id
      }
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          userId: req.user!.id
        }
      });
    }

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        title: extractedData.vendor || 'Untitled Invoice',
        vendor: extractedData.vendor,
        client: extractedData.vendor, // For now, same as vendor
        amount: extractedData.total || 0,
        currency: extractedData.currency || 'USD',
        date: extractedData.date ? new Date(extractedData.date) : new Date(),
        dueDate: extractedData.date ? new Date(new Date(extractedData.date).getTime() + 30 * 24 * 60 * 60 * 1000) : undefined, // 30 days from date
        tax: extractedData.tax,
        fileUrl,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        ocrData: extractedData,
        extractedData: extractedData,
        userId: req.user!.id,
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
  } catch (error) {
    console.error('Upload invoice error:', error);
    res.status(500).json({ error: 'Failed to process invoice' });
  }
});

// Create invoice manually
router.post('/', authenticateToken, validate(createInvoiceSchema), async (req: AuthRequest, res) => {
  try {
    const { tagIds, ...invoiceData } = req.body;

    const invoice = await prisma.invoice.create({
      data: {
        ...invoiceData,
        userId: req.user!.id,
        tags: tagIds ? {
          connect: tagIds.map((id: string) => ({ id }))
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
  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update invoice
router.put('/:id', authenticateToken, validate(updateInvoiceSchema), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { tagIds, ...updateData } = req.body;

    // Check if invoice exists and belongs to user
    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        id,
        userId: req.user!.id
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
          set: tagIds.map((id: string) => ({ id }))
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
  } catch (error) {
    console.error('Update invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete invoice
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if invoice exists and belongs to user
    const invoice = await prisma.invoice.findFirst({
      where: {
        id,
        userId: req.user!.id
      }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // TODO: Delete file from S3
    // await deleteFromS3(invoice.fileUrl);

    await prisma.invoice.delete({
      where: { id }
    });

    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
