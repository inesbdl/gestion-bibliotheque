import { Author, Book, Edition, Theme, Type } from "../../models/associations";

export default defineEventHandler((event) => {
    const query = getQuery(event);
    if(query.id && query.id != '') {
        return getBookById(id);
    } else {
        return getAllBooks(query);
    }
})


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