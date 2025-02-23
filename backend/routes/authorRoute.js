const express = require("express");
const router = express.Router()

const authorController = require("../controllers/authorController");

router.get("/", authorController.getAllAuthors);
router.get("/limit", authorController.getLimitedAuthors);
router.get("/id", authorController.getAuthorById);
// router.get("/:id", authorController.getAuthorById);

router.post("/", authorController.createAuthor);
router.post("/bookAuthor", authorController.addBookToAuthor);
// router.post("/bookAuthor/:idAuthor/:idBook", authorController.addBookToAuthor);

router.patch("/update", authorController.updateAuthor);
// router.patch("/update/:idAuthor", authorController.updateAuthor);

router.delete("/delete", authorController.deleteAuthor)
// router.delete("/:idAuthor", authorController.deleteAuthor)

module.exports = router;