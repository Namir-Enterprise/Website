const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'placeholder не указан';

  const name = 'site-type';
  const items = data.map((item) => {
    let cls = '';
    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected';
    }
    return `
            <li class="select__item ${cls}" data-type="item" tabindex="0" role="option" data-id="${item.id}">${item.value}</li>
        `;
  });
  return `
        <input type="hidden" name=${name} class="hidden__input" required>
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <span data-type="value">${placeholder}</span>
            <span class="select__arrow" data-type="arrow" >
              <span>
              </span>
            <span>
            </span>
        </span>
        </div>
        <div class="select__dropdown">
            <ul class="select__list" role="listbox">
                ${items.join('')}
            </ul>
        </div>
    `;
};
class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.render();
    this.setup();
  }

  render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.setAttribute('tabindex', '0');
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }
  setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;

    this.$el
      .querySelectorAll(`[data-type="item"]`)
      .forEach((el) => el.classList.remove('selected'));
    this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected');

    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');
    this.$arrow.classList.add('open');
  }

  close() {
    this.$el.classList.remove('open');
    this.$arrow.classList.remove('open');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.innerHTML = '';
  }
}

const select = new Select('#select', {
  placeholder: 'Тип сайту:',
  selectedId: '1',
  data: [
    { id: '1', value: 'Лендінг' },
    { id: '2', value: 'Інтернет-магазин на OpenCart' },
    { id: '3', value: 'Інтернет-магазин під ключ' },
    { id: '4', value: 'Розробка сайту на CMS Statamic' },
    { id: '5', value: 'Розробка дизайну' },
    { id: '6', value: 'Розробка мобільного додатку' },
    { id: '7', value: 'Розробка CRM систем' },
  ],
  onSelect(item) {
    const input = document.querySelector('.hidden__input');
    input.value = item.value;
  },
});
