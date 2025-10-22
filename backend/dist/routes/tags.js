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
        const tags = await prisma.tag.findMany({
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
        res.json({ tags });
    }
    catch (error) {
        console.error('Get tags error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await prisma.tag.findFirst({
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
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.json({ tag });
    }
    catch (error) {
        console.error('Get tag error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/', auth_1.authenticateToken, (0, validation_1.validate)(validation_1.createTagSchema), async (req, res) => {
    try {
        const tag = await prisma.tag.create({
            data: {
                ...req.body,
                userId: req.user.id
            }
        });
        res.status(201).json({
            message: 'Tag created successfully',
            tag
        });
    }
    catch (error) {
        console.error('Create tag error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.put('/:id', auth_1.authenticateToken, (0, validation_1.validate)(validation_1.updateTagSchema), async (req, res) => {
    try {
        const { id } = req.params;
        const existingTag = await prisma.tag.findFirst({
            where: {
                id,
                userId: req.user.id
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
    }
    catch (error) {
        console.error('Update tag error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await prisma.tag.findFirst({
            where: {
                id,
                userId: req.user.id
            }
        });
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
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
    }
    catch (error) {
        console.error('Delete tag error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=tags.js.map