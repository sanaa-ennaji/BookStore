const burgerMenu = document.querySelector('.burger-menu');
const mainNav = document.querySelector('.main-nav');

burgerMenu.addEventListener('click', () => {
  mainNav.classList.toggle('active');
}
);
