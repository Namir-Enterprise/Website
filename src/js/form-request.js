const URL = 'https://reqres.in/api/users/2';
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
  success: {
    status: 'success',
    picture: 'icon_success',
    title: 'Заявку успішно прийнято!',
    text: 'Дякуємо за довіру! Ми обов’язково обробимо заявку і зв’яжемось з вами найближчим часом',
  },
  error: {
    status: 'error',
    picture: 'icon_error',
    title: 'Помилка!',
    text: 'Щось пішло не так. Будь ласка, спробуйте відправити дані ще раз.',
  },
};

const createModal = (
  type,
  modal = '.modal__wrapper',
  close = '.modal__close'
) => {
  const modalWindow = `
          <div class="modal__wrapper">
          <div class="modal ${type.status}">
              <img src="./img/icons/${type.picture}.svg" class="modal__picture" alt="icon">
              <div class="modal__title"><span>${type.title}</span> </div>
              <div class="modal__body">
                  <p class="modal__body-text">${type.text}</p>
              </div>
              <button class="modal__close">Зрозуміло</button>
          </div>
      </div>
          `;
  form.insertAdjacentHTML('afterend', modalWindow);

  (modal = document.querySelector(modal)),
    (close = document.querySelector(close));

  modal.style.display = 'flex';
  body.classList.add('locked');

  close.addEventListener('click', () => {
    modal.style.display = 'none';
    body.classList.remove('locked');
    modal.remove();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      body.classList.remove('locked');
      modal.remove();
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
