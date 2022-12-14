function CustomSelect(options) {
  const ENTER_KEY_CODE = 13;
  const ESCAPE_KEY_CODE = 27;
  const arrow = document.querySelector('[data-type="arrow"]');
  const value = document.querySelector('[data-type="value"]');
  const elem = options.elem;

  elem.addEventListener('click', (event) => {
    if (event.target.className == 'select__input') {
      toggle();
    } else if (event.target.tagName == 'LI') {
      setValue(event.target.innerHTML, event.target.dataset.value);
      value.style.fontSize = '20px';
      value.style.color = '#dadada';
      close();
    }
  });

  // Accessible Drop Down
  elem.addEventListener('keydown', (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      open();
      if (event.target.tagName == 'LI') {
        setValue(event.target.innerHTML, event.target.dataset.value);
        value.style.fontSize = '20px';
        value.style.color = '#dadada';
        close();
      }
    }
    if (event.keyCode === ESCAPE_KEY_CODE) {
      toggle();
    }
  });

  let isOpen = false;

  function onDocumentClick(event) {
    if (!elem.contains(event.target)) close();
  }

  const setValue = (title, value) => {
    elem.querySelector('.title').innerHTML = title;

    let widgetEvent = new CustomEvent('select', {
      bubbles: true,
      detail: {
        title: title,
        value: value,
      },
    });

    elem.dispatchEvent(widgetEvent);
  };

  const toggle = () => {
    if (isOpen) close();
    else open();
  };

  const open = () => {
    elem.classList.add('open');
    arrow.classList.add('open');
    document.addEventListener('click', onDocumentClick);
    isOpen = true;
  };

  const close = () => {
    elem.classList.remove('open');
    arrow.classList.remove('open');
    document.removeEventListener('click', onDocumentClick);
    isOpen = false;
  };
}

const formSelect = new CustomSelect({
  elem: document.querySelector('#select'),
});

document.addEventListener('select', (event) => {
  const select = document.querySelector('#select-value');
  select.setAttribute('value', `${event.detail.value}`);
});
