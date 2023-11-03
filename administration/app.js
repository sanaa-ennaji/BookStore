// Book Class : Represent a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI Class : Perform UI related task/operations
class UI {
    // Display Books
    static dislayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    // Add Book
    static addBookToList(book) {
        const booklist = document.querySelector("#book-list");

        const row = document.createElement('tr');

        row.innerHTML =
            `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class ="btn btn-danger btn-sm delete">X
                </a>
            </td>
        `;

        booklist.appendChild(row);
    }

    // Clear Fields
    static clearFields() {
        document.querySelectorAll("#title,#author,#isbn").forEach(e => e.value = '')
        document.querySelector('#title').focus();
    }

    // Remove Book
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    // Alert Message
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// Storage Class - Handles Storage
class Store {

    static getBooks() {
        let books;

        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBookToLocalStorage(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBookFromLocalStorage(isbn) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event : Display Books
document.addEventListener('DOMContentLoaded', UI.dislayBooks);

// Event : Add Book
window.onload = function () {
    document.querySelector('#book-form').addEventListener('submit', (e) => {

        // Prevent Actual Submit
        e.preventDefault();

        //Get form Value(s);
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

        // Validate the form
        if (title === '' || author === '' || isbn === '') {
            UI.showAlert('Please fill all the fields', 'danger');

        } else {
            //Instatiate book
            const newbookadded = new Book(title, author, isbn);

            // Add book to UI
            UI.addBookToList(newbookadded);

            // Add book to Local Storage
            Store.addBookToLocalStorage(newbookadded);

            // Show success message
            UI.showAlert('Book Added!', 'success');

            // Clear fields
            UI.clearFields();
        }
    });

    // Event : Remove Book
    document.querySelector('#book-list').addEventListener('click', (e) => {

        // Remove book from UI
        UI.deleteBook(e.target);

        // Remove book from Local Storage
        Store.removeBookFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);

        UI.showAlert('Book Removed!', 'success');
    })
}
//logine
document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      if ( 0 <= password && password <= 99999999 ) {
        if (username === "yassine" && password === "00000000") {
          // Redirigez l'utilisateur vers la page d'accueil ou effectuez d'autres actions
          window.location.href = "admin.html";
        } else {
          errorMessage.textContent =
            "Nom d'utilisateur ou mot de passe incorrect.";
        }
      } else {
        errorMessage.textContent = "mot de passe inf de 8 caracter.";
      }
    });
  });