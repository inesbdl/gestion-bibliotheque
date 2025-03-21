const userService = require("../services/userService");

async function createUser(req, res) {
    try {
        req.body.fullname = req.body.firstname + " " + req.body.lastname;
        const user = await userService.createUser(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getUserById(req, res) {
    try {
        const id = req.query.id;
        const user = await userService.getUserById(id);
        if(user){
            res.json(user);
        }
        else {
            res.json({"error": `User ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllUsers(req, res) {
    try{
        const { offset, limit, firstname, lastname } = req.query;
        const users = await userService.getAllUsers({ offset, limit, firstname, lastname });
        res.json(users);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedUsers(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, firstname, lastname } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await userService.getLimitedUsers({ offset, limit, firstname, lastname }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += firstname ? `&firstname=${firstname}` : "";
        queryParams += lastname ? `&lastname=${lastname}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.users, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addBookToUser(req, res){
    try {
        const idUser = req.query.idUser;
        const idBook = req.query.idBook;
        const bookUser = await userService.addBookToUser(idBook,idUser);
        res.json({ BookUser: bookUser, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function updateUser (req, res){
    try {
        const idUser = req.query.idUser;
        const user = await userService.updateUser(idUser, req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteUser (req, res){
    try {
        const idUser = req.query.idUser;
        const user = await userService.deleteUser(idUser);
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createUser, getUserById, getAllUsers, getLimitedUsers, addBookToUser, updateUser, deleteUser }