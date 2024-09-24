import multer from "multer";
import path from "path";

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
  },
});

// Create the multer upload instance for multiple files
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // No error, proceed with file upload
    } else {
      cb(new Error("Unsupported file type"));
    }
  },
});

// Export the upload instance for multiple files (10 files limit)
export const uploadFiles = upload.array("files", 10); // Adjust the field name to "files" and limit to 10
