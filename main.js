function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("need to use 'new' operator");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${isRead ? "has been read" : "not read yet"}`;
  };
}
