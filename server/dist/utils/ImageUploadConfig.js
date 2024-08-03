"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
//check if the file directory exists
const uploadDir = path_1.default.join(__dirname, 'image_upload');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
;
//configure multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
