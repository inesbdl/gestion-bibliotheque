const bookService = require("../services/bookService");

async function createBook(req, res) {
    try {
        const book = await bookService.createBook(req.body);
        res.json(book);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getBookById(req, res) {
    try {
        const id = req.query.id;
        const book = await bookService.getBookById(id);
        if(book){
            res.json(book);
        }
        else {
            res.json({"error": `Book ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllBooks(req, res) {
    try{
        const { offset, limit, title, isbn } = req.query;
        const books = await bookService.getAllBooks({ offset, limit, title, isbn });
        res.json(books);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedBooks(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, title, isbn } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await bookService.getLimitedBooks({ offset, limit, title, isbn }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += title ? `&title=${title}` : "";
        queryParams += isbn ? `&isbn=${isbn}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.books, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addAuthorToBook(req, res){
    try {
        const idBook = req.query.idBook;
        const idAuthor = req.query.idAuthor;
        const authorBook = await bookService.addAuthorToBook(idAuthor,idBook);
        res.json({ authorBook: authorBook, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function addThemeToBook(req, res){
    try {
        const idBook = req.query.idBook;
        const idTheme = req.query.idTheme;
        const themeBook = await bookService.addThemeToBook(idTheme,idBook);
        res.json({ themeBook: themeBook, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function addEditionToBook(req, res){
    try {
        const idBook = req.query.idBook;
        const idEdition = req.query.idEdition;
        const themeBook = await bookService.addEditionToBook(idEdition,idBook);
        res.json({ themeBook: themeBook, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function updateBook (req, res){
    try {
        const idBook = req.query.idBook;
        const book = await bookService.updateBook(idBook, req.body);
        res.json(book);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteBook (req, res){
    try {
        const idBook = req.query.idBook;
        const book = await bookService.deleteBook(idBook);
        res.json(book);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createBook, getBookById, getAllBooks, getLimitedBooks, addAuthorToBook, addThemeToBook, addEditionToBook, updateBook, deleteBook }