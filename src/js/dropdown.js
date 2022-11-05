const menuLink = document.querySelector('.lang-btn');
const subMenu = document.querySelector('.lang__submenu');
const arrowBtn = document.querySelector('.lang-btn__arrow');
menuLink.addEventListener('click', function (e) {
   e.preventDefault();
   subMenu.classList.toggle('open');
   arrowBtn.classList.toggle('active');
});