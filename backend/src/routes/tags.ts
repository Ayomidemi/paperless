import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { createTagSchema, updateTagSchema, validate } from '../utils/validation';

const router = express.Router();
const prisma = new PrismaClient();

// Get all tags for a user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        OR: [
          { userId: req.user!.id },
          { userId: null } // Global tags
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

    res.json({ tags });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single tag
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const tag = await prisma.tag.findFirst({
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

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    res.json({ tag });
  } catch (error) {
    console.error('Get tag error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create tag
router.post('/', authenticateToken, validate(createTagSchema), async (req: AuthRequest, res) => {
  try {
    const tag = await prisma.tag.create({
      data: {
        ...req.body,
        userId: req.user!.id
      }
    });

    res.status(201).json({
      message: 'Tag created successfully',
      tag
    });
  } catch (error) {
    console.error('Create tag error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update tag
router.put('/:id', authenticateToken, validate(updateTagSchema), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if tag exists and belongs to user
    const existingTag = await prisma.tag.findFirst({
      where: {
        id,
        userId: req.user!.id
      }
    });

    if (!existingTag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: req.body
    });

    res.json({
      message: 'Tag updated successfully',
      tag
    });
  } catch (error) {
    console.error('Update tag error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete tag
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Check if tag exists and belongs to user
    const tag = await prisma.tag.findFirst({
      where: {
        id,
        userId: req.user!.id
      }
    });

    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    // Check if tag is being used
    const usageCount = await prisma.receipt.count({
      where: { tags: { some: { id } } }
    }) + await prisma.invoice.count({
      where: { tags: { some: { id } } }
    });

    if (usageCount > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete tag that is being used',
        usageCount
      });
    }

    await prisma.tag.delete({
      where: { id }
    });

    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Delete tag error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
