const library = [];

class Book {
	constructor(title, author, pageCount, isRead) {
		this.title = title;
		this.author = author;
		this.pageCount = pageCount;
		this.isRead = isRead;
	}

	toggleIsRead() {
		this.isRead = !this.isRead;
	}
}

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
	attachEventListeners("toggle-read", toggleReadStatus);
	attachEventListeners("remove-book", removeBook);
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
		`${book.isRead ? "Read" : "Unread"}`
	);
	const toggleReadBtn = createNewElement(
		"button",
		"toggle-read",
		"Toggle Read Status"
	);
	toggleReadBtn.setAttribute("data-library-index", index);

	const removeBookBtn = createNewElement("button", "remove-book", "×");
	removeBookBtn.setAttribute("data-library-index", index);

	bookCard.appendChild(bookTitle);
	bookCard.appendChild(removeBookBtn);
	bookCard.appendChild(bookAuthor);
	bookCard.appendChild(bookPageCount);
	bookCard.appendChild(bookReadStatus);
	bookCard.appendChild(toggleReadBtn);
	return bookCard;
}

function createNewElement(element, elementClass, elementText) {
	const newElement = document.createElement(element);
	newElement.classList.add(elementClass);
	newElement.textContent = elementText;
	return newElement;
}

function attachEventListeners(elementClass, callback) {
	const element = document.querySelectorAll(`.${elementClass}`);
	element.forEach((button) => {
		button.addEventListener("click", callback);
	});
}

function removeBook(e) {
	const bookIndex = e.target.getAttribute("data-library-index");
	library.splice(bookIndex, 1);
	updateLibrary();
}

function toggleReadStatus(e) {
	const bookIndex = e.target.getAttribute("data-library-index");
	library[bookIndex].toggleIsRead();
	updateLibrary();
}
