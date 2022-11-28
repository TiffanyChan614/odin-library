let my_library = [new Book("The Splendid And The Vile", "Erik Larson", 560, false),
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

function addBookToLibrary() {
    const name = document.querySelector("#name");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const read = document.querySelector("#read");
    const unread = document.querySelector("#unread");
    const error_dict = validateBook(name, author, pages, read, unread);
    if (Object.keys(error_dict).length === 0){
        let book_to_add = new Book(name.value, author.value, pages.value, read.value);
        my_library.push(book_to_add);
    }
    return error_dict;
}

function displayError(error_dict) {
    for (let error of Object.keys(error_dict)) {
        const error_field = document.querySelector(`#${error}`);
        const error_msg = document.querySelector(error_dict[error]);
        error_field.classList.add("error");
        error_msg.style.display = "block";
    }
}

function hideErrorMsg() {
    const error_msgs = document.querySelectorAll("p.error");
    const error_fields = document.querySelectorAll("input");
    for (let msg of error_msgs) {
        msg.style.display = "none";
    }
    for (let field of error_fields) {
        field.classList.remove("error");
    }
}

function validateBook(name, author, pages, read, unread) {
    let error_dict = {};

    if (name.value === "") {
        error_dict.name = ("#name-error");
    }
    else if (bookExists(name.value, author.value)) {
        error_dict.name = ("#duplicate-error");
    }

    if (author.value === "") {
        error_dict.author = "#author-error";
    }

    if (pages.value.length == 0) {
        error_dict.pages = "#pages-error";
    }
    else if (pages.value <= 0) {
        error_dict.pages = "#negative-error";
    }

    if (!read.checked && !unread.checked) {
       error_dict.read = "#read-error";
    }
    return error_dict;
}

function bookExists(book_name, author) {
    for (let book of my_library) {
        if (book.name === book_name && book.author === author) {
            return true;
        }
    }
    return false;
}

function displayBooks() {
    console.log("I have " + my_library.length + " books");
    for (let i = 0; i < my_library.length; i++) {
        let book = my_library[i];
        genBook(book, i);
    }
    displayStat();
    addRemoveEvent();
    addEditEvent();
    addReadEvent();
}

function genBook(book, i){
    console.log(i, book.name);
    genDiv(".book-container", "book", `book${i}`);
    genDiv(`#book${i}`, "book-info", `book${i}-info`);
    genDiv(`#book${i}`, "book-action", `book${i}-action`)
    genBookInfo(book, `#book${i}-info`);
    genBookAction(`#book${i}-action`, i, book);
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

function genBookAction(book_div_ID, book_index, book) {
    const book_div = document.querySelector(book_div_ID);
    genBtn(book_div, book_index, "read");
    setRead(book, book_index);
    genBtn (book_div, book_index, "edit");
    genBtn(book_div, book_index, "remove");
}

function setRead(book, book_index) {
    const read_btn = document.querySelector(`#read${book_index}`);
    if (!book.read) {
        read_btn.classList.add("false");
        read_btn.textContent = "Unread";
    }
    else {
        read_btn.classList.add("true");
    }
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
    const book_div = document.querySelector(`#book${i}`);
    book_div.remove();
    removeBook(i);
    refreshLibrary();
}

function addReadEvent() {
    const btns = document.querySelectorAll(".read");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => readEventHandler(e, i, btns[i]));
    }
}

function removeReadEvent() {
    const btns = document.querySelectorAll(".read");
    for (let i = 0; i < btns.length; i++) {
        btns[i].removeEventListener('click', e => readEventHandler(e, i, btns[i]));
    }
}

function readEventHandler(e, i, btn) {
    e.preventDefault();
    if (my_library[i].read){
        my_library[i].read = false;
        btn.classList.remove("true");
        btn.classList.add("false");
        btn.textContent = "Unread";
    }
    else {
        my_library[i].read = true;
        btn.classList.remove("false");
        btn.classList.add("true");
        btn.textContent = "Read";
    }
    refreshLibrary();
}

function addEditEvent() {
    const btns = document.querySelectorAll(".edit");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => editEventHandler(e, i));
    }
}

function removeEditEvent() {
    const btns = document.querySelectorAll(".edit");
    for (let i = 0; i < btns.length; i++) {
        btns[i].removeEventListener('click', e => editEventHandler(e, i));
    }
}
function editEventHandler(e, i) {
    e.preventDefault();
    showBookForm();
    let book = my_library[i];
    const name = document.querySelector("#name");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const read = document.querySelector("#read");
    const unread = document.querySelector("#unread");
    name.value = book.name;
    author.value = book.author;
    pages.value = book.pages;
    if (book.read) {
        read.checked = true;
    }
    else {
        unread.checked = true;
    }
    console.log(name.value, author.value, pages.value, read.checked, unread.checked);
}

function clearBox(element_ID) {
    document.querySelector(element_ID).textContent = "";
}

function removeBook(book_index) {
    my_library.splice(book_index, 1);
}

function refreshLibrary() {
    clearBox(".book-container");
    displayBooks();
}

function countRead() {
    let num_read = 0
    for (let book of my_library) {
        if (book.read) {
            num_read++;
        }
    }
    return num_read;
}

function displayStat() {
    const total_p = document.querySelector(".total");
    const total_read_p = document.querySelector(".total-read");
    const total_unread_p = document.querySelector(".total-unread");
    let total = my_library.length;
    let total_read = countRead();
    let total_unread = total - total_read;
    total_p.textContent = `Total Books: ${total}`;
    total_read_p.textContent = `Books Read: ${total_read}`;
    total_unread_p.textContent = `Books Unread: ${total_unread}`;
}

displayBooks();

document.querySelector("#add-btn").addEventListener('click', function(e) {
    e.preventDefault();
    showBookForm();
    removeRemoveEvent();
    removeEditEvent();
    removeReadEvent();
});

document.querySelector(".book-form").addEventListener('submit', function(e) {
    e.preventDefault();
    let error_dict = addBookToLibrary();
    console.log(error_dict);
    hideBookForm();
    if (Object.keys(error_dict).length === 0) {
        refreshLibrary();
        hideErrorMsg();
    }
    else {
        showBookForm();
        hideErrorMsg();
        displayError(error_dict);
    }
});

document.querySelector("#cancel-btn").addEventListener('click', function(e) {
    e.preventDefault();
    hideBookForm();
})

document.querySelector("#clear-btn").addEventListener('click', function(e) {
    e.preventDefault();
    my_library = [];
    refreshLibrary();
})
