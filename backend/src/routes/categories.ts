import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { createCategorySchema, updateCategorySchema, validate } from '../utils/validation';

const router = express.Router();
const prisma = new PrismaClient();

// Get all categories for a user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        OR: [
          { userId: req.user!.id },
          { userId: null } // Global categories
        ]
      },
      include: {
        _count: {
          select: {
            receipts: true,
            invoices: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single category
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findFirst({
      where: {
        id,
        OR: [
          { userId: req.user!.id },
          { userId: null }
        ]
      },
      include: {
        _count: {
          select: {
            receipts: true,
            invoices: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ category });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create category
router.post('/', authenticateToken, validate(createCategorySchema), async (req: AuthRequest, res) => {
  try {
    const category = await prisma.category.create({
      data: {
        ...req.body,
        userId: req.user!.id
      }
    });

    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update category
router.put('/:id', authenticateToken, validate(updateCategorySchema), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if category exists and belongs to user
    const existingCategory = await prisma.category.findFirst({
      where: {
        id,
        userId: req.user!.id
      }
    });

    if (!existingCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const category = await prisma.category.update({
      where: { id },
      data: req.body
    });

    res.json({
      message: 'Category updated successfully',
      category
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete category
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if category exists and belongs to user
    const category = await prisma.category.findFirst({
      where: {
        id,
        userId: req.user!.id
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if category is being used
    const usageCount = await prisma.receipt.count({
      where: { categoryId: id }
    }) + await prisma.invoice.count({
      where: { categoryId: id }
    });

    if (usageCount > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete category that is being used',
        usageCount
      });
    }

    await prisma.category.delete({
      where: { id }
    });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
