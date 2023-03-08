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
