const { Author } = require("./authors.cjs");
const { Book } = require("./books.cjs");
const { Edition } = require("./editions.cjs");
const { Theme } = require("./themes.cjs");
const { Type } = require("./type.cjs");
const { User } = require("./users.cjs");


Type.hasMany(Book);
Book.belongsTo(Type);

Edition.hasMany(Book);
Book.belongsTo(Edition);

Book.belongsToMany(Author, { through: "booksAuthors" });
Author.belongsToMany(Book, { through: "booksAuthors" });

Book.belongsToMany(User, { through: "booksUsers" });
User.belongsToMany(Book, { through: "booksUsers" });

Book.belongsToMany(Theme, { through: "booksThemes" });
Theme.belongsToMany(Book, { through: "booksThemes" });


module.exports = { Author, Book, Edition, Theme, Type, User };
