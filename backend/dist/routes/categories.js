"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../utils/validation");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            where: {
                OR: [
                    { userId: req.user.id },
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
            },
            orderBy: { name: 'asc' }
        });
        res.json({ categories });
    }
    catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findFirst({
            where: {
                id,
                OR: [
                    { userId: req.user.id },
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
    }
    catch (error) {
        console.error('Get category error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/', auth_1.authenticateToken, (0, validation_1.validate)(validation_1.createCategorySchema), async (req, res) => {
    try {
        const category = await prisma.category.create({
            data: {
                ...req.body,
                userId: req.user.id
            }
        });
        res.status(201).json({
            message: 'Category created successfully',
            category
        });
    }
    catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.put('/:id', auth_1.authenticateToken, (0, validation_1.validate)(validation_1.updateCategorySchema), async (req, res) => {
    try {
        const { id } = req.params;
        const existingCategory = await prisma.category.findFirst({
            where: {
                id,
                userId: req.user.id
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
    }
    catch (error) {
        console.error('Update category error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.category.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
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
    }
    catch (error) {
        console.error('Delete category error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=categories.js.map