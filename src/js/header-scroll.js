const header = document.querySelector('.header');
const headerHeight = header.offsetHeight; //variable to add margin for first element after header
const containHide = () => header.classList.contains("header__hide")
console.log(containHide)
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
   let scrollDistance = window.scrollY;
   if (scrollDistance < lastScrollTop && containHide()) {
      header.classList.remove('header__hide');
   }

   else if (scrollDistance > lastScrollTop && !containHide()) {
      header.classList.add('header__hide');
   }

   if (scrollDistance === 0) {
      header.classList.remove('header__hide');
   }

   lastScrollTop = scrollDistance;
});

