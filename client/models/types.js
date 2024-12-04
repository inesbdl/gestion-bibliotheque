import { db } from './db';
import { DataTypes } from 'sequelize';

const Type = db.define("types", {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    
});

export { Type };