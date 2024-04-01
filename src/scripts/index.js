const display = document.querySelector('#display');

let firstNum = '';
let secNum = '';
let op = '';

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.classList.contains('num')) {
            if (op) {
                secNum += e.target.id;
            } else {
                firstNum += e.target.id;
            };

            if (display.textContent.includes('+') ||
                display.textContent.includes('-') ||
                display.textContent.includes('÷') ||
                display.textContent.includes('x')) {
                display.textContent = e.target.id;
            } else {
                display.textContent += e.target.id
            }
            console.log('firstNum', firstNum)
            console.log('sec', secNum)
        } else if (e.target.classList.contains('operator')) {
            op = e.target.id;
            switch (op) {
                case 'add':
                    display.textContent = '+';
                    return;
                case 'subtract':
                    display.textContent = '-';
                    return;
                case 'multiply':
                    display.textContent = 'x';
                    return;
                case 'divide':
                    display.textContent = '÷';
                    return;
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
        ans = ans.toFixed(6)
    }

    display.textContent = ans;
};