import Joi from 'joi';
export declare const registerSchema: Joi.ObjectSchema<any>;
export declare const loginSchema: Joi.ObjectSchema<any>;
export declare const createReceiptSchema: Joi.ObjectSchema<any>;
export declare const updateReceiptSchema: Joi.ObjectSchema<any>;
export declare const createInvoiceSchema: Joi.ObjectSchema<any>;
export declare const updateInvoiceSchema: Joi.ObjectSchema<any>;
export declare const createCategorySchema: Joi.ObjectSchema<any>;
export declare const updateCategorySchema: Joi.ObjectSchema<any>;
export declare const createTagSchema: Joi.ObjectSchema<any>;
export declare const updateTagSchema: Joi.ObjectSchema<any>;
export declare const validate: (schema: Joi.ObjectSchema) => (req: any, res: any, next: any) => any;
//# sourceMappingURL=validation.d.ts.map