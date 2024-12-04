import Sequelize from 'sequelize';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: '../database/bookshelf.sqlite',
  logging: false
});

export { db };