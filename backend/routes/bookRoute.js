const express = require("express");
const router = express.Router()

const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/limit", bookController.getLimitedBooks);
router.get("/id", bookController.getBookById);  //id ou idBook en query ??????
// router.get("/:id", bookController.getBookById);

router.post("/", bookController.createBook);
router.post("/bookAuthor", bookController.addAuthorToBook);
// router.post("/bookAuthor/:idBook/:idAuthor", bookController.addAuthorToBook);
router.post("/bookTheme", bookController.addThemeToBook);
// router.post("/bookTheme/:idBook/:idTheme", bookController.addThemeToBook);
router.post("/bookEdition", bookController.addEditionToBook);
// router.post("/bookEdition/:idBook/:idEdition", bookController.addEditionToBook);

router.patch("/update", bookController.updateBook);
// router.patch("/update/:idBook", bookController.updateBook);

router.delete("/delete", bookController.deleteBook);
// router.delete("/:idBook", bookController.deleteBook);

module.exports = router;