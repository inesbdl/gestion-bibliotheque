const express = require("express");
const router = express.Router()

const editionController = require("../controllers/editionController.cjs");
const { authMiddleware } = require("../middlewares/authMiddleware.cjs");

router.get("/", editionController.getAllEditions);
router.get("/limit", editionController.getLimitedEditions);
router.get("/id", editionController.getEditionById);
// router.get("/:id", editionController.getEditionById);

router.post("/", /*authMiddleware, */editionController.createEdition);
router.post("/bookEdition", editionController.addBookToEdition);
// router.post("/bookEdition/:idEdition/:idBook", editionController.addBookToEdition);

router.patch("/update", /*authMiddleware, */editionController.updateEdition);
// router.patch("/update/:idEdition", editionController.updateEdition);

router.delete("/delete", /*authMiddleware, */editionController.deleteEdition)
// router.delete("/:idEdition", editionController.deleteEdition)

module.exports = router;