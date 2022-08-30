'use strict';

class Display {
  constructor() {
    this.currentView = 'all';
    this.bookDisplayEle = document.querySelector('.bookshelf');
    this.openModalBtn = document.getElementById('add-book');
    this.closeModalBtn = document.querySelector('.btn--close-modal');
    this.submitBtn = document.getElementById('submit');
    this.readBtn = document.getElementById('readbtn');
    this.unreadBtn = document.getElementById('unreadbtn');
    this.allBtn = document.getElementById('allbtn');
    this.modalEle = document.querySelector('.modal');
    this.overlayEle = document.querySelector('.overlay');
  }

  openModal = (e) => {
    e.preventDefault();
    this.modalEle.classList.remove('hidden');
    this.overlayEle.classList.remove('hidden');
  };

  clearDisplay = () => {
    while (this.bookDisplayEle.firstChild) {
      this.bookDisplayEle.firstChild.remove();
    }
  };

  closeModal = (e) => {
    this.modalEle.classList.add('hidden');
    this.overlayEle.classList.add('hidden');
  };

  clearForm = () => {
    document.getElementById('book-title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('isbn').value = '';
  };

  toggleDisplay = (e) => {
    const target = e.target.id;
    if (target === 'readbtn') {
      displayController.currentView = true;
      displayController.allBtn.classList.remove('active');
      displayController.readBtn.classList.add('active');
      displayController.unreadBtn.classList.remove('active');
    } else if (target === 'unreadbtn') {
      displayController.currentView = false;
      displayController.allBtn.classList.remove('active');
      displayController.readBtn.classList.remove('active');
      displayController.unreadBtn.classList.add('active');
    } else {
      displayController.currentView = 'all';
      displayController.allBtn.classList.add('active');
      displayController.readBtn.classList.remove('active');
      displayController.unreadBtn.classList.remove('active');
    }
    this.updateDisplay();
  };

  submitForm = (e) => {
    e.preventDefault();
    const bookTitleValue = document.getElementById('book-title').value;
    const authorNameValue = document.getElementById('author').value;
    const pageCountValue = document.getElementById('pages').value;
    const isbnValue = document.getElementById('isbn').value;
    const readStatus = document.getElementById('setread').checked;
    library.addBook(
      bookTitleValue,
      authorNameValue,
      pageCountValue,
      isbnValue,
      readStatus
    );
    console.log(
      'Adding: ',
      bookTitleValue,
      authorNameValue,
      pageCountValue,
      isbnValue,
      readStatus
    );
    this.closeModal();
    this.clearForm();
  };
  updateDisplay = () => {
    displayController.clearDisplay();
    for (const [_, book] of library.collection.entries()) {
      if (book.read === this.currentView || this.currentView === 'all') {
        const cardEle = document.createElement('li');
        cardEle.classList.add('card', `${book.read ? 'read' : 'unread'}`);
        // book cover
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
        // book title
        const bookTitleLabel = document.createElement('h3');
        bookTitleLabel.classList.add('card__heading', 'card--book-title');
        bookTitleLabel.textContent = `${
          !book.title ? 'Missing Title' : book.title
        }`;
        // author display
        const authorLabel = document.createElement('span');
        authorLabel.classList.add('card--author-title');
        authorLabel.textContent = 'by ';
        const authorNameText = document.createElement('span');
        authorNameText.classList.add('card--author-name');
        authorNameText.textContent = `${
          !book.author ? 'Missing author' : book.author
        }`;
        authorLabel.append(authorNameText);
        // page count display
        const pageCountLabel = document.createElement('span');
        pageCountLabel.classList.add('card--pages-title');
        pageCountLabel.textContent = 'pages';
        const pageCountText = document.createElement('span');
        pageCountText.classList.add('card--pages-count');
        pageCountText.textContent = `${!book.pages ? 'Unknown' : book.pages} `;
        pageCountLabel.prepend(pageCountText);
        // controls
        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('card__controls');
        //    read switch
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
        readSwitchCheck.addEventListener('click', () => {
          book.toggleRead();
          this.updateDisplay();
        });
        readSwitchEle.append(readSwitchCheck);
        const readSwitchSlider = document.createElement('span');
        readSwitchSlider.classList.add('switch__slider', 'round');
        readSwitchEle.append(readSwitchSlider);
        //    delete book
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
        deleteBtn.addEventListener('click', () => library.removeBook(book.id));
        controlsContainer.append(readSwitchEle);
        controlsContainer.append(deleteBtn);
        cardEle.append(coverImgEle);
        cardEle.append(bookTitleLabel);
        cardEle.append(authorLabel);
        cardEle.append(pageCountLabel);
        cardEle.append(controlsContainer);
        displayController.bookDisplayEle.append(cardEle);
      }
    }
  };
}

class Library {
  constructor(title) {
    this.title = title;
    this.collection = [];
  }

  addItem(item) {
    this.collection.push(item);
  }

  removeItem(id) {
    this.collection = this.collection.filter((item) => item.id != id);
  }

  addBook(title, author, pages, isbn, read) {
    console.log('Received ', title, author, pages, isbn, read); // This is working
    console.log(this);
    this.addItem(new Book(title, author, pages, isbn, read)); // BUG empty array being stored.
    displayController.updateDisplay();
  }

  removeBook(id) {
    this.removeItem(id);
    displayController.updateDisplay();
  }
}

class Book {
  constructor(title, author, pages, isbn, read = false) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isbn = isbn;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

// create objects

const displayController = new Display();
const library = new Library('Books');

// display management

// events
displayController.openModalBtn.addEventListener(
  'click',
  displayController.openModal
);
displayController.overlayEle.addEventListener(
  'click',
  displayController.closeModal
);
displayController.closeModalBtn.addEventListener(
  'click',
  displayController.closeModal
);
displayController.allBtn.addEventListener(
  'click',
  displayController.toggleDisplay
);
displayController.readBtn.addEventListener(
  'click',
  displayController.toggleDisplay
);
displayController.unreadBtn.addEventListener(
  'click',
  displayController.toggleDisplay
);
displayController.submitBtn.addEventListener(
  'click',
  displayController.submitForm
);
