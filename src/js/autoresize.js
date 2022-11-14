const addAutoResize = () => {
  document.querySelectorAll('[data-autoresize]').forEach((element) => {
    const offset = element.offsetHeight - element.clientHeight;

    element.addEventListener('input', (event) => {
      event.target.style.height = 'auto';
      event.target.style.height = event.target.scrollHeight + offset + 'px';
    });

    element.removeAttribute('data-autoresize');
  });
};

addAutoResize();
