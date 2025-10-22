"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedUrl = exports.deleteFromS3 = exports.uploadToS3 = exports.upload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const crypto_1 = require("crypto");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error('Only images (JPEG, PNG, GIF) and PDF files are allowed'));
        }
    }
});
const uploadToS3 = async (file, folder = 'uploads') => {
    try {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${folder}/${(0, crypto_1.randomUUID)()}.${fileExtension}`;
        let processedBuffer = file.buffer;
        if (file.mimetype.startsWith('image/')) {
            processedBuffer = await (0, sharp_1.default)(file.buffer)
                .resize(1200, 1200, {
                fit: 'inside',
                withoutEnlargement: true
            })
                .jpeg({ quality: 85 })
                .toBuffer();
        }
        const uploadParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: processedBuffer,
            ContentType: file.mimetype,
            ACL: 'private'
        };
        const result = await s3.upload(uploadParams).promise();
        return result.Location;
    }
    catch (error) {
        console.error('S3 upload error:', error);
        throw new Error('Failed to upload file');
    }
};
exports.uploadToS3 = uploadToS3;
const deleteFromS3 = async (fileUrl) => {
    try {
        const url = new URL(fileUrl);
        const key = url.pathname.substring(1);
        const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key
        };
        await s3.deleteObject(deleteParams).promise();
    }
    catch (error) {
        console.error('S3 delete error:', error);
        throw new Error('Failed to delete file');
    }
};
exports.deleteFromS3 = deleteFromS3;
const getSignedUrl = async (fileUrl, expiresIn = 3600) => {
    try {
        const url = new URL(fileUrl);
        const key = url.pathname.substring(1);
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Expires: expiresIn
        };
        return s3.getSignedUrl('getObject', params);
    }
    catch (error) {
        console.error('S3 signed URL error:', error);
        throw new Error('Failed to generate signed URL');
    }
};
exports.getSignedUrl = getSignedUrl;
//# sourceMappingURL=fileUpload.js.map