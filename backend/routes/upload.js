// Imports
const router = require("express").Router();
const uploadController = require("../controllers/upload");
const multer = require("multer");
const upload = multer();
const { checkUser, requireAuth } = require("../middleware/auth");

// routes
router.post(
  "/upload",
  upload.single("file"),
  checkUser,
  requireAuth,
  uploadController.uploadProfil
);

// exports
module.exports = router;
