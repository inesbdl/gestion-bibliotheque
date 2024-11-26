const { Book } = require("../../models/associations");

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return createBook(body);
})

async function createBook(book) {
    return await Book.create(book);
}