const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Editions = db.define("editions", {
    edition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

module.exports = { Editions };