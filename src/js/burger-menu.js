// Mobile menu burger
function burgerMenu() {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const body = document.querySelector('body');
  const menuLink = document.querySelectorAll('.menu__item-link');

  const openMenu = () => {
    menu.classList.add('active');
    burger.classList.add('active-burger');
    body.classList.add('locked');
  };

  const closeMenu = () => {
    menu.classList.remove('active');
    burger.classList.remove('active-burger');
    body.classList.remove('locked');
  };

  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  menuLink.forEach((event) =>
    event.addEventListener('click', () => closeMenu())
  );

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      closeMenu();
    }
  });
}

burgerMenu();
