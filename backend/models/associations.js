const { Author } = require("./authors");
const { Book } = require("./books");
const { Edition } = require("./editions");
const { Theme } = require("./themes");
const { Type } = require("./type");
const { User } = require("./users");


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
