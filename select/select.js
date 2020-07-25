const getTemplate = (data = [], placeholder, selectedId) => {
    let text = placeholder ?? '--Select--';

    const items = data.map(item => {
        let classItem = '';
        if (item.id === selectedId) {
            text = item.value;
            classItem = 'selected';
        }
        return `
            <li class="select__item ${ classItem }" data-type="item" data-id="${ item.id }">${ item.value }</li>
        `;
    });

    return `
        <div class="select__drop" data-type="drop"></div>
        <div class="select__input" data-type="input">
                <span data-type="value">${ text }</span>
                <span class="arrow" data-type="arrow"><span></span><span></span></span>
            </div>
            <div class="select__dropdown">
                <ul class="select__list">
                    ${ items.join('') }
                </ul>
            </div>
    `;
};

export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;
        this.multiple = options.multiple ? options.multiple : false;

        this.#render();
        this.#setup();
    }

    #render() {
        const { placeholder, data } = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$value = this.$el.querySelector('[data-type="value"]');
    }

    clickHandler(event) {
        const { type } = event.target.dataset;
        if (type === 'input') {
            this.toggle();
        } else if (type === 'item') {
            const id = event.target.dataset.id;
            this.select(id);
        } else if (type === 'drop') {
            this.close();
        }
    }

    get isOpen() {
        return this.$el.classList.contains('open');
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    get multipleResult() {
        let arrayResult = [];

        this.$el.querySelectorAll('[data-type="item"].selected').forEach(el => arrayResult.push({
            id: el.dataset.id,
            value: el.textContent
        }));

        return arrayResult;
    }

    select(id) {
        this.selectedId = id;

        if (this.multiple) {
            if (this.$value.textContent.length && !this.$value.textContent.includes(this.current.value)) {
                this.$value.textContent += ', ' + this.current.value;
                this.$el.querySelector(`[data-id="${ id }"]`).classList.add('selected');

                this.options.onSelect ? this.options.onSelect(this.multipleResult) : null;
            } else {
                this.$el.querySelector(`[data-id="${ id }"]`).classList.remove('selected');
                this.$value.textContent = this.$value.textContent
                    .replace(`${ this.current.value }`, '')
                    .trim()
                    .replace(/,$/, '')
                    .trim()
                    .replace(/^,/, '')
                    .trim();

                this.options.onSelect ? this.options.onSelect(this.multipleResult) : null;
            }
        } else {
            this.$value.textContent = this.current.value;
            this.$el.querySelectorAll('[data-type="item"]').forEach(el => el.classList.remove('selected'));
            this.$el.querySelector(`[data-id="${ id }"]`).classList.add('selected');
            this.options.onSelect ? this.options.onSelect(this.current) : null;
            this.close();
        }
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.$el.classList.add('open');
    }

    close() {
        this.$el.classList.remove('open');
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';
    }
}