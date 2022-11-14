const list = document.querySelectorAll('.text-info__list');
list.forEach(el => {
   el.addEventListener('click', (e) => {
      const title = el.querySelector('.text-info__item_title')
      const wrapper = el.querySelector('.text-info__item-wrapper')
      const arrowBtn = el.querySelector('.text-info__arrow');
      title.classList.toggle('open');
      arrowBtn.classList.toggle('active');

      if (title.classList.contains('open')) {
         wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
         wrapper.style.opacity = 1;
      }
      else {
         wrapper.style.maxHeight = null;
      }
   });
});