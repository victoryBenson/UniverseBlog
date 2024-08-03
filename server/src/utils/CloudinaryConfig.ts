import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_API_KEY!,
  api_secret: process.env.CLOUD_API_SECRET!,
});

console.log(process.env.CLOUD_NAME!)

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog_images',
    format: async (req:Request, file:any) => 'png',
    public_id: (req:Request, file: any) => file.originalname.split('.')[0],
  } as any,
});

const upload = multer({ storage });
