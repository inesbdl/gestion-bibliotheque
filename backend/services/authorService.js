const { Author, Book } = require("../models/associations");


async function createAuthor(author) {
    return await Author.create(author);
}

async function getAuthorById(id) {
    const author = await Author.findByPk(id, {
        include: [
            {model: Book},
        ]
    });
    if (author) {
        return author.toJSON();
    }
    else {
        return null;
    }
}

async function getAllAuthors(criterias = {}) {
    const where = {}
    if (criterias.lastname) {
        where.lastname = criterias.lastname;
    }
    if (criterias.firsname) {
        where.firsname = criterias.firsname;
    }
    const authors = await Author.findAll({
        where,
        include: [
            {model: Book},
        ]
    });
    if(authors) {
        return authors;
    }
    else {
        return null;
    }
}

async function getLimitedAuthors(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.lastname) {
        where.lastname = criterias.lastname;
    }
    if (criterias.firstname) {
        where.firstname = criterias.firstname;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await Author.findAndCountAll({
        where,
        include: [
            {model: Book},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        authors: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function addBookToAuthor(idBook, authorId) {
    const author = await Author.findByPk(authorId);
    const isBook = await Book.findByPk(idBook)
    if (isBook) {
        // verifier si Author et Book deja associés
        const isBookauthor = await Author.findAll({ where: { id: authorId }, include: { model: Book, where: { id: idBook } } });
        if (isBookauthor.lenght > 0) {
            return null;
        }
        else {
            return author.addBook(idBook);
        }
    }
}

async function updateAuthor(authorId, updatedData) {
    const author = await Author.findByPk(authorId);
    if (author) {
        return author.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteAuthor(authorId) {
    const author = await Author.findByPk(authorId);
    if (author) {
        return author.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createAuthor, getAuthorById, getAllAuthors, getLimitedAuthors, addBookToAuthor, updateAuthor, deleteAuthor }