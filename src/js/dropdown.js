const btnLink = document.querySelector('.lang-btn');
const subMenu = document.querySelector('.lang__submenu');
const arrowBtn = document.querySelector('.lang-btn__arrow');
btnLink.addEventListener('click', (event) => {
  event.preventDefault();
  subMenu.classList.toggle('open');
  arrowBtn.classList.toggle('active');
});

document.addEventListener('scroll', () => {
  subMenu.classList.remove('open');
  arrowBtn.classList.remove('active');
});

document.addEventListener('click', (event) => {
  const withinBoundaries = event.composedPath().includes(btnLink);
  if (!withinBoundaries) {
    subMenu.classList.remove('open');
    arrowBtn.classList.remove('active');
  }
});
