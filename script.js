const calculator = document.querySelector('.calculator');
calculator.style.width = calculateMainBlockWidth();
const display = document.querySelector('.display');

const mathOperations = {
  '/'(num1, num2) { return num1 / num2 },
  '*'(num1, num2) { return num1 * num2 },
  '-'(num1, num2) { return num1 - num2 },
  '+'(num1, num2) { return num1 + num2 }
};

const numbers = {
  firstNumber: 0,
  secondNumber: 0
};
let operator = '';

let isPointOn = false;
let decimalPlacesCount = 0;

function calculateMainBlockWidth() {
  return (window.innerWidth > window.innerHeight)
    ? `${window.innerHeight * 0.5}px`
    : `${window.innerWidth * 0.8}px`;
}

function clearAll() {
  firstNumber = 0;
  secondNumber = 0;
  operator = '';
  isPointOn = false;
  decimalPlacesCount = 0;
}

function getNumberToChange() {
  return (operator === '') ? numbers.firstNumber : numbers.secondNumber;
}

function inverseNumber(number) {
  return -number;
}

function removeLastDigit(number) {
  return Math.floor(number / 10);
}

function turnIntoPercents(number) {
  return number / 100;
}