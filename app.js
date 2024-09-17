
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
//rechercher par titer

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const boxes = document.querySelectorAll('.box');
  
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
  
        boxes.forEach(box => {
            const title = box.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
  });
  // recherche par id 
  document.addEventListener('DOMContentLoaded', function() {
    const searchIdInput = document.getElementById('searchId');
    const boxes = document.querySelectorAll('.box');

    searchIdInput.addEventListener('input', function() {
        const searchTerm = searchIdInput.value;

        boxes.forEach(box => {
            const boxId = box.getAttribute('data-id');
            if (boxId === searchTerm) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

//pagenation
document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    
    let currentPage = 1;

    function showPage(page) {
        boxes.forEach(box => {
            if (box.getAttribute('data-page') === page.toString()) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    }

    showPage(currentPage);

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    nextPageButton.addEventListener('click', function() {
        if (currentPage < 2) {
            currentPage++;
            showPage(currentPage);
        }
    });
});


/*suppreme une box */
document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-box');

    // Ajouter un gestionnaire d'événements aux boutons de suppression
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const box = button.closest('.box');
            box.remove(); // Supprimez la boîte du DOM lorsque le bouton est cliqué
        });
    });
});
