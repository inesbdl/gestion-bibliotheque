const { db } = require("./db.cjs");
const { DataTypes } = require("sequelize")

const Theme = db.define("themes", {
    theme: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

module.exports = { Theme };