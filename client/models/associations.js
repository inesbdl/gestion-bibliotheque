const { Author } = require("./authors");
const { Book } = require("./book");
const { Edition } = require("./editions");
const { Theme } = require("./themes");
const { Type } = require("./type");


Edition.hasMany(Book);
Book.belongsTo(Edition);

Type.hasMany(Book);
Book.belongsTo(Type);

Book.belongsToMany(Author, { through: "booksAuthors" });
Author.belongsToMany(Book, { through: "booksAuthors" });

Book.belongsToMany(Theme, { through: "booksThemes" });
Theme.belongsToMany(Book, { through: "booksThemes" });


module.exports = { Author, Book, Edition, Theme, Type };
