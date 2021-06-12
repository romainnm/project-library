//===== DOM =====//
const bookContainer = document.getElementById('book-container');
// DOM inputs
const newBookInputs = document.getElementById('new-book-inputs');
const bookTitleInput = document.getElementById('book-title');
const bookAuthorInput = document.getElementById('book-author');
const bookPagesInput = document.getElementById('book-pages');
const bookStatusInput = document.getElementById('book-status');
// DOM Render 
const bookTable = document.getElementById('book-table');
const bookTableBody= document.getElementById('book-table-body')
const emptyMessageP = document.getElementById('empty-message');
// DOM Listener
const addBookBtn = document.querySelector('.add-book-btn');
const closeFormDiv = document.querySelector('.close-form');
//==============//


//=== LOCAL STORAGE -> Store books  ===//
const LOCAL_STORAGE_LIBRARY_KEY = 'library.books';
let myLibrary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY)) || [];
let bookIds = 0;
//=====================================//


//=== Book Constructor ===//
class Book {
  constructor (title, author, numPages, readingStatus, bookId) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readingStatus = readingStatus;
    this.bookId = bookId;
  }
} 
//=======================//


//=== Library functions ===//
function inputDefaultValues() {
  if(bookStatusInput.checked == true){
    bookStatusInput.value = 'read';
  } else {
    bookStatusInput.value = 'not read'
  }
  if(bookTitleInput.value == '' ) {
    bookTitleInput.value = '-';
  } 
  if(bookAuthorInput.value == '') {
    bookAuthorInput.value = '-';
  } 
  if(bookPagesInput.value == '') {
    bookPagesInput.type = 'text';
    bookPagesInput.value = '-';
  } else {
      bookPagesInput.type = 'number';
  }
}
function saveLibrary() {
  localStorage.setItem(LOCAL_STORAGE_LIBRARY_KEY, JSON.stringify(myLibrary));
}
function addBookToLibrary() {
  inputDefaultValues();
  const book = new Book(bookTitleInput.value, bookAuthorInput.value, bookPagesInput.value, bookStatusInput.value, bookIds);
  myLibrary.push(book);
  saveLibrary();
  return bookIds += 1;
}
function renderBookList() {
  for(let i = 0; i < myLibrary.length; i++) {
    if(myLibrary.length > 0){
      emptyMessageP.style.display = "none";
      bookTable.style.display = "block";
      const newTableRow = document.createElement('tr');
      newTableRow.classList.add('table-row');
      newTableRow.dataset.bookId = myLibrary[i].bookId;
      newTableRow.innerHTML = 
      `<td>${myLibrary[i].title}</td>
       <td>${myLibrary[i].author}</td>
       <td>${myLibrary[i].numPages}</td>
       <td>${myLibrary[i].readingStatus}</td>
       <td><button class="delete-book table-btn">delete</button></td>`;      
       bookTableBody.appendChild(newTableRow);
    }
  };
};
function updateDisplay(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function resetInputValues() {
  bookTitleInput.value = '';
  bookAuthorInput.value = '';
  bookPagesInput.value = '';
  bookStatusInput.checked = false;
}
function deleteBook(bookToRemove) {
  // remove book from render list
  if(bookToRemove.classList.contains('delete-book')) {
    bookToRemove.parentElement.parentElement.remove();
  };
  // remove book from array myLibrary
  myLibrary = myLibrary.filter((book) => book.bookId != (bookToRemove.parentElement.parentElement.dataset.bookId));
  saveLibrary();
} 
//=========================//

newBookInputs.addEventListener('submit', (e) => {
  e.preventDefault();
  updateDisplay(bookTableBody);
  addBookToLibrary();
  resetInputValues();
  renderBookList(); 
});
// Select parent (bookTableBody) element of all the element that needs to be targeted
bookTableBody.addEventListener('click', (e) => {
  deleteBook(e.target)
  updateDisplay(bookTableBody);
  if(myLibrary.length === 0){
    emptyMessageP.style.display = "flex";
    bookTable.style.display = "none";
  } else {
      renderBookList(); 
  }
});
// hide&show form with "add a book" button
addBookBtn.addEventListener('click', () => {
  if(newBookInputs.style.display === "none") {
    newBookInputs.style.display = "flex";
  } else {
    newBookInputs.style.display = "none"
  }
});
// Close form
closeFormDiv.addEventListener('click', () => {
  newBookInputs.style.display = "none";
  resetInputValues();
});
renderBookList();

