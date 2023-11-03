/*
 ** Countdown Timer
 ** Video URL: https://www.youtube.com/watch?v=eFsiOTJrrE8
 */

// The End Of The Year Date
// 1000 milliseconds = 1 Second

let countDownDate = new Date("Dec 31, 2023 23:59:59").getTime();
// console.log(countDownDate);

let counter = setInterval(() => {
  // Get Date Now
  let dateNow = new Date().getTime();

  // Find The Date Difference Between Now And Countdown Date
  let dateDiff = countDownDate - dateNow;

  // Get Time Units
  // let days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML = seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);

/*
 ** Animate Width On Scrolling
 ** Video URL: https://youtu.be/sbIoIKI9FOc
 */

/*
 ** Increase Numbers On Scrolling
 ** Video URL: https://youtu.be/PLsUdgLnzgQ
 */

let progressSpans = document.querySelectorAll(".the-progress span");
let section = document.querySelector(".our-skills");

let nums = document.querySelectorAll(".stats .number");
let statsSection = document.querySelector(".stats");
let started = false; // Function Started ? No

window.onscroll = function () {
  // Skills Animate Width
  if (window.scrollY >= section.offsetTop - 250) {
    progressSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
  // Stats Increase Number
  if (window.scrollY >= statsSection.offsetTop) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}
// JavaScript for filtering articles by category
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-button');
  const articleContainers = document.querySelectorAll('.containe'); // Changed the selector to select the container elements

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const category = button.getAttribute('data-category');

      // Remove the 'active' class from all buttons
      filterButtons.forEach(function (btn) {
        btn.classList.remove('active');
      });

      // Add the 'active' class to the clicked button
      button.classList.add('active');

      // Show or hide articles based on the selected category
      articleContainers.forEach(function (containe) { // Changed the variable name to 'container'
        const articleCategory = containe.getAttribute('data-category'); // Changed the selector to select 'container'

        if (category === 'all' || category === articleCategory) {
          containe.style.display = 'block';
          containe.style.cssText = "display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));gap: 40px;";
        } else {
          containe.style.display = 'none';
        }
      });
    });
  });
});
//validation les input
// reject
function submitForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var message = document.getElementById("message").value;
  var outputDiv = document.getElementById('output');
  var reg = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
  var nameReg = /^[A-Za-z\s]*$/;

  //Clear previous errorsCµ
  document.getElementById("nameError").innerHTML = '';
  document.getElementById("emailError").innerHTML = '';
  document.getElementById("phoneError").innerHTML = '';
  document.getElementById("messageError").innerHTML = '';

  var isValid = true;

  if (name == "" || !nameReg.test(name)) {
    document.getElementById("nameError").innerHTML = "Please enter a valid name without special characters or numbers.";
    isValid = false;
  }

  if (email == "" || !reg.test(email)) {
    document.getElementById("emailError").innerHTML = "Please enter a valid email form with @ and .";
    isValid = false;
  }

  if (phone == "") {
    document.getElementById("phoneError").innerHTML = "Phone number is empty.";
    isValid = false;
  }

  else if (!/^(\+212[-]?\d{9,})$/.test(phone)) {
    document.getElementById("phoneError").innerHTML = "Phone number must start with '+212' and have 9 additional digits";
    isValid = false;
  }

  if (message == "") {
    document.getElementById("messageError").innerHTML = "Text is empty";
    isValid = false;
  }


  if (isValid) {
    var outputText = "Email :" + email + "</br>" + "Phone :" + phone + "</br>" + "Date :" + date + "</br>" + "Text :" + message + "</br>" + "</br>"
    outputDiv.innerHTML += outputText

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";
  }
  else {
    outputDiv.innerHTML = '';
  }

}
//panier
document.addEventListener('DOMContentLoaded', function() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cart');

  // Fonction pour mettre à jour le panier et le localStorage
  function updateCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
  }

  // Fonner pour afficher le panier
  function renderCart() {
      cartList.innerHTML = '';

      cart.forEach((item, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${item.name} x${item.quantity}`;

          // Bouton de suppression
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Supprimer';
          deleteButton.addEventListener('click', function() {
              cart.splice(index, 1);
              updateCart();
          });

          // Champ de quantité
          const quantityInput = document.createElement('input');
          quantityInput.type = 'number';
          quantityInput.value = item.quantity;
          quantityInput.addEventListener('input', function() {
              const newQuantity = parseInt(quantityInput.value);
              if (!isNaN(newQuantity) && newQuantity >= 1) {
                  item.quantity = newQuantity;
                  updateCart();
              }
          });

          listItem.appendChild(deleteButton);
          listItem.appendChild(quantityInput);
          cartList.appendChild(listItem);
      });
  }

  // Écouter les clics sur les boutons "Ajouter au Panier"
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const box = button.closest('.box');
          const id = box.getAttribute('data-id');
          const name = box.querySelector('h3').textContent;

          const existingItem = cart.find(item => item.id === id);

          if (existingItem) {
              existingItem.quantity++;
          } else {
              cart.push({ id, name, quantity: 1 });
          }

          updateCart();
      });
  });

  // Afficher le panier au chargement de la page
  renderCart();
});
