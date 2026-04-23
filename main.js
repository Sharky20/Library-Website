const myLibrary = [];

const booksWrapper = document.querySelector(".book-card-wrapper");
const starEmpty = "./images/star.png";
const starFull = "./images/star-full.png";
const unreadIcon = "./images/eye.svg";
const isreadIcon = "./images/check-mark.png";

function Book(title, author, pages, isRead, isFavorited) {
  if (!new.target) {
    throw Error("need to use 'new' operator");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.isFavorited = isFavorited;
  this.id = crypto.randomUUID();
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${isRead ? "has been read" : "not read yet"}`;
  };
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

    infoWrapper.appendChild(title);
    infoWrapper.appendChild(author);
    infoWrapper.appendChild(pages);

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
  console.log(e);
}

function readBook() {}

function favoriteBook() {}
