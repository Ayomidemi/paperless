import multer from 'multer';
export declare const upload: multer.Multer;
export declare const uploadToS3: (file: Express.Multer.File, folder?: string) => Promise<string>;
export declare const deleteFromS3: (fileUrl: string) => Promise<void>;
export declare const getSignedUrl: (fileUrl: string, expiresIn?: number) => Promise<string>;
//# sourceMappingURL=fileUpload.d.ts.map