import fs from "fs";
import multer from "multer";
import path from "path";

const uploadDir = path.join(__dirname, "../../src/uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, uploadDir)
    },
    filename:(req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
});


const upload = multer({storage});

export default upload;