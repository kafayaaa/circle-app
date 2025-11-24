import multer from "multer";
import path from "path";

const filename = (req: any, file: any, cb: any) => {
  const name = file.originalname.split(" ").join("_");
  const extension = path.extname(file.originalname);
  cb(null, name + Date.now() + extension);
};

// Storage config
const thread_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/threads"); // folder tujuan
  },
  filename,
});

const profile_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles"); // folder tujuan
  },
  filename,
});

const reply_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/replies"); // folder tujuan
  },
  filename,
});

// File filter (optional)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, png, jpeg allowed!"), false);
  }
};

// Limit ukuran file (opsional)
const limits = {
  fileSize: 2 * 1024 * 1024, // 2MB
};

export const upload_thread = multer({
  storage: thread_storage,
  fileFilter,
  limits,
});
export const upload_profile = multer({
  storage: profile_storage,
  fileFilter,
  limits,
});
export const upload_reply = multer({
  storage: reply_storage,
  fileFilter,
  limits,
});
