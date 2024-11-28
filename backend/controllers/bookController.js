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
        const id = req.params.id;
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
        const { offset, limit, nom, age, titre, genre, poids, vitesse_moy, vitesse_max, nb_participations, nb_victoires} = req.query;
        const books = await bookService.getAllBooks({ offset, limit, nom, age, titre, genre, poids, vitesse_moy, vitesse_max, nb_participations, nb_victoires});
        res.json(books);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedBooks(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, nom, age, titre, genre, poids, vitesse_moy, vitesse_max, nb_participations, nb_victoires } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await bookService.getLimitedBooks({ offset, limit, nom, age, titre, genre, poids, vitesse_moy, vitesse_max, nb_participations, nb_victoires }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += genre ? `&genre=${genre}` : "";
        queryParams += nom ? `&nom=${nom}` : "";
        queryParams += titre ? `&titre=${titre}` : "";
        queryParams += age ? `&age=${age}` : "";
        queryParams += poids ? `&poids=${poids}` : "";
        queryParams += vitesse_moy ? `&vitesse_moy=${vitesse_moy}` : "";
        queryParams += vitesse_max ? `&vitesse_max=${vitesse_max}` : "";
        queryParams += nb_participations ? `&nb_participations=${nb_participations}` : "";
        queryParams += nb_victoires ? `&nb_victoires=${nb_victoires}` : "";

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
        const idBook = req.params.idBook;
        const idAuthor = req.params.idAuthor;
        const authorBook = await bookService.addAuthorToBook(idAuthor,idBook);
        res.json({ authorBook: authorBook, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}