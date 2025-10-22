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
    [key: string]: any;
}
export declare class OCRService {
    static extractTextFromImage(imageBuffer: Buffer): Promise<string>;
    static extractTextFromPDF(pdfBuffer: Buffer): Promise<string>;
    static parseReceiptData(rawText: string): Promise<ExtractedData>;
    static categorizeReceipt(vendor: string, description: string): Promise<string>;
    static processFile(fileBuffer: Buffer, fileType: string): Promise<ExtractedData>;
}
//# sourceMappingURL=ocrService.d.ts.map