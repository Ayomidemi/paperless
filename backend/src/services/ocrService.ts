import Tesseract from 'tesseract.js';
import pdfParse from 'pdf-parse';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export interface ExtractedData {
  vendor?: string;
  date?: string;
  total?: number;
  tax?: number;
  currency?: string;
  description?: string;
  items?: Array<{
    description: string;
    quantity?: number;
    price?: number;
  }>;
  paymentMethod?: string;
  rawText?: string;
  confidence?: number;
  [key: string]: any; // Index signature for JSON compatibility
}

export class OCRService {
  // Extract text from image using Tesseract
  static async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    try {
      const { data: { text } } = await Tesseract.recognize(
        imageBuffer,
        'eng',
        {
          logger: m => console.log(m)
        }
      );
      return text;
    } catch (error) {
      console.error('Tesseract OCR error:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  // Extract text from PDF
  static async extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
    try {
      const data = await pdfParse(pdfBuffer);
      return data.text;
    } catch (error) {
      console.error('PDF parsing error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }

  // Use OpenAI to parse and structure the extracted text
  static async parseReceiptData(rawText: string): Promise<ExtractedData> {
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

      // Parse the JSON response
      const parsedData = JSON.parse(response);
      
      // Validate and clean the data
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
    } catch (error) {
      console.error('OpenAI parsing error:', error);
      // Fallback to basic text extraction
      return {
        rawText,
        confidence: 0.1
      };
    }
  }

  // Categorize the receipt based on vendor and description
  static async categorizeReceipt(vendor: string, description: string): Promise<string> {
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
    } catch (error) {
      console.error('Categorization error:', error);
      return 'Other';
    }
  }

  // Main method to process a file and extract data
  static async processFile(fileBuffer: Buffer, fileType: string): Promise<ExtractedData> {
    try {
      let rawText: string;

      if (fileType.startsWith('image/')) {
        rawText = await this.extractTextFromImage(fileBuffer);
      } else if (fileType === 'application/pdf') {
        rawText = await this.extractTextFromPDF(fileBuffer);
      } else {
        throw new Error('Unsupported file type');
      }

      if (!rawText || rawText.trim().length === 0) {
        throw new Error('No text could be extracted from the file');
      }

      return await this.parseReceiptData(rawText);
    } catch (error) {
      console.error('File processing error:', error);
      throw error;
    }
  }
}
