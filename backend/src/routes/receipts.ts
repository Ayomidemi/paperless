import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { createReceiptSchema, updateReceiptSchema, validate } from '../utils/validation';
import { upload, uploadToS3 } from '../services/fileUpload';
import { OCRService } from '../services/ocrService';

const router = express.Router();
const prisma = new PrismaClient();

// Get all receipts for a user
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
  } catch (error) {
    console.error('Get receipts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single receipt
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const receipt = await prisma.receipt.findFirst({
      where: {
        id,
        userId: req.user!.id
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
  } catch (error) {
    console.error('Get receipt error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload and create receipt
router.post('/upload', authenticateToken, upload.single('file'), async (req: AuthRequest, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload file to S3
    const fileUrl = await uploadToS3(req.file, 'receipts');

    // Extract data using OCR
    const extractedData = await OCRService.processFile(req.file.buffer, req.file.mimetype);

    // Categorize the receipt
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

    // Create receipt
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
        userId: req.user!.id,
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
  } catch (error) {
    console.error('Upload receipt error:', error);
    res.status(500).json({ error: 'Failed to process receipt' });
  }
});

// Create receipt manually
router.post('/', authenticateToken, validate(createReceiptSchema), async (req: AuthRequest, res) => {
  try {
    const { tagIds, ...receiptData } = req.body;

    const receipt = await prisma.receipt.create({
      data: {
        ...receiptData,
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
      message: 'Receipt created successfully',
      receipt
    });
  } catch (error) {
    console.error('Create receipt error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update receipt
router.put('/:id', authenticateToken, validate(updateReceiptSchema), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { tagIds, ...updateData } = req.body;

    // Check if receipt exists and belongs to user
    const existingReceipt = await prisma.receipt.findFirst({
      where: {
        id,
        userId: req.user!.id
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
          set: tagIds.map((id: string) => ({ id }))
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
  } catch (error) {
    console.error('Update receipt error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete receipt
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if receipt exists and belongs to user
    const receipt = await prisma.receipt.findFirst({
      where: {
        id,
        userId: req.user!.id
      }
    });

    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }

    // TODO: Delete file from S3
    // await deleteFromS3(receipt.fileUrl);

    await prisma.receipt.delete({
      where: { id }
    });

    res.json({ message: 'Receipt deleted successfully' });
  } catch (error) {
    console.error('Delete receipt error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
