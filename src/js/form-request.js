const URL = '';
const METHOD_POST = 'POST';

const form = document.querySelector('form');
const body = document.querySelector('body');
const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');

const phone = document.querySelector('.phone__input');
const maskOptions = {
  mask: '+{38\\0} (00) 000 00 00',
};
const mask = IMask(phone, maskOptions);

const typeModal = {
  success: '.modal__wrapper-success',
  error: '.modal__wrapper-error',
};

const createModal = (modal, closeButtons = '.modal__close') => {
  (modal = document.querySelector(modal)),
    (closeButtons = document.querySelectorAll(closeButtons));

  modal.style.display = 'flex';
  body.classList.add('locked');

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      modal.style.display = 'none';
      body.classList.remove('locked');
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      body.classList.remove('locked');
    }
  });
};

const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const res = Object.fromEntries(formData);
  const payload = JSON.stringify(res);

  customFetch(payload);
};

const clearValues = () => {
  form.reset();
  mask.destroy();
};

const customFetch = async (payload) => {
  const fetchData = {
    method: METHOD_POST,
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(URL, fetchData);
    let responseChecked;
    if (response.ok) {
      console.log('Request successful');
      responseChecked = response;
      let data = await responseChecked.json();
      createModal(typeModal.success);
      clearValues();
    } else {
      console.log('Request unsuccessful');
      createModal(typeModal.error);
    }
  } catch (error) {
    createModal(typeModal.error);
    throw new Error(error);
  }
};

form.addEventListener('submit', handleSubmit);
