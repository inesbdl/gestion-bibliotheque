const { Theme, Book } = require("../models/associations");


async function createTheme(theme) {
    return await Theme.create(theme);
}

async function getThemeById(id) {
    const theme = await Theme.findByPk(id, {
        include: [
            {model: Book},
        ]
    });
    if (theme) {
        return theme.toJSON();
    }
    else {
        return null;
    }
}

async function getAllThemes(criterias = {}) {
    const where = {}
    if (criterias.theme) {
        where.theme = criterias.theme;
    }
    const themes = await Theme.findAll({
        where,
        include: [
            {model: Book},
        ]
    });
    if(themes) {
        return themes;
    }
    else {
        return null;
    }
}

async function getLimitedThemes(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.theme) {
        where.theme = criterias.theme;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await Book.findAndCountAll({
        where,
        include: [
            {model: Book},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        themes: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function addBookToTheme(idBook, themeId) {
    const theme = await Theme.findByPk(themeId);
    const isBook = await Book.findByPk(idBook)
    if (isBook) {
        // verifier si Theme et Book deja associés
        const isBookTheme = await Theme.findAll({ where: { id: themeId }, include: { model: Book, where: { id: idBook } } });
        if (isBookTheme.lenght > 0) {
            return null;
        }
        else {
            return theme.addBook(idBook);
        }
    }
}

module.exports = { createTheme, getThemeById, getAllThemes, getLimitedThemes, addBookToTheme, }