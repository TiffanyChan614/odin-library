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
    const overlay = document.querySelector("#overlay");
    form.style.display = "flex";
    overlay.style.display = "block";
}

function hideBookForm() {
    const form = document.querySelector(".form-window");
    const overlay = document.querySelector("#overlay");
    form.style.display = "none";
    overlay.style.display = "none";
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
    addRemoveEvent();
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
    let name = document.createElement("p");
    name.textContent = book.name;
    name.style.fontSize = "1.2rem";
    book_div.appendChild(name);

    let author = document.createElement("p");
    author.textContent = "By " + book.author;
    book_div.appendChild(author);

    let pages = document.createElement("p");
    pages.textContent = book.pages + " page(s)";
    book_div.appendChild(pages);
}

function genBookAction(book_div_ID, book_index) {
    const book_div = document.querySelector(book_div_ID);
    genBtn(book_div, book_index, "read");
    genBtn(book_div, book_index, "remove");
}

function capitalizeFirst(word) {
    let cap_word = word[0].toUpperCase() + word.substring(1);
    return cap_word;
}

function genBtn(book_div, book_index, btn_name) {
    let btn = document.createElement("button");
    btn.type = "button";
    btn.className = btn_name;
    btn.id = `${btn_name}${book_index}`;
    btn.textContent = capitalizeFirst(btn_name);
    book_div.appendChild(btn);
}

function removeRemoveEvent() {
    const btns = document.querySelectorAll(".remove");
    for (let i = 0; i < btns.length; i++) {
        btns[i].removeEventListener('click', e => removeEventHandler(e, i));
    }
}

function addRemoveEvent() {
    const btns = document.querySelectorAll(".remove");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => removeEventHandler(e, i));
    }
}

function removeEventHandler(e, i) {
    e.preventDefault();
    const book = document.querySelector(`#book${i}`);
    book.remove();
    removeBook(myLibrary, i);
    refreshLibrary();
}

function clearBox(element_ID) {
    document.querySelector(element_ID).textContent = "";
}

function removeBook(myLibrary, book_index) {
    myLibrary.splice(book_index, 1);
}

function refreshLibrary() {
    clearBox(".book-container");
    displayBooks(myLibrary);
}

displayBooks(myLibrary);

document.querySelector("#add-btn").addEventListener('click', function(e) {
    e.preventDefault();
    showBookForm();
});

document.querySelector("#confirm-btn").addEventListener('click', function(e) {
    e.preventDefault();
    addBookToLibrary(myLibrary);
    removeRemoveEvent();
    refreshLibrary();
    hideBookForm();

});
