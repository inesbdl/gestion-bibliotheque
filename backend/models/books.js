const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Book = db.define("book", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nbAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nbShared: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owned: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

module.exports = { Book };