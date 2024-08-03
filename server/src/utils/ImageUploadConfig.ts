import express, { Request } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

//check if the file directory exists
const uploadDir = path.join(__dirname, 'image_upload');
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive: true});
};


//configure multer
const storage = multer.diskStorage({
    destination: (req:Request, file, callback) => {
        callback(null, uploadDir);
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
});

const upload = multer({ storage })

export default upload;
