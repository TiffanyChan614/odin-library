// Book factory
const Book = (name, author, pages, read) => {
    return {name, author, pages, read};
}

// Library factory
const Library = (books) => {

    const updateLibrary = () => {
        total = books.length;
        total_read = countRead();
        total_unread = total - total_read;
    }
    const addBook = (book) => {
        books.push(book);
    }
    const bookExists = (target_book_name, target_book_author) => {
        for (let book of books) {
            if (target_book_name === book.name && target_book_author === book.author) {
                return true;
            }
        }
        return false;
    }
    const countRead = () => {
        let num_read = 0;
        for (let book of books) {
            if (book.read) {
                num_read++;
            }
        }
        return num_read;
    }

    const getBooks = () => {
        return books;
    }

    const removeBook = (book_index) => {
        books.splice(book_index, 1);
    }

    let total = books.length;
    let total_read = countRead();
    let total_unread = total - total_read;

    const getTotal = () => {
        return total;
    }

    const getTotalRead = () => {
        return total_read;
    }

    const getTotalUnread = () => {
        return total_unread;
    }

    return {updateLibrary, addBook, removeBook, bookExists, getBooks, getTotal, getTotalRead, getTotalUnread};
}

// DOM elements factory
const dom_elements = (library) => {
    const form = document.querySelector(".form-window");
    const overlay = document.querySelector("#overlay");
    const book_name = document.querySelector("#name");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const read = document.querySelector("#read");
    const unread = document.querySelector("#unread");
    const total_p = document.querySelector(".total");
    const total_read_p = document.querySelector(".total-read");
    const total_unread_p = document.querySelector(".total-unread");
    const book_form = document.querySelector(".book-form");
    const clear_btn = document.querySelector("#clear-btn");
    const cancel_btn = document.querySelector("#cancel-btn");
    const add_btn = document.querySelector("#add-btn");
    const error_msgs = document.querySelectorAll(".error-msg");
    const error_fields = document.querySelectorAll("input");

    let error_dict = {};

    const showBookForm = () => {
        form.style.display = "flex";
        overlay.style.display = "block";
    }

    const hideBookForm = () => {
        form.style.display = "none";
        overlay.style.display = "none";
    }

    const displayError = () => {
        for (let error of Object.keys(error_dict)) {
            const error_field = document.querySelector(`#${error}`);
            const error_msg = document.querySelector(error_dict[error]);
            error_field.classList.add("error");
            error_msg.style.display = "block";
        }
    }

    const hideErrorMsg = () => {
        for (let msg of error_msgs) {
            msg.style.display = "none";
        }
        for (let field of error_fields) {
            field.classList.remove("error");
        }
    }

    const validateBookInfo = (name, author, pages, read, unread) => {
        if (name.value === "") {
            error_dict.name = ("#name-error");
        }

        else if (library.bookExists(name.value, author.value)) {
            error_dict.name = ("#duplicate-error");
        }

        if (author.value === "") {
            error_dict.author = "#author-error";
        }

        if (pages.value.length === 0) {
            error_dict.pages = "#pages-error";
        }
        else if (pages.value <= 0) {
            error_dict.pages = "#negative-error";
        }

        if (!read.checked && !unread.checked) {
            error_dict.read = "#read-error";
        }

        return error_dict;;
    }

    const genDiv = (container, className, element_ID) => {
        const div_container = document.querySelector(container);
        let div = document.createElement("div");
        div.className = className;
        div.id = element_ID;
        div_container.appendChild(div);
    }

    const genBookInfo = (book, book_div_ID) => {
        const book_div = document.querySelector(book_div_ID);
        let name = document.createElement("h3");
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

    const genBookAction = (book_div_ID, book_index, book) => {
        const book_div = document.querySelector(book_div_ID);
        genBtn(book_div, book_index, "read");
        setReadBtn(book, book_index);
        genBtn(book_div, book_index, "edit");
        genBtn(book_div, book_index, "remove");
    }

    const genBook = (book, i) => {
        genDiv(".book-container", "book", `book${i}`);
        genDiv(`#book${i}`, "book-info", `book${i}-info`);
        genDiv(`#book${i}`, "book-actions", `book${i}-action`);
        genBookInfo(book, `#book${i}-info`);
        genBookAction(`#book${i}-action`, i, book);
    }

    const setReadBtn = (book, book_index) => {
        const read_btn = document.querySelector(`#read${book_index}`);
        if (!book.read) {
            read_btn.classList.add("false");
            read_btn.textContent = "Unread";
        }
        else {
            read_btn.classList.add("true");
        }
    }

    const capitalizeFirst = (word) => {
        return word[0].toUpperCase() + word.substring(1);
    }

    const genBtn = (book_div, book_index, btn_name) => {
        let btn = document.createElement("button");
        btn.type = "button";
        btn.className = btn_name;
        btn.id = `${btn_name}${book_index}`;
        btn.textContent = capitalizeFirst(btn_name);
        book_div.appendChild(btn);
    }

    const getNewBook = () => {
        error_dict = validateBookInfo(book_name, author, pages, read, unread)
        let isRead;
        if (read.checked) {
            isRead = true;
        }
        else {
            isRead = false;
        }
        if (Object.keys(error_dict).length === 0) {
            return Book(book_name.value, author.value, pages.value, isRead);
        }
        return null;
    }

    const clearBox = (element_ID) => {
        document.querySelector(element_ID).textContent = "";
    }

    const displayBooks = () => {
        let books = library.getBooks();
        for (let i = 0; i < books.length; i++) {
            let book = books[i];
            genBook(book, i);
        }
        displayStat();
        addRemoveEvent();
        addEditEvent();
        addReadEvent();
    }

    const displayStat = () => {
        library.updateLibrary();
        let total = library.getTotal();
        let total_read = library.getTotalRead();
        let total_unread = library.getTotalUnread();
        total_p.textContent = `Total Books: ${total}`;
        total_read_p.textContent = `Books Read: ${total_read}`;
        total_unread_p.textContent = `Books Unread: ${total_unread}`;
    }

    const resetForm = () => {
        book_form.reset();
    }

    const refreshLibrary = () => {
        clearBox(".book-container");
        displayBooks(library);
    }

    const removeEventHandler = (e, i) => {
        e.preventDefault();
        const book_div = document.querySelector(`#book${i}`);
        book_div.remove();
        library.removeBook(i);
        refreshLibrary();
    }

    const addRemoveEvent = () => {
        const remove_btns = document.querySelectorAll(".remove");
        for (let i = 0; i < remove_btns.length; i++) {
            remove_btns[i].addEventListener('click', e => removeEventHandler(e, i));
        }
    }

    const removeRemoveEvent = () => {
        const remove_btns = document.querySelectorAll(".remove");
        for (let i = 0 ; i < remove_btns.length; i++) {
            remove_btns[i].addEventListener('click', e => removeEventHandler(e, library, i));
        }
    }

    const readEventHandler = (e, books, i, btn) => {
        e.preventDefault();
        if (books[i].read){
            books[i].read = false;
            btn.classList.remove("true");
            btn.classList.add("false");
            btn.textContent = "Unread";
        }
        else {
            books[i].read = true;
            btn.classList.remove("false");
            btn.classList.add("true");
            btn.textContent = "Read";
        }
        refreshLibrary();
    }

    const addReadEvent = () => {
        const read_btns = document.querySelectorAll(".read");
        for (let i = 0; i < read_btns.length; i++) {
            read_btns[i].addEventListener('click', e => readEventHandler(e,library.getBooks(), i, read_btns[i]));
        }
    }

    const removeReadEvent = () => {
        const read_btns = document.querySelectorAll(".read");
        for (let i = 0; i < read_btns.length; i++) {
            read_btns[i].removeEventListener('click', e => readEventHandler(e, library.getBooks(), i, read_btns[i]));
        }
    }

    const editEventHandler = (e, i)  => {
        e.preventDefault();
        showBookForm();
        let book = library.getBooks()[i];
        book_name.value = book.name;
        author.value = book.author;
        pages.value = book.pages;
        if (book.read) {
            read.checked = true;
        }
        else {
            unread.checked = true;
        }
        library.removeBook(i);
    }

    const addEditEvent = () => {
        const edit_btns = document.querySelectorAll(".edit");
        for (let i = 0; i < edit_btns.length; i++) {
            edit_btns[i].addEventListener('click', e => editEventHandler(e, i));
        }
    }

    const removeEditEvent = () => {
        const edit_btns = document.querySelectorAll(".edit");
        for (let i = 0; i < edit_btns.length; i++) {
            edit_btns[i].removeEventListener('click', e => editEventListener(e, i));
        }
    }

    const addAddEvent = () => {
        add_btn.addEventListener('click', (e) => {
            e.preventDefault();
            showBookForm();
            removeRemoveEvent();
            removeEditEvent();
            removeReadEvent();
        })
    }

    const addSubmitEvent = () => {
        book_form.addEventListener('submit', (e) => {
            e.preventDefault();
            let book = getNewBook();
            if (book !== null) {
                library.addBook(book);
                hideBookForm();
                refreshLibrary();
                resetForm();
                hideErrorMsg();
            }
            else {
                showBookForm();
                hideErrorMsg();
                displayError(error_dict);
                error_dict = {};
            }
        })
    }

    const addCancelEvent = () => {
        cancel_btn.addEventListener('click', (e) => {
            e.preventDefault();
            hideErrorMsg();
            resetForm();
            hideBookForm();
        })
    }

    const addClearEvent = () => {
        clear_btn.addEventListener('click', (e) => {
            e.preventDefault();
            library = Library();
            refreshLibrary();
        })
    }

    return {displayBooks, addAddEvent, addSubmitEvent, addCancelEvent, addClearEvent};
};

let books = [Book("The Splendid And The Vile", "Erik Larson", 560, false),
                    Book("Steve Jobs", "Walter Issacson", 800, false)];

let my_library = Library(books);
let dom_elem = dom_elements(my_library);
dom_elem.displayBooks();
dom_elem.addAddEvent();
dom_elem.addCancelEvent();
dom_elem.addClearEvent();
dom_elem.addSubmitEvent();
