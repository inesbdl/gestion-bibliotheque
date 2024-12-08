const authorService = require("../services/authorService");

async function createAuthor(req, res) {
    try {
        req.body.fullname = req.body.firstname + " " + req.body.lastname;
        const author = await authorService.createAuthor(req.body);
        res.json(author);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getAuthorById(req, res) {
    try {
        const id = req.params.id;
        const author = await authorService.getAuthorById(id);
        if(author){
            res.json(author);
        }
        else {
            res.json({"error": `Author ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllAuthors(req, res) {
    try{
        const { offset, limit, firstname, lastname } = req.query;
        const authors = await authorService.getAllAuthors({ offset, limit, firstname, lastname });
        res.json(authors);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedAuthors(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, firstname, lastname } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await authorService.getLimitedAuthors({ offset, limit, firstname, lastname }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += firstname ? `&firstname=${firstname}` : "";
        queryParams += lastname ? `&lastname=${lastname}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.authors, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addBookToAuthor(req, res){
    try {
        const idAuthor = req.params.idAuthor;
        const idBook = req.params.idBook;
        const bookAuthor = await authorService.addBookToAuthor(idBook,idAuthor);
        res.json({ BookAuthor: bookAuthor, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function updateAuthor (req, res){
    try {
        const idAuthor = req.params.idAuthor;
        const author = await authorService.updateAuthor(idAuthor, req.body);
        res.json(author);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteAuthor (req, res){
    try {
        const idAuthor = req.params.idAuthor;
        const author = await authorService.deleteAuthor(idAuthor);
        res.json(author);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createAuthor, getAuthorById, getAllAuthors, getLimitedAuthors, addBookToAuthor, updateAuthor, deleteAuthor }