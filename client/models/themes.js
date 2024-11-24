const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Themes = db.define("themes", {
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

module.exports = { Themes };