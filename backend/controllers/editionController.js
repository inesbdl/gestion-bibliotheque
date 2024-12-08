const editionService = require("../services/editionService");

async function createEdition(req, res) {
    try {
        const edition = await editionService.createEdition(req.body);
        res.json(edition);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getEditionById(req, res) {
    try {
        const id = req.params.id;
        const edition = await editionService.getEditionById(id);
        if(edition){
            res.json(edition);
        }
        else {
            res.json({"error": `Edition ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllEditions(req, res) {
    try{
        const { offset, limit, edition } = req.query;
        const editions = await editionService.getAllEditions({ offset, limit, edition });
        res.json(editions);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedEditions(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, edition } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await editionService.getLimitedEditions({ offset, limit, edition }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += edition ? `&edition=${edition}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.editions, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addBookToEdition(req, res){
    try {
        const idEdition = req.params.idEdition;
        const idBook = req.params.idBook;
        const bookEdition = await editionService.addBookToEdition(idBook,idEdition);
        res.json({ BookEdition: bookEdition, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function updateEdition (req, res){
    try {
        const idEdition = req.params.idEdition;
        const edition = await editionService.updateEdition(idEdition, req.body);
        res.json(edition)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteEdition (req, res){
    try {
        const idEdition = req.params.idEdition;
        const edition = await editionService.deleteEdition(idEdition);
        res.json(edition);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createEdition, getEditionById, getAllEditions, getLimitedEditions, addBookToEdition, updateEdition, deleteEdition }