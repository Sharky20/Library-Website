let myLibrary = [];

const booksWrapper = document.querySelector(".book-card-wrapper");
const starEmpty = "./images/star.png";
const starFull = "./images/star-full.png";
const unreadIcon = "./images/eye.svg";
const isreadIcon = "./images/check-mark.png";

const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
/** @type {HTMLInputElement} */
const isReadInput = document.querySelector("#read");
/** @type {HTMLInputElement} */
const isFavoriteInput = document.querySelector("#favorite");

class Book {
  constructor(title, author, pages, isRead, isFavorited) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.isFavorited = isFavorited;
    this.id = crypto.randomUUID();
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? "has been read" : "not read yet"}`;
  }
}

function submitBook() {
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  if (title == "" || author == "" || pages == "") return;
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  let isRead = isReadInput.checked;
  isReadInput.checked = false;
  let isFavorited = isFavoriteInput.checked;
  isFavoriteInput.checked = false;
  addBookToLibrary(title, author, pages, isRead, isFavorited);
}

function addBookToLibrary(title, author, pages, isRead, isFavorited) {
  let newBook = new Book(title, author, pages, isRead, isFavorited);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  booksWrapper.innerHTML = "";
  myLibrary.forEach((book) => {
    let card = document.createElement("div");
    card.classList.add("book-card");

    let infoWrapper = document.createElement("div");
    infoWrapper.classList.add("book-info");

    card.classList.add("book-card");
    let title = document.createElement("div");
    title.classList.add("book-title");
    title.textContent = book.title;
    let author = document.createElement("div");
    author.classList.add("book-author");
    author.textContent = book.author;
    let pages = document.createElement("div");
    pages.classList.add("book-pages");
    pages.textContent = book.pages;
    let uuid = document.createElement("div");
    uuid.classList.add("uuid");
    uuid.hidden = true;
    uuid.textContent = book.id;

    infoWrapper.appendChild(title);
    infoWrapper.appendChild(author);
    infoWrapper.appendChild(pages);
    infoWrapper.appendChild(uuid);

    let buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("book-buttons");

    let favoriteButton = document.createElement("button");
    favoriteButton.onclick = favoriteBook;
    let favoriteIcon = document.createElement("img");
    favoriteIcon.src = book.isFavorited ? starFull : starEmpty;
    favoriteButton.appendChild(favoriteIcon);

    let readButton = document.createElement("button");
    readButton.onclick = readBook;
    let readIcon = document.createElement("img");
    readIcon.src = book.isRead ? isreadIcon : unreadIcon;
    readButton.appendChild(readIcon);

    let trashButton = document.createElement("button");
    trashButton.onclick = removeBook;
    let trashIcon = document.createElement("img");
    trashIcon.src = "./images/trash.png";
    trashButton.appendChild(trashIcon);

    buttonsWrapper.appendChild(favoriteButton);
    buttonsWrapper.appendChild(readButton);
    buttonsWrapper.appendChild(trashButton);

    card.appendChild(infoWrapper);
    card.appendChild(buttonsWrapper);
    booksWrapper.appendChild(card);
  });
}

function removeBook(e) {
  const removeButton = e.target;
  const parent = removeButton.closest(".book-card");
  const bookUUID = parent.querySelector(".book-info .uuid");
  let id = bookUUID.textContent;
  myLibrary = myLibrary.filter((book) => book.id != id);
  console.log(myLibrary);
  displayBooks();
}

function readBook(e) {
  const readButton = e.target;
  const parent = readButton.closest(".book-card");
  const bookUUID = parent.querySelector(".book-info .uuid");
  let id = bookUUID.textContent;
  myLibrary.forEach((book) => {
    if (book.id == id) {
      book.isRead ? (book.isRead = false) : (book.isRead = true);
    }
  });
  displayBooks();
}

function favoriteBook(e) {
  const favButton = e.target;
  const parent = favButton.closest(".book-card");
  const bookUUID = parent.querySelector(".book-info .uuid");
  let id = bookUUID.textContent;
  myLibrary.forEach((book) => {
    if (book.id == id) {
      book.isFavorited ? (book.isFavorited = false) : (book.isFavorited = true);
    }
  });
  displayBooks();
}
