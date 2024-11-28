const { db } = require("./db");
const { DataTypes } = require("sequelize")

const Author = db.define("authors", {
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {

});

module.exports = { Author };