const themeService = require("../services/themeService");

async function createTheme(req, res) {
    try {
        const theme = await themeService.createTheme(req.body);
        res.json(theme);
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function getThemeById(req, res) {
    try {
        const id = req.query.id;
        const theme = await themeService.getThemeById(id);
        if(theme){
            res.json(theme);
        }
        else {
            res.json({"error": `Theme ${id} not found :(`});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getAllThemes(req, res) {
    try{
        const { offset, limit, theme } = req.query;
        const themes = await themeService.getAllThemes({ offset, limit, theme });
        res.json(themes);    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function getLimitedThemes(req, res) {
    try{
        const { pageId: pageId1, itemsPerPage: itemsPerPage1, offset, limit, theme } = req.query;
        const pageId = parseInt(pageId1) || 1;
        const itemsPerPage = parseInt(itemsPerPage1) || 10;
        
        const paginationData = await themeService.getLimitedThemes({ offset, limit, theme }, pageId, itemsPerPage);
        const baseUri = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`

        let queryParams = "";
        queryParams += itemsPerPage ? `&itemsPerPage=${itemsPerPage}` : itemsPerPage1;
        queryParams += theme ? `&theme=${theme}` : "";

        const previousUrl = pageId > 1 ? `${baseUri}?pageId=${pageId - 1}${queryParams}` : null;
        const nextUrl = paginationData.hasMore ? `${baseUri}?pageId=${pageId + 1}${queryParams}` : null;
        res.json({data: paginationData.themes, count: paginationData.count, previousUrl, nextUrl});    
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
};

async function addBookToTheme(req, res){
    try {
        const idTheme = req.query.idTheme;
        const idBook = req.query.idBook;
        const bookTheme = await themeService.addBookToTheme(idBook,idTheme);
        res.json({ BookTheme: bookTheme, });
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

async function updateTheme (req, res){
    try {
        const idTheme = req.query.idTheme;
        const theme = await themeService.updateTheme(idTheme, req.body);
        res.json(theme);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async function deleteTheme (req, res){
    try {
        const idTheme = req.query.idTheme;
        const theme = await themeService.deleteTheme(idTheme);
        res.json(theme);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createTheme, getThemeById, getAllThemes, getLimitedThemes, addBookToTheme, updateTheme, deleteTheme }