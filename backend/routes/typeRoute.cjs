const express = require("express");
const router = express.Router()

const typeController = require("../controllers/typeController.cjs");
const { authMiddleware } = require("../middlewares/authMiddleware.cjs");

router.get("/", typeController.getAllTypes);
router.get("/limit", typeController.getLimitedTypes);
router.get("/id", typeController.getTypeById);
// router.get("/:id", typeController.getTypeById);

router.post("/", /*authMiddleware, */typeController.createType);
router.post("/bookType", typeController.addBookToType);
// router.post("/bookType/:idType/:idBook", typeController.addBookToType);

router.patch("/update", /*authMiddleware, */typeController.updateType);
// router.patch("/update/:idType", typeController.updateType);

router.delete("/delete", /*authMiddleware, */typeController.deleteType)
// router.delete("/:idType", typeController.deleteType)

module.exports = router;