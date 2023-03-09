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

const newBookDialog = document.getElementById("new_book");

const newBookBtn = document.getElementById("book_dialog_btn");
newBookBtn.addEventListener("click", openNewBookDialog);

function openNewBookDialog() {
	newBookDialog.showModal();
}

const newBookForm = document.getElementById("new_book_form");
newBookForm.addEventListener("submit", processNewBook);

function processNewBook(e) {
	const title = e.target[0].value;
	const author = e.target[1].value;
	const pageCount = e.target[2].value;
	const isRead = e.target[3].checked;
	const newBook = new Book(title, author, pageCount, isRead);

	addBookToLibrary(newBook);
	updateLibrary();
}

const cancelNewBtn = document.getElementById("cancel_new_book");
cancelNewBtn.addEventListener("click", cancelNewBookDialog);

function cancelNewBookDialog() {
	newBookDialog.close();
}

function updateLibrary() {
	const currentLibrary = document.querySelector(".library-list");
	const newLibrary = createNewElement("div", "library-list", null);

	if (library.length >= 1) {
		library.forEach((book, index) => {
			const newBookCard = createBookCard(book, index);
			newLibrary.appendChild(newBookCard);
		});
	} else {
		const emptyMsg = createNewElement(
			"p",
			"empty-library-msg",
			"The library is empty :("
		);
		newLibrary.appendChild(emptyMsg);
	}

	currentLibrary.replaceWith(newLibrary);
	enableRemoveBtns();
}

function createBookCard(book, index) {
	const bookCard = createNewElement("div", "book-card", null);
	const bookTitle = createNewElement("h3", "title", book.title);
	const bookAuthor = createNewElement(
		"p",
		"author",
		`Written by ${book.author}`
	);
	const bookPageCount = createNewElement(
		"p",
		"page-count",
		`Number of pages: ${book.pageCount}`
	);
	const bookReadStatus = createNewElement(
		"p",
		"status",
		`${book.isRead ? "read" : "unread"}`
	);
	const removeBookBtn = createNewElement("button", "remove-book", "Remove Book");
	removeBookBtn.setAttribute("data-library-index", index);

	bookCard.appendChild(bookTitle);
	bookCard.appendChild(bookAuthor);
	bookCard.appendChild(bookPageCount);
	bookCard.appendChild(bookReadStatus);
	bookCard.appendChild(removeBookBtn);
	return bookCard;
}

function createNewElement(element, elementClass, elementText) {
	const newElement = document.createElement(element);
	newElement.classList.add(elementClass);
	newElement.textContent = elementText;
	return newElement;
}

function enableRemoveBtns() {
	const removeBtns = document.querySelectorAll(".remove-book");
	removeBtns.forEach((button) => {
		button.addEventListener("click", removeBook);
	});
}

function removeBook(e) {
	const bookIndex = e.target.getAttribute("data-library-index");
	library.splice(bookIndex, 1);
	updateLibrary();
}
