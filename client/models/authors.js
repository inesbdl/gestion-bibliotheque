import { db } from './db';
import { DataTypes } from 'sequelize';

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

export { Author };