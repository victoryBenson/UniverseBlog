import multer from "multer";
import dotenv from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Request } from "express";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'blog-images',
    //   format: async (req:Request, file: any) => 'png', // Optional - auto-select format (e.g., png, jpg)
      public_id: (req:Request, file: any) => file.originalname.split('.')[0], // Set file name
    } as any,
  });

const upload = multer({storage})

export default upload;