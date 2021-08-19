import './css/main.scss';
import main from './js/main'
import "@babel/polyfill";
import 'regenerator-runtime/runtime';

main.fn();
main.add(2, 3);

const promise1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve('PageA Test');
    }, 1000);
});

promise1.then((value) => {
    // eslint-disable-next-line
    console.log(value);
    // expected output: "foo"
});