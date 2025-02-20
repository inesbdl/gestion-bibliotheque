const express = require("express");
const router = express.Router()

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/limit", userController.getLimitedUsers);
router.get("/id", userController.getUserById);
// router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);
router.post("/bookUser", userController.addBookToUser);
// router.post("/bookUser/:idUser/:idBook", userController.addBookToUser);

router.patch("/update", userController.updateUser);
// router.patch("/update/:idUser", userController.updateUser);

router.delete("/delete", userController.deleteUser)
// router.delete("/:idUser", userController.deleteUser)

module.exports = router;