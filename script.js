function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggle = function () {
    console.log(this.read);
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
    let title = prompt("Please enter the book title", "Harry Potter");
    let author = prompt("Please enter book author", "JK Rowling");
    let pages = prompt("Please enter number of pages", 300)
    let read = prompt("Have you read this book?", true)
    let newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayBooks(myLibrary)
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

document.getElementById("add-book").addEventListener('click', function() {
    createBook();
});

