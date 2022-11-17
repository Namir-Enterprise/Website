// Dropdown
const btnLink = document.querySelector('.lang-btn');
const subMenu = document.querySelector('.lang__submenu');
const arrowBtn = document.querySelector('.lang-btn__arrow');

btnLink.addEventListener('click', (event) => {
  event.preventDefault();
  subMenu.classList.toggle('open');
  arrowBtn.classList.toggle('active');
  btnLink.classList.toggle('open');
});

const closeDropdownMenu = () => {
  subMenu.classList.remove('open');
  arrowBtn.classList.remove('active');
  btnLink.classList.remove('open');
};

document.addEventListener('scroll', () => closeDropdownMenu());

document.addEventListener('click', (event) => {
  const withinBoundaries = event.composedPath().includes(btnLink);
  if (!withinBoundaries) {
    closeDropdownMenu();
  }
});
