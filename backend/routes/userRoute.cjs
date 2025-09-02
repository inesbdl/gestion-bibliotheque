const express = require("express");
const router = express.Router()
const rateLimit = require("express-rate-limit");

const userController = require("../controllers/userController.cjs");
const { authMiddleware } = require("../middlewares/authMiddleware.cjs");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 essais
    message: { message: "Too many login attempts. Try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});


router.get("/", userController.getAllUsers);
router.get("/limit", userController.getLimitedUsers);
router.get("/id", userController.getUserById);
router.get("/currentUser", authMiddleware, userController.getCurrentUser);
// router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);
router.post("/bookUser", authMiddleware, userController.addBookToUser);
// router.post("/bookUser/:idUser/:idBook", userController.addBookToUser);
router.post("/register", userController.registerUser);
router.post("/login", loginLimiter, userController.loginUser);


router.patch("/update", authMiddleware, userController.updateUser);
// router.patch("/update/:idUser", userController.updateUser);

router.delete("/delete", userController.deleteUser)
// router.delete("/:idUser", userController.deleteUser)
router.delete('/logout', userController.logoutUser)
router.delete('/removeBookUser', authMiddleware, userController.removeBookFromUser)

module.exports = router;