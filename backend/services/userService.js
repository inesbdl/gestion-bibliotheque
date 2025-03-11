const { User, Book } = require("../models/associations");


async function createUser(user) {
    return await User.create(user);
}

async function getUserById(id) {
    const user = await User.findByPk(id, {
        include: [
            {model: Book},
        ]
    });
    if (user) {
        return user.toJSON();
    }
    else {
        return null;
    }
}

async function getAllUsers(criterias = {}) {
    const where = {}
    if (criterias.lastname) {
        where.lastname = criterias.lastname;
    }
    if (criterias.firstname) {
        where.firstname = criterias.firstname;
    }
    const users = await User.findAll({
        where,
        include: [
            {model: Book},
        ]
    });
    if(users) {
        return users;
    }
    else {
        return null;
    }
}

async function getLimitedUsers(criterias = {}, pageId, itemsPerPage) {
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
    const { count, rows } = await User.findAndCountAll({
        where,
        include: [
            {model: Book},
        ],
        limit: itemsPerPage,
        offset,
    });
    return {
        users: rows,
        count: count,
        hasMore: count > offset + rows.length
    };
}

async function addBookToUser(idBook, userId) {
    const user = await User.findByPk(userId);
    const isBook = await Book.findByPk(idBook)
    if (isBook) {
        // verifier si User et Book deja associés
        const isBookuser = await User.findAll({ where: { id: userId }, include: { model: Book, where: { id: idBook } } });
        if (isBookuser.lenght > 0) {
            return null;
        }
        else {
            return user.addBook(idBook);
        }
    }
}

async function updateUser(userId, updatedData) {
    const user = await User.findByPk(userId);
    if (user) {
        return user.update(updatedData);
    }
    else {
        return null;
    }
}

async function deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (user) {
        return user.destroy();
    }
    else {
        return null;
    }
}

module.exports = { createUser, getUserById, getAllUsers, getLimitedUsers, addBookToUser, updateUser, deleteUser }