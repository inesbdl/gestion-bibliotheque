import { Author } from './authors';
import { Edition } from './editions';
import { Book } from './books';
import { Theme } from './themes';
import { Type } from './types';


Edition.hasMany(Book);
Book.belongsTo(Edition);

Type.hasMany(Book);
Book.belongsTo(Type);

Book.belongsToMany(Author, { through: "booksAuthors" });
Author.belongsToMany(Book, { through: "booksAuthors" });

Book.belongsToMany(Theme, { through: "booksThemes" });
Theme.belongsToMany(Book, { through: "booksThemes" });


export { Author, Book, Edition, Theme, Type };
