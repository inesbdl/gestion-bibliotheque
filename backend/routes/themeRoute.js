const express = require("express");
const router = express.Router()

const themeController = require("../controllers/themeController");

router.get("/", themeController.getAllThemes);
router.get("/limit", themeController.getLimitedThemes);
router.get("/:id", themeController.getThemeById);

router.post("/", themeController.createTheme);
router.post("/bookTheme/:idTheme/:idBook", themeController.addBookToTheme);

router.patch("/update/:idTheme", themeController.updateTheme);

router.delete("/:idTheme", themeController.deleteTheme)

module.exports = router;