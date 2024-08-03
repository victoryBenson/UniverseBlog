// import express, { Request, Response } from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const app = express();
// const port = process.env.PORT || 3000;

// // Ensure the uploads directory exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Configure multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// // Middleware to parse JSON
// app.use(express.json());

// // Upload route
// app.post('/upload', upload.single('image'), (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }
//   res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${req.file.filename}` });
// });

// // Serve static files from the uploads directory
// app.use('/uploads', express.static(uploadDir));

// // Fetch image route
// app.get('/image/:filename', (req: Request, res: Response) => {
//   const filename = req.params.filename;
//   const filePath = path.join(uploadDir, filename);

//   if (!fs.existsSync(filePath)) {
//     return res.status(404).json({ message: 'File not found' });
//   }

//   res.sendFile(filePath);
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
