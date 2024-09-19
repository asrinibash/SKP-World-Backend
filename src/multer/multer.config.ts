import multer from "multer";
import path from "path";

// Custom storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `${uniqueSuffix}`);
  },
});

const upload = multer({ storage });

export default upload;
