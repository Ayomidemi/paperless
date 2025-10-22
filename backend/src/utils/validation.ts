import Joi from 'joi';

// User validation schemas
export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Receipt validation schemas
export const createReceiptSchema = Joi.object({
  title: Joi.string().optional(),
  vendor: Joi.string().optional(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().length(3).default('USD'),
  date: Joi.date().required(),
  tax: Joi.number().min(0).optional(),
  paymentMethod: Joi.string().optional(),
  description: Joi.string().optional(),
  categoryId: Joi.string().optional(),
  tagIds: Joi.array().items(Joi.string()).optional()
});

export const updateReceiptSchema = Joi.object({
  title: Joi.string().optional(),
  vendor: Joi.string().optional(),
  amount: Joi.number().positive().optional(),
  currency: Joi.string().length(3).optional(),
  date: Joi.date().optional(),
  tax: Joi.number().min(0).optional(),
  paymentMethod: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string().valid('PENDING', 'VERIFIED', 'DISPUTED').optional(),
  categoryId: Joi.string().optional(),
  tagIds: Joi.array().items(Joi.string()).optional()
});

// Invoice validation schemas
export const createInvoiceSchema = Joi.object({
  title: Joi.string().optional(),
  vendor: Joi.string().optional(),
  client: Joi.string().optional(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().length(3).default('USD'),
  date: Joi.date().required(),
  dueDate: Joi.date().optional(),
  tax: Joi.number().min(0).optional(),
  description: Joi.string().optional(),
  categoryId: Joi.string().optional(),
  tagIds: Joi.array().items(Joi.string()).optional()
});

export const updateInvoiceSchema = Joi.object({
  title: Joi.string().optional(),
  vendor: Joi.string().optional(),
  client: Joi.string().optional(),
  amount: Joi.number().positive().optional(),
  currency: Joi.string().length(3).optional(),
  date: Joi.date().optional(),
  dueDate: Joi.date().optional(),
  tax: Joi.number().min(0).optional(),
  status: Joi.string().valid('PENDING', 'PAID', 'OVERDUE', 'CANCELLED').optional(),
  description: Joi.string().optional(),
  categoryId: Joi.string().optional(),
  tagIds: Joi.array().items(Joi.string()).optional()
});

// Category validation schemas
export const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});

// Tag validation schemas
export const createTagSchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});

export const updateTagSchema = Joi.object({
  name: Joi.string().optional(),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});

// Validation middleware
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map((detail: any) => detail.message)
      });
    }
    next();
  };
};
