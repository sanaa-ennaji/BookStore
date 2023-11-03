// index.js
let form = document.querySelector("#bookForm");
form.addEventListener("submit", newBook);
let bookList = document.querySelector("#bookList");
bookList.addEventListener("click", removeBook);
let filter = document.querySelector("#filter");
filter.addEventListener("keyup", searchBook);

class BOOK {
  constructor(title, author, isbn, image, description, categorie, prix, quantity, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.image = image;
    this.description = description;
    this.categorie = categorie;
    this.prix = prix;
    this.quantity = quantity;
    this.availability = availability;
  }
}
class UI {
  static addBook(book) {
    let booksContainer = document.querySelector("#bookList");
    let card = document.createElement("div");
    card.className = "book-card";

    // HTML for the book card
    card.innerHTML =
      card.innerHTML = `
    <img src="${book.image}" alt="Book Cover" class="book-image">
    <div class="book-details">
      <h2 class="book-title">${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>ISBN:</strong> <span class="book-isbn">${book.isbn}</span></p>
      <p><strong>Description:</strong> ${book.description}</p>
      <p><strong>Categorie:</strong> ${book.categorie}</p>
      <p><strong>Prix:</strong> ${book.prix}</p>
      <p><strong>Quantité en stock:</strong> ${book.quantity}</p>
      <p><strong>Disponibilité:</strong> ${book.availability}</p>
      <button class="add-to-cart">Ajouter au panier</button>
      <a class="delete" href="#">Remove</a>
      <button class="edit-book">Edit</button>
    
  </div>`;


    booksContainer.appendChild(card);
  }

  static showAlert(message, className) {
    let div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    let container = document.querySelector(".container");
    let form = document.querySelector("#bookForm");
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static removeBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.remove(); // Remove the parent element (the book card)
      let delIsbn = target.parentElement.querySelector(".book-isbn").textContent.trim();
      UI.removeBookFromLs(delIsbn);
      UI.showAlert("Book Removed Successfully", "success");
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
    document.querySelector("#image").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#categorie").value = "";
    document.querySelector("#prix").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#availability").value = "";
  }

  static findBook(bookName) {
    let bookList = document.querySelector("#bookList");
    bookList.querySelectorAll("tr").forEach((element) => {
      let ele1 = element.children[0].textContent.toLowerCase();
      let ele2 = element.children[1].textContent.toLowerCase();
      let ele3 = element.children[2].textContent.toLowerCase();
      if (
        ele1.indexOf(bookName) == -1 &&
        ele2.indexOf(bookName) == -1 &&
        ele3.indexOf(bookName) == -1
      ) {
        element.style.display = "none";
      } else {
        element.style.display = "table-row";
      }
    });
  }

  static removeBookFromLs(isbn) {
    let ele = STORE.getBooks();
    ele.forEach((book, index) => {
      if (book.isbn == isbn) {
        ele.splice(index, 1)
      }
    })
    localStorage.setItem("bookList", JSON.stringify(ele));
  }
}
class STORE {
  static getBooks() {
    let bookList;
    if (localStorage.getItem("bookList") == null) {
      bookList = [];
    } else {
      bookList = JSON.parse(localStorage.getItem("bookList"));
    }
    return bookList;
  }

  static setBook(book) {
    let bookLists = STORE.getBooks();
    bookLists.push(book);
    localStorage.setItem("bookList", JSON.stringify(bookLists));
  }

  static removeBookFromLs(isbn) {
    let ele = STORE.getBooks();
    ele.forEach((book, index) => {
      if (book.isbn == isbn) {
        ele.splice(index, 1);

        // Remove the image data associated with the book
        URL.revokeObjectURL(book.image); // This frees up resources associated with the image
      }
    });
    localStorage.setItem("bookList", JSON.stringify(ele));
  }

  static displayBook() {
    let bookLists = STORE.getBooks();
    bookLists.forEach((books) => {
      UI.addBook(books);
    });
  }
}

document.addEventListener("DOMContentLoaded", STORE.displayBook());
// Updated code for adding and removing a book, including image data

function newBook(e) {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let isbn = document.querySelector("#isbn").value;
  let imageInput = document.querySelector("#image"); // Updated to get the image input element
  let description = document.querySelector("#description").value;
  let categorie = document.querySelector("#categorie").value;
  let prix = document.querySelector("#prix").value;
  let quantity = document.querySelector("#quantity").value;
  let availability = document.querySelector("#availability").value;

  if (title === "" || author === "" || isbn === "" || !imageInput.files[0] || description === "" || categorie === "" || prix === "" || quantity === "" || availability === "") {
    UI.showAlert("Please fill all fields, including selecting an image", "error");
  } else {
    let imageFile = imageInput.files[0]; // Get the selected image file

    let reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = function () {
      let imageDataUrl = reader.result;
      let book = new BOOK(title, author, isbn, imageDataUrl, description, categorie, prix, quantity, availability);
      UI.addBook(book);
      UI.clearFields();
      UI.showAlert("Book added", "success");
      STORE.setBook(book);
    };
  }
}

function removeBook(e) {
  console.log('Remove button clicked'); // Add this line to check if the function is called
  if (e.target.classList.contains("delete")) {
    const bookCard = e.target.parentElement;
    const isbn = bookCard.querySelector(".book-isbn").textContent.trim();

    // Remove the book from local storage and remove the image data
    STORE.removeBookFromLs(isbn);

    // Remove the book card from the UI
    bookCard.remove();

    UI.showAlert("Book Removed Successfully", "success");
  }
}



function searchBook(e) {
  let bookName = e.target.value.toLowerCase();
  UI.findBook(bookName);
}
// Add these lines in your index.js file after the newBook, removeBook, and searchBook functions

bookList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    addToCart(e.target.parentElement);
  } else if (e.target.classList.contains("remove-book")) {
    removeBook(e.target.parentElement);
  }
});

function addToCart(bookCard) {
  const bookTitle = bookCard.querySelector(".book-title").textContent;

}


const editButtons = document.querySelectorAll(".edit-book");
editButtons.forEach((editButton, index) => {
  editButton.addEventListener("click", () => {
    const editForm = editButton.nextElementSibling; // Get the edit form next to the clicked "Edit" button
    // Retrieve the current values of the book and populate the edit form fields
    const bookTitle = editButton.parentElement.querySelector(".book-title").textContent;
    const bookAuthor = editButton.parentElement.querySelector(".book-author").textContent;
    // Retrieve other properties like ISBN, description, etc.
    const bookISBN = editButton.parentElement.querySelector(".book-isbn").textContent;
    const bookDescription = editButton.parentElement.querySelector(".book-description").textContent;
    // Set the current values in the edit form
    editForm.querySelector(".edit-title").value = bookTitle;
    editForm.querySelector(".edit-author").value = bookAuthor;
    // Set other property values
    editForm.querySelector(".edit-isbn").value = bookISBN;
    editForm.querySelector(".edit-description").value = bookDescription;
    // Display the edit form
    editForm.style.display = "block";
  });
});

const saveButtons = document.querySelectorAll(".save-changes");
saveButtons.forEach((saveButton, index) => {
  saveButton.addEventListener("click", () => {
    const editForm = saveButton.parentElement;
    // Retrieve the new values from the form
    const newTitle = editForm.querySelector(".edit-title").value;
    const newAuthor = editForm.querySelector(".edit-author").value;
    // Retrieve new values for other properties (ISBN, description, etc.)
    const newISBN = editForm.querySelector(".edit-isbn").value;
    const newDescription = editForm.querySelector(".edit-description").value;
    // Update the card content with the new values
    const bookCard = saveButton.parentElement.parentElement; // Get the parent book card
    bookCard.querySelector(".book-title").textContent = newTitle;
    bookCard.querySelector(".book-author").textContent = newAuthor;
    // Update other property values
    bookCard.querySelector(".book-isbn").textContent = newISBN;
    bookCard.querySelector(".book-description").textContent = newDescription;
    // Hide the edit form
    editForm.style.display = "none";
  });
});

