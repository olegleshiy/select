import {Select} from './select/select';
import './select/style.scss';

const select = new Select('#select', {
    placeholder: 'Select element',
    data: [
        {id: '1', value: 'JavaScript'},
        {id: '2', value: 'ReactJS'},
        {id: '3', value: 'NodeJS'},
        {id: '4', value: 'Express'},
        {id: '5', value: 'MongoDB'},
        {id: '6', value: 'MySQL'},
    ]
});

window.s = select;