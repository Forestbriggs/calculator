const display = document.querySelector('#display');

let chained = '';
let firstNum = '';
let secNum = '';
let op = '';
let lastSecNum = '';
let lastOp = '';

//TODO fix issue where after calculate typing adds numbers to the end of firstNum
//TODO   instead of secNum

//TODO fix issue where calculations after error messages return NaN

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.classList.contains('num')) {
            if (op && secNum === '') {
                display.textContent = e.target.id;
            } else {
                display.textContent += e.target.id;
            }

            if (op) {
                secNum += e.target.id;
            } else {
                firstNum += e.target.id;
            };
        } else if (e.target.classList.contains('operator')) {

            if (!firstNum) {
                return;
            }

            if (op) {
                chained = operate(op, parseFloat(firstNum), parseFloat(secNum));
                display.textContent = chained;
                firstNum = `${chained}`;
                secNum = '';
            }
            op = e.target.id;

        } else if (e.target.id === 'calculate') {

            if (op === 'divide' && (secNum === '0' || secNum === '-0')) {
                clear();
                display.textContent = 'nuh uh';
                return;
            }

            if (secNum) {
                res = operate(op, parseFloat(firstNum), parseFloat(secNum));
                lastSecNum = `${secNum}`;
                secNum = '';
                lastOp = `${op}`;
                op = '';
            } else {
                res = operate(lastOp, parseFloat(firstNum), parseFloat(lastSecNum));
            }
            firstNum = `${res}`;
            display.textContent = res;

        } else if (e.target.id === 'clear') {
            clear();
        } else if (e.target.id === 'switcher') {
            if (!secNum) {
                if (firstNum.startsWith('-')) {
                    firstNum = firstNum.substring(1);
                    display.textContent = firstNum;
                } else {
                    firstNum = '-' + firstNum;
                    display.textContent = firstNum;
                }
            } else {
                if (secNum.startsWith('-')) {
                    secNum = firstNum.substring(1);
                    display.textContent = secNum;
                } else {
                    secNum = '-' + secNum;
                    display.textContent = secNum;
                }
            }
        } else if (e.target.id === 'percent') {
            if (firstNum) {
                const percentage = parseFloat(display.textContent) / 100;

                if (!secNum) {
                    firstNum = `${percentage}`;
                    display.textContent = firstNum;
                } else {
                    secNum = `${percentage}`;
                    display.textContent = secNum;
                }
            }
        } else if (e.target.id === 'dot') {
            if (!display.textContent.includes('.')) {
                if (!secNum) {
                    firstNum = firstNum + '.';
                    display.textContent = firstNum;
                } else {
                    secNum = secNum + '.';
                    display.textContent = secNum;
                }
            }
        }
    })
});

const add = (num1, num2) => {
    return num1 + num2;
};
const subtract = (num1, num2) => {
    return num1 - num2;
};
const multiply = (num1, num2) => {
    return num1 * num2;
};
const divide = (num1, num2) => {
    return num1 / num2;
};

const operate = (operator, num1, num2) => {
    let ans;

    if (operator === 'add') {
        ans = add(num1, num2);
    } else if (operator === 'subtract') {
        ans = subtract(num1, num2);
    } else if (operator === 'multiply') {
        ans = multiply(num1, num2);
    } else if (operator === 'divide') {
        ans = divide(num1, num2)
    } else {
        ans = 'ERROR'
    }

    if (!Number.isNaN(ans) && ans % 1 !== 0) {
        ans = parseFloat(ans.toFixed(6));
    }

    return ans;
};

function clear() {
    firstNum = '';
    secNum = '';
    op = '';
    chained = '';
    lastSecNum = '';
    lastOp = '';
    display.textContent = '';
}

// TODO future keyboard functionality
// document.addEventListener('keydown', (e) => {
//     console.log(e.keyCode);

//     if (e.keyCode === 13) { // Enter
//         const button = document.querySelector('#calculate');
//         button.click();
//     }
// });