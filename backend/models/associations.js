const { Author } = require("./authors");
const { Book } = require("./books");
const { Edition } = require("./editions");
const { Theme } = require("./themes");
const { Type } = require("./type");


Type.hasMany(Book);
Book.belongsTo(Type);

Book.belongsToMany(Author, { through: "booksAuthors" });
Author.belongsToMany(Book, { through: "booksAuthors" });

Book.belongsToMany(Theme, { through: "booksThemes" });
Theme.belongsToMany(Book, { through: "booksThemes" });

Book.belongsToMany(Edition, { through: "booksEditions" });
Edition.belongsToMany(Book, { through: "booksEditions" });


module.exports = { Author, Book, Edition, Theme, Type };
