const { Type, Book } = require("../models/associations");


async function createType(type) {
    return await Type.create(type);
}

async function getTypeById(id) {
    const type = await Type.findByPk(id, {
        include: [
            {model: Book},
        ]
    });
    if (type) {
        return type.toJSON();
    }
    else {
        return null;
    }
}

async function getAllTypes(criterias = {}) {
    const where = {}
    if (criterias.type) {
        where.type = criterias.type;
    }
    const types = await Type.findAll({
        where,
        include: [
            {model: Book},
        ]
    });
    if(types) {
        return types;
    }
    else {
        return null;
    }
}

async function getLimitedTypes(criterias = {}, pageId, itemsPerPage) {
    const where = {};
    const offset = (pageId - 1) * itemsPerPage;
    if (criterias.type) {
        where.type = criterias.type;
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
        types: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function addBookToType(idBook, typeId) {
    const type = await Type.findByPk(typeId);
    const isBook = await Book.findByPk(idBook)
    if (isBook) {
        // verifier si Type et Book deja associés
        const isBookType = await Type.findAll({ where: { id: typeId }, include: { model: Book, where: { id: idBook } } });
        if (isBookType.lenght > 0) {
            return null;
        }
        else {
            return type.addBook(idBook);
        }
    }
}

async function updateType(typeId, updatedData) {
    const type = await Type.findByPk(typeId);
    if (type) {
        return type.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteType(typeId) {
    const type = await Type.findByPk(typeId);
    if (type) {
        return type.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createType, getTypeById, getAllTypes, getLimitedTypes, addBookToType, updateType, deleteType }