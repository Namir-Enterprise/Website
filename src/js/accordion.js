// Accordion
function accordion() {
  const items = document.querySelectorAll('.accordion-item__control');

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const parent = item.parentNode;
      const content = parent.querySelector('.accordion-item__content');

      if (parent.classList.contains('open')) {
        parent.classList.remove('open');
        content.style.maxHeight = null;
      } else {
        document
          .querySelectorAll('.accordion-item')
          .forEach((child) => child.classList.remove('open'));
        document
          .querySelectorAll('.accordion-item__content')
          .forEach((cum) => (cum.style.maxHeight = null));
        parent.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = 1;
      }
    });
  });
}

accordion();
