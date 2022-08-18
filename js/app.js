'use strict';

let currentView = 'all';
const library = []; // [ book1, boo]
const bookDisplayEle = document.querySelector('.bookshelf');

const openModalBtn = document.getElementById('add-book');
const closeModalBtn = document.querySelector('.btn--close-modal');
const submitBtn = document.getElementById('submit');
const readBtn = document.getElementById('readbtn');
const unreadBtn = document.getElementById('unreadbtn');
const allBtn = document.getElementById('allbtn');

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
  library.splice(index, 1);
  updateDisplay();
};

const clearDisplay = () => {
  bookDisplayEle.innerHTML = '';
};

const updateDisplay = () => {
  clearDisplay();
  for (const [index, book] of library.entries()) {
    if (book.read === currentView || currentView === 'all') {
      const cardEle = document.createElement('li');
      cardEle.classList.add('card', `${book.read ? 'read' : 'unread'}`);
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

      const controlsContainer = document.createElement('div');
      controlsContainer.classList.add('card__controls');

      const readSwitchEle = document.createElement('label');
      readSwitchEle.classList.add('switch');
      const readSwitchLabel = document.createElement('span');
      readSwitchLabel.classList.add('switch__label');
      readSwitchLabel.textContent = 'Read';
      readSwitchEle.append(readSwitchLabel);
      const readSwitchCheck = document.createElement('input');
      readSwitchCheck.setAttribute('type', 'checkbox');
      readSwitchCheck.classList.add('switch__checkbox');
      book.read ? (readSwitchCheck.checked = true) : '';
      readSwitchCheck.dataset.index = index;
      readSwitchCheck.addEventListener('click', () => {
        book.toggleRead();
        updateDisplay();
      });
      readSwitchEle.append(readSwitchCheck);
      const readSwitchSlider = document.createElement('span');
      readSwitchSlider.classList.add('switch__slider', 'round');
      readSwitchEle.append(readSwitchSlider);

      const deleteBtn = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      deleteBtn.classList.add('btn--delete-book');

      const deleteIcon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'use'
      );
      deleteIcon.setAttribute(
        'href',
        'assets/icons/sprite.svg' + '#icon-delete'
      );
      deleteBtn.append(deleteIcon);
      deleteBtn.addEventListener('click', () => removeBook(index));

      controlsContainer.append(readSwitchEle);
      controlsContainer.append(deleteBtn);

      cardEle.append(coverImgEle);
      cardEle.append(bookTitleLabel);
      cardEle.append(authorLabel);
      cardEle.append(pageCountLabel);
      cardEle.append(controlsContainer);

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
// toggle between viewing all / read / unread books
const toggleDisplay = (e) => {
  const target = e.target.id;
  if (target === 'readbtn') {
    currentView = true;
    allBtn.classList.remove('active');
    readBtn.classList.add('active');
    unreadBtn.classList.remove('active');
  } else if (target === 'unreadbtn') {
    currentView = false;
    allBtn.classList.remove('active');
    readBtn.classList.remove('active');
    unreadBtn.classList.add('active');
  } else {
    currentView = 'all';
    allBtn.classList.add('active');
    readBtn.classList.remove('active');
    unreadBtn.classList.remove('active');
  }
  updateDisplay();
};

const clearForm = () => {
  document.getElementById('book-title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('isbn').value = '';
};
const submitForm = (e) => {
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
  clearForm();
};

openModalBtn.addEventListener('click', openModal);
overlayEle.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);
allBtn.addEventListener('click', toggleDisplay);
readBtn.addEventListener('click', toggleDisplay);
unreadBtn.addEventListener('click', toggleDisplay);
submitBtn.addEventListener('click', submitForm);
