const { Book, Author, Edition, Theme, Type } = require("../models/associations");


async function createBook(book) {
    return await Book.create(book);
}

async function getBookById(id) {
    const book = await Book.findByPk(id, {
        include: [
            {model: Author},
            {model: Edition},
            {model: Theme},
            {model: Type},
        ]
    });
    if (book) {
        return book.toJSON();
    }
    else {
        return null;
    }
}

async function getAllBooks(criterias = {}) {
    const where = {}
    if (criterias.title) {
        where.title = criterias.title;
    }
    if (criterias.isbn) {
        where.isbn = criterias.isbn;
    }
    const books = await Book.findAll({
        where,
        include: [
            {model: Author},
            {model: Edition},
            {model: Theme},
            {model: Type},
        ]
    });
    if(books) {
        return books;
    }
    else {
        return null;
    }
}

async function getLimitedBooks(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.title) {
        where.title = criterias.title;
    }
    if (criterias.isbn) {
        where.isbn = criterias.isbn;
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
            {model: Author},
            {model: Edition},
            {model: Theme},
            {model: Type},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        books: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function addAuthorToBook(idAuthor, bookId) {
    const book = await Book.findByPk(bookId);
    const isAuthor = await Author.findByPk(idAuthor)
    if (isAuthor) {
        // verifier si Book et Author deja associés
        const isAuthorBook = await Book.findAll({ where: { id: bookId }, include: { model: Author, where: { id: idAuthor } } });
        if (isAuthorBook.lenght > 0) {
            return null;
        }
        else {
            return book.addAuthor(idAuthor);
        }
    }
}

async function addThemeToBook(idTheme, bookId) {
    const book = await Book.findByPk(bookId);
    const isTheme = await Theme.findByPk(idTheme)
    if (isTheme) {
        // verifier si Book et Theme deja associés
        const isThemeBook = await Book.findAll({ where: { id: bookId }, include: { model: Theme, where: { id: idTheme } } });
        if (isThemeBook.lenght > 0) {
            return null;
        }
        else {
            return book.addTheme(idTheme);
        }
    }
}

async function updateBook(bookId, updatedData) {
    const book = await Book.findByPk(bookId);
    if (book) {
        if (updatedData.editionId) {
            const edition = await Edition.findByPk(updatedData.editionId);
            if (edition) {
                await book.setEdition(edition);
            } else {
                return { success: false, message: "Edition not found" };
            }
        }

        if (updatedData.typeId) {
            const type = await Type.findByPk(updatedData.typeId);
            if (type) {
                await book.setType(type);
            } else {
                return { success: false, message: "Type not found" };
            }
        }

        if (updatedData.themeIds && Array.isArray(updatedData.themeIds)) {
            const themes = await Theme.findAll({
                where: { id: updatedData.themeIds }
            });

            if (themes.length === updatedData.themeIds.length) {
                await book.setThemes(themes);
            } else {
                return { success: false, message: "One or more Themes not found" };
            }
        }

        if (updatedData.authorIds && Array.isArray(updatedData.authorIds)) {
            const authors = await Author.findAll({
                where: { id: updatedData.authorIds }
            });

            if (authors.length === updatedData.authorIds.length) {
                await book.setAuthors(authors);
            } else {
                return { success: false, message: "One or more Authors not found" };
            }
        }

        return book.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteBook(bookId) {
    const book = await Book.findByPk(bookId);
    if (book) {
        return book.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createBook, getBookById, getAllBooks, getLimitedBooks, addAuthorToBook, addThemeToBook, updateBook, deleteBook }