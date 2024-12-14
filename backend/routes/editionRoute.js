const express = require("express");
const router = express.Router()

const editionController = require("../controllers/editionController");

router.get("/", editionController.getAllEditions);
router.get("/limit", editionController.getLimitedEditions);
router.get("/id", editionController.getEditionById);
// router.get("/:id", editionController.getEditionById);

router.post("/", editionController.createEdition);
router.post("/bookEdition", editionController.addBookToEdition);
// router.post("/bookEdition/:idEdition/:idBook", editionController.addBookToEdition);

router.patch("/update", editionController.updateEdition);
// router.patch("/update/:idEdition", editionController.updateEdition);

router.delete("/delete", editionController.deleteEdition)
// router.delete("/:idEdition", editionController.deleteEdition)

module.exports = router;