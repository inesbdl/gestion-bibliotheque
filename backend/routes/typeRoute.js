const express = require("express");
const router = express.Router()

const typeController = require("../controllers/typeController");

router.get("/", typeController.getAllTypes);
router.get("/limit", typeController.getLimitedTypes);
router.get("/id", typeController.getTypeById);
// router.get("/:id", typeController.getTypeById);

router.post("/", typeController.createType);
router.post("/bookType", typeController.addBookToType);
// router.post("/bookType/:idType/:idBook", typeController.addBookToType);

router.patch("/update", typeController.updateType);
// router.patch("/update/:idType", typeController.updateType);

router.delete("/delete", typeController.deleteType)
// router.delete("/:idType", typeController.deleteType)

module.exports = router;