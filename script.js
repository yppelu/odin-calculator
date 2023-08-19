const calculator = document.querySelector('.calculator');
calculator.style.width = calculateMainBlockWidth();
const display = document.querySelector('.display');

let firstNumber = '';
let secondNumber = '';
let operator = '';

function addOneDigit(digit) {
  if (operator === '') {
    firstNumber = (firstNumber !== '0' && digit !== '.')
      ? firstNumber += digit
      : digit;
  } else {
    secondNumber = (secondNumber !== '0' && digit !== '.')
      ? secondNumber += digit
      : digit;
  }
}

function calculateMainBlockWidth() {
  return (window.innerWidth > window.innerHeight)
    ? `${window.innerHeight * 0.5}px`
    : `${window.innerWidth * 0.8}px`;
}

function removeOneDigit() {
  if (operator === '') {
    firstNumber = firstNumber.slice(0, -1);
  } else {
    secondNumber = secondNumber.slice(0, -1);
  }
}