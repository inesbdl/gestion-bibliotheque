const { Book, Author } = require("../../../backend/models/associations");

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const query = getQuery(event);
    if((query.bookId && query.bookId!='') && (query.idAuthor && query.idAuthor!='')) {
        return addAuthorToBook(query.idAuthor, query.bookId);
    } else {
        return createBook(body);
    }
})

async function createBook(book) {
    return await Book.create(book);
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