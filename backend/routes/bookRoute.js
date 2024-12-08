const express = require("express");
const router = express.Router()

const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/limit", bookController.getLimitedBooks);
router.get("/:id", bookController.getBookById);

router.post("/", bookController.createBook);
router.post("/bookAuthor/:idBook/:idAuthor", bookController.addAuthorToBook);
router.post("/bookTheme/:idBook/:idTheme", bookController.addThemeToBook);

// router.patch("/update/:idCanard", bookController.updateCanard);

// router.delete("/:idCanard", bookController.deleteCanard)

module.exports = router;