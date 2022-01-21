class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggle(){
        if (this.read == "true"){
            return "false";
        }
        else if (this.read == "false") {
            return "true";
        }
        else {
            return "false";
        }
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function addTableHeaders(table) {
    let header = document.createElement("tr");
    let title = document.createElement("th");
    title.textContent = "Title";
    header.appendChild(title);
    let author = document.createElement("th");
    author.textContent = "Author";
    header.appendChild(author);
    let pages = document.createElement("th");
    pages.textContent = "Pages";
    header.appendChild(pages);
    let read = document.createElement("th");
    read.textContent = "Read";
    header.appendChild(read);
    let remove = document.createElement("th");
    remove.textContent = "Remove Entry";
    header.appendChild(remove);
    let toggle = document.createElement("th");
    toggle.textContent = "Toggle Read";
    header.appendChild(toggle);
    table.appendChild(header);
}

function addButtons(row) {
    let remove = document.createElement("td");
    let removeButton  = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.setAttribute('class', "remove");
    remove.appendChild(removeButton);
    let toggle = document.createElement("td");
    let toggleButton  = document.createElement("button");
    toggleButton.setAttribute('class', "toggle");
    toggleButton.textContent = "Toggle";
    toggle.appendChild(toggleButton);
    row.appendChild(remove);
    row.appendChild(toggle);
}

function displayBooks(library){
    const table = document.getElementById("book-table");
    removeAllChildNodes(table);
    addTableHeaders(table);
    for (let x = 0; x<library.length; x++) {
        let book = library[x];
        let row = document.createElement("tr");
        for (let key in book) {
            if(key !== "toggle"){
            let column = document.createElement("td");
            column.textContent = book[key];
            row.appendChild(column);
            }
        }
        addButtons(row);
        table.appendChild(row);
        row.setAttribute('id', x);
    }
    buttonListeners();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createBook() {
    let check = checkValues();
    if(check){
    // let title = prompt("Please enter the book title", "Harry Potter");
    // let author = prompt("Please enter book author", "JK Rowling");
    // let pages = prompt("Please enter number of pages", 300)
    // let read = prompt("Have you read this book?", true)
    let newBook = getInfo();
    //let newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayBooks(myLibrary)
    _clearForm();
    closeForm();
    }
}

function checkValues(){
    let title = document.getElementById('book').validity.valid;
    let author = document.getElementById('author').validity.valid;
    let pages = document.getElementById('pages').validity.valid;
    let read = document.getElementById('read').validity.valid;

    console.log(title + author + pages + read);

    if(title == false || author == false || pages == false || read == false){
        return false
    }
    else {
        return true;
    }

}

function getInfo(){
    let title = document.getElementById('book').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value;
    
    let book = new Book(title, author, pages, read);
    return book;
}

function openForm(){
    let form = document.getElementById("book-form")
    form.style.display = "block";
}

function closeForm() {
    let form = document.getElementById("book-form")
    _clearForm();
    form.style.display = "none";
  }

  function _clearForm(){
    const forms = document.getElementsByClassName('input');
    for(let i=0;i<forms.length;i++){
        forms[i].value = "";
    }
  }

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks(myLibrary);
}

function buttonListeners (){
    let removeList = document.getElementsByClassName("remove");
    for (let i=0;i<removeList.length;i++) {
        removeList[i].addEventListener('click', function() {
            let parent = event.target.parentNode;
            let index = parent.parentNode.id;
            removeBook(index);
        });
    }
    
    let toggleList = document.getElementsByClassName("toggle");
    for (let i=0;i<toggleList.length;i++) {
        toggleList[i].addEventListener('click', function() {
            let parent = event.target.parentNode;
            let index = parent.parentNode.id;
            let book = myLibrary[index];
            book.read = book.toggle();
            displayBooks(myLibrary);
            let grandparent = parent.parentNode;
        });
    }
    }



let myLibrary = [];

let gameOfThrones = new Book("Game of Thrones", "George R.R. Martin", 800, true);
let goodOmens = new Book("Good Omens", "Neil Gaiman & Terry Pratchett", 350, true);
addBookToLibrary(gameOfThrones);
addBookToLibrary(goodOmens);
displayBooks(myLibrary);

let addBook = document.getElementById('add-form');
addBook.addEventListener('click', function() {
    createBook();
});

document.getElementById("add-book").addEventListener('click', function() {
    openForm();
});



