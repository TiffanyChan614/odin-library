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
    form.style.display = "block";
}

function hideBookForm() {
    const form = document.querySelector(".form-window");
    form.style.display = "none";
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

document.querySelector("#show-btn").addEventListener('click', function(e) {
    e.preventDefault();
    showBookForm();
});

document.querySelector("#confirm-btn").addEventListener('click', function(e) {
    e.preventDefault();
    addBookToLibrary(myLibrary);
    clearBox(".book-cards");
    hideBookForm();
    displayBooks(myLibrary);
});

function displayBooks(myLibrary) {
    console.log("I have " + myLibrary.length + " books");

    const book_cards = document.querySelector(".book-cards");

    for (i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        console.log(i, book.name);
        let div = document.createElement("div");
        div.className = "book";
        div.id = `book${i}`
        book_cards.appendChild(div);
        const book_div = document.querySelector(`#book${i}`);
        let book_info = [book.name, book.author, book.pages, book.read];
        for (j = 0; j < 4; j++){
            let p = document.createElement("p");
            p.innerHTML = book_info[j];
            book_div.appendChild(p);
        }
    }
}

function clearBox(elementID) {
    document.querySelector(elementID).innerHTML = "";
}

displayBooks(myLibrary);
