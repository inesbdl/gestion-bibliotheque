const express = require("express");
const router = express.Router()

const authorController = require("../controllers/authorController");

router.get("/", authorController.getAllAuthors);
router.get("/limit", authorController.getLimitedAuthors);
router.get("/:id", authorController.getAuthorById);

router.post("/", authorController.createAuthor);
router.post("/bookAuthor/:idAuthor/:idBook", authorController.addBookToAuthor);

// router.patch("/update/:idAuthor", authorController.updateAuthor);

// router.delete("/:idAuthor", authorController.deleteAuthor)

module.exports = router;