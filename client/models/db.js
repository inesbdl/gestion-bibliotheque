
/*const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './database/bookshelf.sqlite',
  logging: false
});

async function testConnection() {
  try {
    await db.authenticate();
    console.log('Connexion à SQLite réussie.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
}

testConnection();

module.exports = { db };*/

'use strict';

import Sequelize, { DataTypes } from 'sequelize';


// import all models
import Books from './associations.js';

const env = process.env.NODE_ENV || 'development';

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db['Posts'] = Post(sequelize, DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;