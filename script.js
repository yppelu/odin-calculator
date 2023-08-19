const calculator = document.querySelector('.calculator');
calculator.style.width = calculateMainBlockWidth();
const display = document.querySelector('.display');

const arithmeticOperations = {
  '/'(num1, num2) { return num1 / num2 },
  '*'(num1, num2) { return num1 * num2 },
  '-'(num1, num2) { return num1 - num2 },
  '+'(num1, num2) { return num1 + num2 }
};

const numbers = [0, 0];
numberIndex = 0;
let operator = '';

let isPointOn = false;
let decimalPlacesCount = 0;

updateDisplay();

calculator.addEventListener('click', (e) => {
  updateNumberIndex();
  if (e.target.classList.contains('clear-all')) clearAll();
  if (e.target.classList.contains('remove-last-digit')) removeLastDigit();
  if (e.target.classList.contains('percent')) turnIntoPercents();
  if (e.target.classList.contains('plus-minus')) inverseNumber();
  if (e.target.classList.contains('arithmetic')) {
    if (operator !== '') calculate();
    if (e.target.classList.contains('equals')) operator = '=';
    if (e.target.classList.contains('divide')) operator = '/'
    if (e.target.classList.contains('multiply')) operator = '*'
    if (e.target.classList.contains('subtract')) operator = '-'
    if (e.target.classList.contains('add')) operator = '+';
    isPointOn = false;
  }
  if (e.target.classList.contains('digit')) {
    if (e.target.innerText === '.') {
      if (!isPointOn) {
        numbers[numberIndex] += '.';
        isPointOn = true;
      }
    } else {
      updateNumber(Number(e.target.innerText));
    }
  }
  updateDisplay();
});

function calculate() {
  if (operator !== '=') {
    numbers[0] = arithmeticOperations[operator](numbers[0], numbers[1]);
    numbers[1] = 0;
  }
}

function calculateMainBlockWidth() {
  return (window.innerWidth > window.innerHeight)
    ? `${window.innerHeight * 0.5}px`
    : `${window.innerWidth * 0.8}px`;
}

function clearAll() {
  numbers[0] = 0;
  numbers[1] = 0;
  operator = '';
  isPointOn = false;
  decimalPlacesCount = 0;
  updateDisplay();
}

function inverseNumber() {
  numbers[numberIndex] = -numbers[numberIndex];
}

function removeLastDigit() {
  let number = numbers[numberIndex];
  if (display.textContent.slice(-1) === '.') {
    numbers[numberIndex] = Number(number);
    isPointOn = false;
  } else {
    if (isPointOn === false) {
      numbers[numberIndex] = Math.floor(number / 10);
    } else {
      let numberAsString = number + '';
      let indexOfPoint = numberAsString.indexOf('.');
      let decimalPartLength = numberAsString.slice(indexOfPoint).length - 1;
      number[numberIndex] = (Math.floor(number * 10 ** (decimalPartLength - 1))) / 10 ** (decimalPartLength - 1);
    }
  }
}

function turnIntoPercents() {
  numbers[numberIndex] /= 100;
}

function updateDisplay() {
  if (operator === '' || operator == '=') {
    display.textContent = numbers[0];
  } else {
    display.textContent = numbers[1];
  }
}

function updateNumber(digit) {
  let number = numbers[numberIndex];
  if (number > 0) {
    if (isPointOn === false) {
      number = number * 10 + digit;
    } else {
      number = number + digit / 10 ** decimalPlacesCount;
    }
  } else if (number < 0) {
    if (isPointOn === false) {
      number = number - 10 + digit;
    } else {
      number = number - digit / 10 ** decimalPlacesCount;
    }
  } else {
    number = digit;
  }
  numbers[numberIndex] = number;
}

function updateNumberIndex() {
  numberIndex = (operator === '') ? 0 : 1;
}