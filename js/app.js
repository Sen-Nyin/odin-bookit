'use strict';

let currentView = true;
const library = [];
const bookDisplayEle = document.querySelector('.bookshelf');

const openModalBtn = document.getElementById('add-book');
const closeModalBtn = document.querySelector('.btn--close-modal');
const submitBtn = document.getElementById('submit');

const modalEle = document.querySelector('.modal');
const overlayEle = document.querySelector('.overlay');

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

const removeBook = (index) => {
  // remove book
  // const DEL_TARGET = document.querySelector(DATA TAG VALUE = INDEX)
  // const READ_VALUE = library[index].read;
  // DEL_TARGET.remove();
  // updateDisplay(READ_VALUE);
};

const clearDisplay = () => {
  bookDisplayEle.innerHTML = '';
};

const updateDisplay = () => {
  clearDisplay();
  for (const [index, book] of library.entries()) {
    if (book.read === currentView) {
      const cardEle = document.createElement('li');
      cardEle.classList.add('card', `${currentView ? 'read' : 'unread'}`);
      const coverImgEle = document.createElement('img');
      if (!book.isbn) {
        coverImgEle.setAttribute('src', 'assets/img/nc-md.gif');
        coverImgEle.setAttribute('alt', 'Missing book cover image');
      } else {
        coverImgEle.setAttribute(
          'src',
          `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
        );
        coverImgEle.setAttribute('alt', 'Book cover image');
      }
      coverImgEle.classList.add('card__image');

      const bookTitleLabel = document.createElement('h3');
      bookTitleLabel.classList.add(
        'card__heading',
        'card__heading--main',
        'card--book-title'
      );
      bookTitleLabel.textContent = `${book.title}`;
      const authorLabel = document.createElement('span');
      authorLabel.classList.add('card__heading', 'card--author-title');
      authorLabel.textContent = 'Author:';
      const authorNameText = document.createElement('span');
      authorNameText.classList.add('card__text', 'card--author-name');
      authorNameText.textContent = `${book.author}`;
      const pageCountLabel = document.createElement('span');
      pageCountLabel.classList.add('card__heading', 'card--pages-title');
      pageCountLabel.textContent = 'Pages:';
      const pageCountText = document.createElement('span');
      pageCountText.classList.add('card__text', 'card--pages-count');
      pageCountText.textContent = `${book.pages}`;
      const readStatusLabel = document.createElement('span');
      readStatusLabel.classList.add('card__heading', 'card--read-title');
      readStatusLabel.textContent = 'Read?';
      const readSwitchEle = document.createElement('input');
      readSwitchEle.setAttribute('type', 'checkbox');
      readSwitchEle.classList.add('card--read-toggle');

      cardEle.append(coverImgEle);
      cardEle.append(bookTitleLabel);
      cardEle.append(authorLabel);
      cardEle.append(authorNameText);
      cardEle.append(pageCountLabel);
      cardEle.append(pageCountText);
      cardEle.append(readStatusLabel);
      cardEle.append(readSwitchEle);

      bookDisplayEle.append(cardEle);
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
  modalEle.classList.remove('hidden');
  overlayEle.classList.remove('hidden');
};

const closeModal = (e) => {
  modalEle.classList.add('hidden');
  overlayEle.classList.add('hidden');
};

openModalBtn.addEventListener('click', openModal);
overlayEle.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitleValue = document.getElementById('book-title').value;
  const authorNameValue = document.getElementById('author').value;
  const pageCountValue = document.getElementById('pages').value;

  const isbnValue = document.getElementById('isbn').value;

  const readStatus = true;
  addBook(
    bookTitleValue,
    authorNameValue,
    pageCountValue,
    isbnValue,
    readStatus
  );

  closeModal();
  document.getElementById('book-title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('isbn').value = '';
});
