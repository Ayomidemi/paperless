import AWS from 'aws-sdk';
import multer from 'multer';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Configure multer for memory storage
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (JPEG, PNG, GIF) and PDF files are allowed'));
    }
  }
});

export const uploadToS3 = async (file: Express.Multer.File, folder: string = 'uploads'): Promise<string> => {
  try {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${randomUUID()}.${fileExtension}`;

    // For images, optimize with Sharp before uploading
    let processedBuffer = file.buffer;
    if (file.mimetype.startsWith('image/')) {
      processedBuffer = await sharp(file.buffer)
        .resize(1200, 1200, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 85 })
        .toBuffer();
    }

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: processedBuffer,
      ContentType: file.mimetype,
      ACL: 'private' // Make files private by default
    };

    const result = await s3.upload(uploadParams).promise();
    return result.Location;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('Failed to upload file');
  }
};

export const deleteFromS3 = async (fileUrl: string): Promise<void> => {
  try {
    const url = new URL(fileUrl);
    const key = url.pathname.substring(1); // Remove leading slash

    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key
    };

    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    console.error('S3 delete error:', error);
    throw new Error('Failed to delete file');
  }
};

export const getSignedUrl = async (fileUrl: string, expiresIn: number = 3600): Promise<string> => {
  try {
    const url = new URL(fileUrl);
    const key = url.pathname.substring(1);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
      Expires: expiresIn
    };

    return s3.getSignedUrl('getObject', params);
  } catch (error) {
    console.error('S3 signed URL error:', error);
    throw new Error('Failed to generate signed URL');
  }
};
