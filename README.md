# Book-it List

A project for The Odin Project.

## How to use

### Add a book

The add book button is located at the top right corner of your view port.
Clicking this will present you with a modal form to enter the book details.
By default the book will be flagged as read. You can switch this to unread when adding the book, using the toggle.

### Remove a book

Each book will display its own delete button icon at the bottom right corner of the book card.

### Update book read status

Each book will display a read toggle on the bottom left corner of the book card.

### Changing view

You have 3 view options:

- All books
- Only read books
- Only unread books

Your book shelf provides 3 buttons for switching between these views.

### Adding a book cover

When adding your book, provide the ISBN number and the book cover will be retrieved automatically.

## Learnings

For this project I learned how to use an object contstructor and how to apply a method to the constructor prototype.

I also learned that inserting SVG images using the `<svg>` and `<use>` tags requires the use of `createElementNS` name space.

Additionally, the project gave me the opportunity to get some practice with inline deconstruction of an array through `for (const [index, book] of library.entries())`. This enabled me to identify a book index for deletion purposes without having to apply a data attribute.

## External resources

No external websites were used for this project other than Google Fonts.

Big thanks to
