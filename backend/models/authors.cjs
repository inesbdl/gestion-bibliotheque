const { db } = require("./db.cjs");
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
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {

});

module.exports = { Author };