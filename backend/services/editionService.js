const { Edition, Book } = require("../models/associations");


async function createEdition(edition) {
    return await Edition.create(edition);
}

async function getEditionById(id) {
    const edition = await Edition.findByPk(id, {
        include: [
            {model: Book},
        ]
    });
    if (edition) {
        return edition.toJSON();
    }
    else {
        return null;
    }
}

async function getAllEditions(criterias = {}) {
    const where = {}
    if (criterias.edition) {
        where.edition = criterias.edition;
    }
    const editions = await Edition.findAll({
        where,
        include: [
            {model: Book},
        ]
    });
    if(editions) {
        return editions;
    }
    else {
        return null;
    }
}

async function getLimitedEditions(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.edition) {
        where.edition = criterias.edition;
    }
    if (criterias.offset) {
        offset = criterias.offset;
    }
    if (criterias.limit) {
        limit = criterias.limit;
    }
    const { count, rows } = await Edition.findAndCountAll({
        where,
        include: [
            {model: Book},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        editions: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function addBookToEdition(idBook, editionId) {
    const edition = await Edition.findByPk(editionId);
    const isBook = await Book.findByPk(idBook)
    if (isBook) {
        // verifier si Edition et Book deja associés
        const isBookEdition = await Edition.findAll({ where: { id: editionId }, include: { model: Book, where: { id: idBook } } });
        if (isBookEdition.lenght > 0) {
            return null;
        }
        else {
            return edition.addBook(idBook);
        }
    }
}

async function updateEdition(editionId, updatedData) {
    const edition = await Edition.findByPk(editionId);
    if (edition) {
        return edition.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteEdition(editionId) {
    const edition = await Edition.findByPk(editionId);
    if (edition) {
        return edition.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createEdition, getEditionById, getAllEditions, getLimitedEditions, addBookToEdition, updateEdition, deleteEdition }