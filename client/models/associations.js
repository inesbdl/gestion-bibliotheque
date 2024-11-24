const { Authors } = require("./authors");
const { Books } = require("./books");
const { Editions } = require("./editions");
const { Themes } = require("./themes");
const { Types } = require("./type");


Editions.hasMany(Books);
Books.belongsTo(Editions);

Types.hasMany(Books);
Books.belongsTo(Types);

Books.belongsToMany(Authors, { through: "booksAuthors" });
Authors.belongsToMany(Books, { through: "booksAuthors" });

Books.belongsToMany(Themes, { through: "booksThemes" });
Themes.belongsToMany(Books, { through: "booksThemes" });


module.exports = { Authors, Books, Editions, Themes, Types };
