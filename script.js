const calculator = document.querySelector('.calculator');
calculator.style.width = calculateMainBlockWidth();
const display = document.querySelector('.display');

let firstNumber = '';
let secondNumber = '';
let operator = '';

function calculateMainBlockWidth() {
  return (window.innerWidth > window.innerHeight)
    ? `${window.innerHeight * 0.5}px`
    : `${window.innerWidth * 0.8}px`;
}