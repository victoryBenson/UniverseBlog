import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,params: {
    folder: 'blog_images',
    format: async (req:Request, file:any) => 'png',
    public_id: (req:Request, file: any) => file.originalname.split('.')[0],
  } as any,
});

export const upload = multer({ storage });
