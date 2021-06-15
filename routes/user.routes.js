// Imports
const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const bruteForceReg = require("../middleware/bruteForceReg.middleware");
const bruteForceLog = require("../middleware/bruteForceLog.middleware");
const { checkUser, requireAuth } = require("../middleware/auth.middleware");

// auth routes
router.post("/register", bruteForceReg, authController.signUp);
router.post("/login", bruteForceLog, authController.login);
router.get("/logout", authController.logout);

// user routes
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUsers);
router.put("/:id", checkUser, requireAuth, userController.updateUser);
router.delete("/:id", checkUser, requireAuth, userController.deleteUser);

// exports
module.exports = router;
