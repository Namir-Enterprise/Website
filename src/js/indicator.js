// Indicator in workflow section
const list = document.querySelectorAll('.list__item');

const activeLink = (event) => {
  event.preventDefault();
  list.forEach((item) => item.classList.remove('active'));
};

list.forEach((item) => item.addEventListener('click', activeLink));
