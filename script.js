const library = [];

function Book(title, author, pageCount, isRead) {
	this.title = title;
	this.author = author;
	this.pageCount = pageCount;
	this.isRead = isRead;
}

Book.prototype.toggleIsRead = function () {
	this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
	library.push(book);
}

const book1 = new Book("Book1", "Author1", 20, true);
const book2 = new Book("Book2", "Author2", 40, false);
const book3 = new Book("Book3", "Author3", 60, true);
const book4 = new Book("Book4", "Author4", 80, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
