"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OCRService = void 0;
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY
});
class OCRService {
    static async extractTextFromImage(imageBuffer) {
        try {
            const { data: { text } } = await tesseract_js_1.default.recognize(imageBuffer, 'eng', {
                logger: m => console.log(m)
            });
            return text;
        }
        catch (error) {
            console.error('Tesseract OCR error:', error);
            throw new Error('Failed to extract text from image');
        }
    }
    static async extractTextFromPDF(pdfBuffer) {
        try {
            const data = await (0, pdf_parse_1.default)(pdfBuffer);
            return data.text;
        }
        catch (error) {
            console.error('PDF parsing error:', error);
            throw new Error('Failed to extract text from PDF');
        }
    }
    static async parseReceiptData(rawText) {
        try {
            const prompt = `
        Parse the following receipt/invoice text and extract structured data. 
        Return a JSON object with the following fields:
        - vendor: The name of the business/vendor
        - date: The date in YYYY-MM-DD format
        - total: The total amount as a number
        - tax: The tax amount as a number (if present)
        - currency: The currency code (USD, EUR, etc.)
        - items: Array of items with description, quantity, and price
        - paymentMethod: How the payment was made (cash, card, etc.)
        - confidence: A number between 0-1 indicating confidence in the extraction

        Raw text:
        ${rawText}

        Return only valid JSON, no additional text.
      `;
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert at parsing receipt and invoice data. Extract structured information accurately and return only valid JSON."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.1,
                max_tokens: 1000
            });
            const response = completion.choices[0]?.message?.content;
            if (!response) {
                throw new Error('No response from OpenAI');
            }
            const parsedData = JSON.parse(response);
            return {
                vendor: parsedData.vendor || undefined,
                date: parsedData.date || undefined,
                total: parsedData.total ? parseFloat(parsedData.total) : undefined,
                tax: parsedData.tax ? parseFloat(parsedData.tax) : undefined,
                currency: parsedData.currency || 'USD',
                items: parsedData.items || [],
                paymentMethod: parsedData.paymentMethod || undefined,
                rawText,
                confidence: parsedData.confidence || 0.5
            };
        }
        catch (error) {
            console.error('OpenAI parsing error:', error);
            return {
                rawText,
                confidence: 0.1
            };
        }
    }
    static async categorizeReceipt(vendor, description) {
        try {
            const prompt = `
        Categorize this receipt into one of these categories:
        - Office Supplies
        - Travel & Transport
        - Meals & Entertainment
        - Utilities
        - Healthcare
        - Groceries
        - Professional Services
        - Equipment & Technology
        - Marketing & Advertising
        - Other

        Vendor: ${vendor}
        Description: ${description}

        Return only the category name.
      `;
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.1,
                max_tokens: 50
            });
            return completion.choices[0]?.message?.content?.trim() || 'Other';
        }
        catch (error) {
            console.error('Categorization error:', error);
            return 'Other';
        }
    }
    static async processFile(fileBuffer, fileType) {
        try {
            let rawText;
            if (fileType.startsWith('image/')) {
                rawText = await this.extractTextFromImage(fileBuffer);
            }
            else if (fileType === 'application/pdf') {
                rawText = await this.extractTextFromPDF(fileBuffer);
            }
            else {
                throw new Error('Unsupported file type');
            }
            if (!rawText || rawText.trim().length === 0) {
                throw new Error('No text could be extracted from the file');
            }
            return await this.parseReceiptData(rawText);
        }
        catch (error) {
            console.error('File processing error:', error);
            throw error;
        }
    }
}
exports.OCRService = OCRService;
//# sourceMappingURL=ocrService.js.map