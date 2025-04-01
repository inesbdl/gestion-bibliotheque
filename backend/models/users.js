const { db } = require("./db");
const { DataTypes } = require("sequelize")

const User = db.define("users", {
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

module.exports = { User };