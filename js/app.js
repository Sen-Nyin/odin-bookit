'use strict';

let currentView = true;
const library = [];
const READ = document.querySelector('.books__read');
const btnOpenModal = document.getElementById('add-book');
const btnCloseModal = document.querySelector('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnSubmit = document.getElementById('submit');

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

const addBook = (title, author, pages, isbn, read) => {
  const newBook = new Book(title, author, pages, isbn, read);
  library.push(newBook);
  updateDisplay();
};

const remBook = (index) => {
  // remove book
  // const DEL_TARGET = document.querySelector(DATA TAG VALUE = INDEX)
  // const READ_VALUE = library[index].read;
  // DEL_TARGET.remove();
  // updateDisplay(READ_VALUE);
};

const clear = () => {
  READ.innerHTML = '';
};

const updateDisplay = () => {
  clear();
  for (const [index, book] of library.entries()) {
    if (book.read === currentView) {
      const CARD = document.createElement('li');
      CARD.classList.add('card');
      const IMG = document.createElement('img');
      if (book.isbn === 'No ISBN') {
        IMG.setAttribute('src', 'assets/img/nc-md.gif');
        IMG.setAttribute('alt', 'Missing book cover image');
      } else {
        IMG.setAttribute(
          'src',
          `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
        );
        IMG.setAttribute('alt', 'Book cover image');
      }
      IMG.classList.add('card__image');

      const BOOK_TITLE = document.createElement('h3');
      BOOK_TITLE.classList.add(
        'card__heading',
        'card__heading--main',
        'card--book-title'
      );
      BOOK_TITLE.textContent = `${book.title}`;
      const AUTHOR_TITLE = document.createElement('span');
      AUTHOR_TITLE.classList.add('card__heading', 'card--author-title');
      AUTHOR_TITLE.textContent = 'Author:';
      const AUTHOR_NAME = document.createElement('span');
      AUTHOR_NAME.classList.add('card__text', 'card--author-name');
      AUTHOR_NAME.textContent = `${book.author}`;
      const PAGES_TITLE = document.createElement('span');
      PAGES_TITLE.classList.add('card__heading', 'card--pages-title');
      PAGES_TITLE.textContent = 'Pages:';
      const PAGES_COUNT = document.createElement('span');
      PAGES_COUNT.classList.add('card__text', 'card--pages-count');
      PAGES_COUNT.textContent = `${book.pages}`;
      const READ_TITLE = document.createElement('span');
      READ_TITLE.classList.add('card__heading', 'card--read-title');
      READ_TITLE.textContent = 'Read?';
      const TOGGLE = document.createElement('input');
      TOGGLE.setAttribute('type', 'checkbox');
      TOGGLE.classList.add('card--read-toggle');

      CARD.append(IMG);
      CARD.append(BOOK_TITLE);
      CARD.append(AUTHOR_TITLE);
      CARD.append(AUTHOR_NAME);
      CARD.append(PAGES_TITLE);
      CARD.append(PAGES_COUNT);
      CARD.append(READ_TITLE);
      CARD.append(TOGGLE);

      READ.append(CARD);
    }
  }
};

const updateReadDisplay = (target) => {
  for (const [index, book] of library) {
    if (book.read) {
      // do stuff
    }
  }
};

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

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const BOOK_TITLE = document.getElementById('book-title').value;
  const AUTHOR_NAME = document.getElementById('author').value;
  const PAGES_COUNT = document.getElementById('pages').value;

  const ISBN =
    document.getElementById('isbn').value === null
      ? 'No ISBN'
      : document.getElementById('isbn').value;

  const READ = true;
  addBook(BOOK_TITLE, AUTHOR_NAME, PAGES_COUNT, ISBN, READ);

  closeModal();
  document.getElementById('book-title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('isbn').value = '';
});
