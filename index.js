import { Select } from './select/select';
import './select/style.scss';
import 'babel-polyfill';
import { dataItem } from './service/data.js';

const select = new Select('#select', {
    placeholder: 'Select element',
    selectedId: '1',
    multiple: true,
    data: [
        { id: '1', value: 'JavaScript' },
        { id: '2', value: 'ReactJS' },
        { id: '3', value: 'NodeJS' },
        { id: '4', value: 'Express' },
        { id: '5', value: 'MongoDB' },
        { id: '6', value: 'MySQL' }
    ],
    onSelect(result) {
        console.log('SELECTED', result);
    }
});

(async () => {
    const select2 = new Select('#select-2', {
        placeholder: 'Select element',
        multiple: false,
        data: await dataItem(),
        onSelect(result) {
            console.log('SELECTED2', result);
        }
    });
})();


window.s = select;