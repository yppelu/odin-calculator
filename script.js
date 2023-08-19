const calculator = document.querySelector('.calculator');
calculator.style.width = calculateMainBlockWidth();
const display = document.querySelector('.display');

const mathOperations = {
  '/'(num1, num2) { return num1 / num2 },
  '*'(num1, num2) { return num1 * num2 },
  '-'(num1, num2) { return num1 - num2 },
  '+'(num1, num2) { return num1 + num2 }
}

let firstNumber = 0;
let secondNumber = 0;
let operator = '';

let isPointOn = false;
let decimalPlacesCount = 0;

function calculateMainBlockWidth() {
  return (window.innerWidth > window.innerHeight)
    ? `${window.innerHeight * 0.5}px`
    : `${window.innerWidth * 0.8}px`;
}