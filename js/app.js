'use strict';

let currentView = true;
const library = [];
const bookDisplayEle = document.querySelector('.bookshelf');

const openModalBtn = document.getElementById('add-book');
const closeModalBtn = document.querySelector('.btn--close-modal');
const submitBtn = document.getElementById('submit');
const readBtn = document.getElementById('readbtn');
const unreadBtn = document.getElementById('unreadbtn');

const modalEle = document.querySelector('.modal');
const overlayEle = document.querySelector('.overlay');

const readSwitches = document.querySelectorAll('[data-index]');

function Book(title, author, pages, isbn, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isbn = isbn;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  console.log(this);
  this.read = !this.read;
  console.log(this.title, ' toggled to ', this.read);
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
      bookTitleLabel.classList.add('card__heading', 'card--book-title');
      bookTitleLabel.textContent = `${
        !book.title ? 'Missing Title' : book.title
      }`;

      const authorLabel = document.createElement('span');
      authorLabel.classList.add('card--author-title');
      authorLabel.textContent = 'by ';
      const authorNameText = document.createElement('span');
      authorNameText.classList.add('card--author-name');
      authorNameText.textContent = `${
        !book.author ? 'Missing author' : book.author
      }`;
      authorLabel.append(authorNameText);

      const pageCountLabel = document.createElement('span');
      pageCountLabel.classList.add('card--pages-title');
      pageCountLabel.textContent = 'pages';

      const pageCountText = document.createElement('span');
      pageCountText.classList.add('card--pages-count');
      pageCountText.textContent = `${!book.pages ? 'Unknown' : book.pages} `;
      pageCountLabel.prepend(pageCountText);

      const readStatusLabel = document.createElement('span');
      readStatusLabel.classList.add('card__heading', 'card--read-title');
      readStatusLabel.textContent = 'Read?';

      const readSwitchEle = document.createElement('label');
      readSwitchEle.classList.add('switch');
      const readSwitchCheck = document.createElement('input');
      readSwitchCheck.setAttribute('type', 'checkbox');
      readSwitchCheck.classList.add('switch__checkbox');
      book.read ? (readSwitchCheck.checked = true) : '';
      readSwitchCheck.dataset.index = index;
      readSwitchCheck.addEventListener('click', () => book.toggleRead());
      readSwitchEle.append(readSwitchCheck);
      const readSwitchSlider = document.createElement('span');
      readSwitchSlider.classList.add('switch__slider', 'round');
      readSwitchEle.append(readSwitchSlider);

      cardEle.append(coverImgEle);
      cardEle.append(bookTitleLabel);
      cardEle.append(authorLabel);
      cardEle.append(pageCountLabel);
      cardEle.append(readStatusLabel);
      cardEle.append(readSwitchEle);

      bookDisplayEle.append(cardEle);
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

const toggleDisplay = (e) => {
  const target = e.target.id;
  if (target === 'readbtn') {
    currentView = true;
    readBtn.classList.add('active');
    unreadBtn.classList.remove('active');
  } else {
    currentView = false;
    readBtn.classList.remove('active');
    unreadBtn.classList.add('active');
  }
  updateDisplay();
};

openModalBtn.addEventListener('click', openModal);
overlayEle.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);
readBtn.addEventListener('click', toggleDisplay);
unreadBtn.addEventListener('click', toggleDisplay);

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookTitleValue = document.getElementById('book-title').value;
  const authorNameValue = document.getElementById('author').value;
  const pageCountValue = document.getElementById('pages').value;
  const isbnValue = document.getElementById('isbn').value;

  const readStatus = document.getElementById('setread').checked;
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
