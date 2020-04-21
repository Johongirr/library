const tableBody = document.querySelector('table tbody');
let myLibrary = [];

 
function Storage(){}
Storage.prototype.setBooksToStore = function(myLibrary){
    const books = this.getBooksFromStore();
    books.push(myLibrary[myLibrary.length - 1])
    localStorage.setItem('books', JSON.stringify(books));
     
 }
 Storage.prototype.getBooksFromStore = function(){
     let books;
     if(JSON.parse(localStorage.getItem('books'))){
         books = JSON.parse(localStorage.getItem('books'));
     } else {
         books = [];
     }
     return books;
 }
 Storage.prototype.deleteFromStore = function(authorName){
    const books = this.getBooksFromStore();
   
     books.forEach((book, index) => {
         if(book.author == authorName.textContent){

             books.splice(index, 1);
            console.log(books,'working!')
            }
     })
      
     localStorage.setItem('books', JSON.stringify(books));
      
 }
 UI.prototype = Object.create(Storage.prototype);
 UI.prototype.constructor = UI;

 Book.prototype = Object.create(UI.prototype);
 Book.prototype.constructor = Book;

 function UI(){}
 UI.prototype.displayBooks = function(){
     this.getBooksFromStore().forEach(book => this.render(book));
 }
 UI.prototype.render = function(book){
    
   
    const tr = document.createElement('tr');
    tr.innerHTML = 
    `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.pages}</td>
         <td>${book.isRead ? `I've read it` : `Did not read yet`}</td>
         <td class="right"><span class="remove">X</span></td>
    `
    tableBody.appendChild(tr);
    this.alert(`${book.title} by ${book.author} is added`, 'success')
    
}
UI.prototype.alert = function(message,className){
    console.log(message,className)
    const alertMessageEl = document.createElement('div');
    alertMessageEl.classList.add('alert');
    alertMessageEl.classList.add(`alert-${className}`);
    alertMessageEl.textContent = message;
    const form = document.querySelector('form');
    document.getElementById('form-container').insertBefore(alertMessageEl, form);
    setTimeout(() => {
        alertMessageEl.remove();
    }, 2000);
}
 

UI.prototype.deleteFromBookList = function(){
    console.log(111)
    document.querySelectorAll('.remove').forEach(removeBtn => removeBtn.addEventListener('click',(e)=>{
        if(e.target.classList.contains('remove')){
            e.target.parentElement.parentElement.remove();
            this.deleteFromStore(e.target.parentElement.parentElement.children[1])
        }
        
    }))
   
} 

 function Book(title,author,pages,read) {
    this.title = title.value;
    this.author = author.value;
    this.pages = pages.value; 
    this.isRead = read.checked;
}
 
 
 function load(){
    new UI().displayBooks();
    new UI().deleteFromBookList()
 }
 document.addEventListener('DOMContentLoaded',load());

 
  
function addBookToLibrary(e) {
  e.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const pages = document.querySelector('#pages');
  const book = new Book(title, author,pages,read);
  console.log(book)
  if(title.value.trim() == '' || author.value.trim() == '' || pages.value.trim() == ''){
    book.alert('Please fill the input fields', 'danger')
  } else {
      myLibrary.push(book);
      book.setBooksToStore(myLibrary);
      book.render(book);
     
      book.deleteFromBookList();
      
  }
  
  

  
//   render();
//   removeFromUi(document.querySelectorAll('.remove'))
   
  title.value = '';
  author.value = '';
  pages.value = '';
 
}

// function render(){
       
// }
// function removeFromUi(removeButtons){
//     removeButtons.forEach(removeBtn => removeBtn.addEventListener('click',(e)=>{
//         if(e.target.classList.contains('remove')){
//             e.target.parentElement.parentElement.style.display = 'none'
//         }
//     }))
// }

 

 



document.querySelector('form').addEventListener('submit',addBookToLibrary);
/*
    Steps to complete library project
    1. when user submits data check if inputs are not empty if so show alert message saying please fill input fields
    2. initialize book object and pass inputs values to be object property
    3. push new intialized object into myLibrary array
    4. pass book object into updateUi to display it on the page
    5. store book object in local storage
    6. add displayBooks to display books each time page loads by gettin book object from localStorage
    7. clicking remove button should remove current row and from localStorage.
*/