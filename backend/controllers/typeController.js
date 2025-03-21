const typeService = require("../services/typeService");

async function createType(req, res) {
    try {
        const type = await typeService.createType(req.body);
        res.json(type);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getTypeById(req, res) {
    try {
        const id = req.query.id;
        const type = await typeService.getTypeById(id);
        if(type){
            res.json(type);
        }
        else {
            res.json({"error": `Type ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllTypes(req, res) {
    try{
        const { offset, limit, type } = req.query;
        const types = await typeService.getAllTypes({ offset, limit, type });
        res.json(types);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedTypes(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, type } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await typeService.getLimitedTypes({ offset, limit, type }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += type ? `&type=${type}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.types, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addBookToType(req, res){
    try {
        const idType = req.query.idType;
        const idBook = req.query.idBook;
        const bookType = await typeService.addBookToType(idBook,idType);
        res.json({ BookType: bookType, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function updateType (req, res){
    try {
        const idType = req.query.idType;
        const type = await typeService.updateType(idType, req.body);
        res.json(type);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteType (req, res){
    try {
        const idType = req.query.idType;
        const type = await typeService.deleteType(idType);
        res.json(type);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createType, getTypeById, getAllTypes, getLimitedTypes, addBookToType, updateType, deleteType }