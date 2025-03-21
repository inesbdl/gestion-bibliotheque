const { Book, Author, Edition, Theme, Type } = require("../models/associations");
const { Op } = require("sequelize"); 


async function createBook(bookData) {
    // Create book without MtM associations
    const book = await Book.create({
        title: bookData.title,
        nbAvailable: bookData.nbAvailable,
        nbShared: bookData.nbShared,
        isbn: bookData.isbn,
        owned: bookData.owned,
        typeId: bookData.type.value,
        editionId: bookData.edition.value
    });

    // Associate authors
    if (bookData.authors && bookData.authors.length > 0) {
        const authorIds = bookData.authors.map(author => author.value);
        await book.setAuthors(authorIds);
    }

    // Associate themes
    if (bookData.themes && bookData.themes.length > 0) {
        const themeIds = bookData.themes.map(theme => theme.value);
        await book.setThemes(themeIds);
    }

    return book;
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

async function addEditionToBook(idEdition, bookId) {
    const book = await Book.findByPk(bookId);
    const isEdition = await Edition.findByPk(idEdition)
    if (isEdition) {
        // verifier si Book et Edition deja associés
        const isEditionBook = await Book.findAll({ where: { id: bookId }, include: { model: Edition, where: { id: idEdition } } });
        if (isEditionBook.lenght > 0) {
            return null;
        }
        else {
            return book.addEdition(idEdition);
        }
    }
}

async function updateBook(bookId, updatedData) {
    try {
        const book = await Book.findByPk(bookId, {
            include: [
                {model: Author},
                {model: Edition},
                {model: Theme},
                {model: Type},
            ]
        });

        if (!book) {
            return { success: false, message: "Book not found" };
        }

        if (updatedData.editionId) {
            const edition = await Edition.findByPk(updatedData.editionId.id);
            if (edition) {
                await book.setEdition(edition);
            } else {
                return { success: false, message: "Edition not found" };
            }
        }

        if (updatedData.typeId) {
            const type = await Type.findByPk(updatedData.typeId.id);
            if (type) {
                await book.setType(type);
            } else {
                return { success: false, message: "Type not found" };
            }
        }

        if (updatedData.themeIds && Array.isArray(updatedData.themeIds)) {
            const validThemeIds = updatedData.themeIds
                .filter(theme => theme && theme.id)
                .map(theme => theme.id);

            if (validThemeIds.length > 0) {
                const themes = await Theme.findAll({ where: { id: { [Op.in]: validThemeIds } } });

                if (themes.length === validThemeIds.length) {
                    await book.setThemes(themes);
                } else {
                    return { success: false, message: "One or more Themes not found" };
                }
            }
        }

        if (updatedData.authorIds && Array.isArray(updatedData.authorIds)) {
            const validAuthorIds = updatedData.authorIds
                .filter(author => author && author.id)
                .map(author => author.id);
            if (validAuthorIds.length > 0) {
                const authors = await Author.findAll({ where: { id: { [Op.in]: validAuthorIds } } });

                if (authors.length === validAuthorIds.length) {
                    await book.setAuthors(authors);
                } else {
                    return { success: false, message: "One or more Authors not found" };
                }
            }
        }


        await book.update({
            title: updatedData.title,
            isbn: updatedData.isbn,
            nbAvailable: updatedData.nbAvailable,
            nbShared: updatedData.nbShared,
            owned: updatedData.owned,
        });

        return { success: true, message: "Book updated successfully", book };
    } catch (error) {
        console.error("Error updating book:", error);
        return { success: false, message: "Internal Server Error" };
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

module.exports = { createBook, getBookById, getAllBooks, getLimitedBooks, addAuthorToBook, addThemeToBook, addEditionToBook, updateBook, deleteBook }