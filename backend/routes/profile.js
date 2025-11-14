import express from "express";
import User from "../models/User.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------------------
// Multer Setup
// -------------------
const uploadDir = "uploads/profile/";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.userId + "_" + Date.now() + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  },
});

// -------------------
// Get profile
// -------------------
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// -------------------
// Update profile with photo
// -------------------
router.put("/", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const fields = ["name","phone","location","skills","linkedin","github","twitter"];
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update text fields
    fields.forEach(f => {
      if (req.body[f] !== undefined) user[f] = req.body[f];
    });

    // Update photo if uploaded
    if (req.file) {
      // Optionally delete old photo file
      if (user.photoUrl) {
        const oldPath = path.join(uploadDir, path.basename(user.photoUrl));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      user.photoUrl = `${req.protocol}://${req.get("host")}/${uploadDir}${req.file.filename}`;
    }

    await user.save();
    res.json({ msg: "Profile updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating profile", error: err.message });
  }
});

export default router;
