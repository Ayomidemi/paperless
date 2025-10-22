"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.updateTagSchema = exports.createTagSchema = exports.updateCategorySchema = exports.createCategorySchema = exports.updateInvoiceSchema = exports.createInvoiceSchema = exports.updateReceiptSchema = exports.createReceiptSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    firstName: joi_1.default.string().optional(),
    lastName: joi_1.default.string().optional()
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.createReceiptSchema = joi_1.default.object({
    title: joi_1.default.string().optional(),
    vendor: joi_1.default.string().optional(),
    amount: joi_1.default.number().positive().required(),
    currency: joi_1.default.string().length(3).default('USD'),
    date: joi_1.default.date().required(),
    tax: joi_1.default.number().min(0).optional(),
    paymentMethod: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    categoryId: joi_1.default.string().optional(),
    tagIds: joi_1.default.array().items(joi_1.default.string()).optional()
});
exports.updateReceiptSchema = joi_1.default.object({
    title: joi_1.default.string().optional(),
    vendor: joi_1.default.string().optional(),
    amount: joi_1.default.number().positive().optional(),
    currency: joi_1.default.string().length(3).optional(),
    date: joi_1.default.date().optional(),
    tax: joi_1.default.number().min(0).optional(),
    paymentMethod: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    status: joi_1.default.string().valid('PENDING', 'VERIFIED', 'DISPUTED').optional(),
    categoryId: joi_1.default.string().optional(),
    tagIds: joi_1.default.array().items(joi_1.default.string()).optional()
});
exports.createInvoiceSchema = joi_1.default.object({
    title: joi_1.default.string().optional(),
    vendor: joi_1.default.string().optional(),
    client: joi_1.default.string().optional(),
    amount: joi_1.default.number().positive().required(),
    currency: joi_1.default.string().length(3).default('USD'),
    date: joi_1.default.date().required(),
    dueDate: joi_1.default.date().optional(),
    tax: joi_1.default.number().min(0).optional(),
    description: joi_1.default.string().optional(),
    categoryId: joi_1.default.string().optional(),
    tagIds: joi_1.default.array().items(joi_1.default.string()).optional()
});
exports.updateInvoiceSchema = joi_1.default.object({
    title: joi_1.default.string().optional(),
    vendor: joi_1.default.string().optional(),
    client: joi_1.default.string().optional(),
    amount: joi_1.default.number().positive().optional(),
    currency: joi_1.default.string().length(3).optional(),
    date: joi_1.default.date().optional(),
    dueDate: joi_1.default.date().optional(),
    tax: joi_1.default.number().min(0).optional(),
    status: joi_1.default.string().valid('PENDING', 'PAID', 'OVERDUE', 'CANCELLED').optional(),
    description: joi_1.default.string().optional(),
    categoryId: joi_1.default.string().optional(),
    tagIds: joi_1.default.array().items(joi_1.default.string()).optional()
});
exports.createCategorySchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    color: joi_1.default.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});
exports.updateCategorySchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    description: joi_1.default.string().optional(),
    color: joi_1.default.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});
exports.createTagSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    color: joi_1.default.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});
exports.updateTagSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    color: joi_1.default.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: 'Validation error',
                details: error.details.map((detail) => detail.message)
            });
        }
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.js.map