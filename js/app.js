'use strict';

function Book(title, author, pages, isbn, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isbn = isbn;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const library = [];

function addBook(title, author, pages, isbn, read) {
  const BOOK_COVER = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  const newBook = new Book(title, author, pages, BOOK_COVER, read);
  library.push(newBook);
  updateDisplay();
}

function remBook(index) {
  // remove book
}

function updateDisplay() {
  const READ = document.querySelector('.books__read');
  const UNREAD = document.querySelector('.books__unread');
  for (const [index, book] of library) {
    // create div
    // create image
    // create text tags
    // create read switch
    // create delete button - index into data tag
    // append
  }
}

function updateReadDisplay(target) {
  for (const [index, book] of library) {
    if (book.read) {
      // do stuff
    }
  }
}

const btnOpenModal = document.getElementById('add-book');
const btnCloseModal = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModal = (e) => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = (e) => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnOpenModal.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);
btnCloseModal.addEventListener('click', closeModal);
