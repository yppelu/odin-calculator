const calculator = document.querySelector('.calculator');
calculator.style.width = calculateMainBlockWidth();
const display = document.querySelector('.display');

let firstNumber = '';
let secondNumber = '';
let operator = '';

function add() {
  return String(Number((Number(firstNumber) + Number(secondNumber)).toFixed(10)));
}

function addOneDigit(digit) {
  if (operator === '') {
    if (digit === '.') {
      if (firstNumber.indexOf('.') === -1) firstNumber + '.';
    } else {
      firstNumber = (firstNumber !== '0')
        ? firstNumber += digit
        : digit;
    }
  } else {
    if (digit === '.') {
      if (secondNumber.indexOf('.') === -1) secondNumber + '.';
    } else {
      secondNumber = (secondNumber !== '0')
        ? secondNumber += digit
        : digit;
    }
  }
}

function calculate() {
  if (operator === '%') {
    (operator === '')
      ? firstNumber = percent(firstNumber)
      : secondNumber = percent(secondNumber);
    operator = '';
    return;
  }

  switch (operator) {
    case '/':
      firstNumber = divide();
      break;
    case '*':
      firstNumber = multiply();
      break;
    case '-':
      firstNumber = subtract();
      break;
    case '+':
      firstNumber = add();
      break;
  }
  secondNumber = '';
}

function calculateMainBlockWidth() {
  return (window.innerWidth > window.innerHeight)
    ? `${window.innerHeight * 0.5}px`
    : `${window.innerWidth * 0.8}px`;
}

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
}

function divide() {
  return String(Number((firstNumber / secondNumber).toFixed(10)));
}

function inverseNumber() {
  if (operator === '') {
    if (firstNumber !== '0' && firstNumber !== '') {
      firstNumber = (firstNumber.slice(0, 1) === '-')
        ? firstNumber.slice(1)
        : '-' + firstNumber;
    }
  } else {
    if (secondNumber !== '0' && secondNumber !== '') {
      secondNumber = (secondNumber.slice(0, 1) === '-')
        ? secondNumber.slice(1)
        : '-' + secondNumber;
    }
  }
}

function multiply() {
  return String(Number((firstNumber * secondNumber).toFixed(10)));
}

function percent(number) {
  let indexOfPoint;
  if (operator === '') {
    indexOfPoint = number.indexOf('.');
    if (indexOfPoint === -1) {
      return String(number / 100);
    } else {
      let lengthOfDecimalPart = number.slice(indexOfPoint + 1).length;
      return (number / 100).toFixed(lengthOfDecimalPart + 2);
    }
  }
}

function subtract() {
  return String(Number((firstNumber - secondNumber).toFixed(10)));
}

function removeOneDigit() {
  if (operator === '') {
    firstNumber = firstNumber.slice(0, -1);
  } else {
    secondNumber = secondNumber.slice(0, -1);
  }
}

function updateDisplay() {
  if (operator === '' || operator === '=') display.textContent = firstNumber;
  else display.textContent = secondNumber;
}