let myLibrary = [new Book("The Splendid And The Vile", "Erik Larson", 560, false),
                    new Book("Steve Jobs", "Walter Issacson", 800, false)];

function Book(name, author, pages, read) {
    // the constructor
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function showBookForm() {
    const form = document.querySelector(".form-window");
    form.style.visibility = "visible";
}

function hideBookForm() {
    const form = document.querySelector(".form-window");
    form.style.visibility = "none";
}

function addBookToLibrary(myLibrary) {
    const bookToAdd = getNewBook();
    myLibrary.push(bookToAdd);
}

function getNewBook() {
    let name = document.querySelector("#name").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").value;
    return new Book(name, author, pages, read);
}

function displayBooks(myLibrary) {
    console.log("I have " + myLibrary.length + " books");
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        genBook(book, i);
    }
}

function genBook(book, i){
    console.log(i, book.name);
    genDiv(".book-container", "book", `book${i}`);
    genDiv(`#book${i}`, "book-info", `book${i}-info`);
    genDiv(`#book${i}`, "book-action", `book${i}-action`)
    genBookInfo(book, `#book${i}-info`);
    genBookAction(`#book${i}-action`, i);
}

function genDiv(container, className, element_ID) {
    const div_container = document.querySelector(container);
    let div = document.createElement("div");
    div.className = className;
    div.id = element_ID;
    div_container.appendChild(div);
}

function genBookInfo(book, book_div_ID) {
    const book_div = document.querySelector(book_div_ID);
    const book_info = [book.name, book.author, book.pages, book.read];
    for (let j = 0; j < 4; j++){
        let p = document.createElement("p");
        p.textContent = book_info[j];
        book_div.appendChild(p);
    }
}

function genBookAction(book_div_ID, book_index) {
    const book_div = document.querySelector(book_div_ID);
    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = "remove";
    btn.id = `remove${book_index}`;
    btn.textContent = "Remove";
    book_div.appendChild(btn);
    addRemoveEvent();
}

function addRemoveEvent() {
    document.querySelectorAll(".remove").forEach(btn =>
        btn.addEventListener('click', e => removeEventHandler(e, btn)));
}

function removeEventHandler(e, btn) {
    e.preventDefault();
    e.stoppropagation();
    console.log('click');
    const book = findBookToRemove(btn);
    let book_index = findBookIndex(book);
    book.remove();
    removeBook(myLibrary, book_index);
}

function findBookToRemove(btn) {
    const book_action = btn.parentElement;
    const book = book_action.parentElement;
    return book;
}

function findBookIndex(book) {
    let bookID = book.id;
     return bookID.replace(/[^0-9]+/gi, '');
}

function clearBox(element_ID) {
    document.querySelector(element_ID).textContent = "";
}

function removeBook(myLibrary, book_index) {
    myLibrary.splice(book_index, 1);
}

displayBooks(myLibrary);

document.querySelector("#show-btn").addEventListener('click', function(e) {
    e.preventDefault();
    // showBookForm();
});

document.querySelector("#confirm-btn").addEventListener('click', function(e) {
    e.preventDefault();
    addBookToLibrary(myLibrary);
    clearBox(".book-container");
    // hideBookForm();
    displayBooks(myLibrary);
});
