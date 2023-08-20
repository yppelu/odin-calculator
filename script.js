const calculator = document.querySelector('.calculator');
calculator.style.width = calculateMainBlockWidth();
const display = document.querySelector('.display');

let firstNumber = '';
let secondNumber = '';
let operator = '';

updateDisplay();

const allOperators = document.querySelectorAll('.operator');

calculator.addEventListener('click', (e) => {
  if (
    !(e.target.classList.contains('calculator')
      || e.target.classList.contains('display')
      || e.target.classList.contains('remove-last-digit')
      || e.target.classList.contains('percent')
      || e.target.classList.contains('plus-minus'))
  ) {
    allOperators.forEach(child => {
      if (child.classList.contains('operator-chosen')) {
        child.classList.remove('operator-chosen');
      }
    });
  }

  if (e.target.classList.contains('clear-all')) clearAll();
  if (e.target.classList.contains('remove-last-digit')) removeOneDigit();
  if (e.target.classList.contains('plus-minus')) inverseNumber();
  if (e.target.className === 'digit') {
    addOneDigit(e.target.innerText);
  }

  if (e.target.classList.contains('arithmetic')) {
    if (e.target.classList.contains('percent')) calculate('%');
    else {
      if (operator !== '' && secondNumber !== '') {
        calculate();
      }
      if (e.target.classList.contains('equals')) operator = '=';
      if (e.target.classList.contains('divide')) {
        e.target.classList.add('operator-chosen');
        operator = '/';
      }
      if (e.target.classList.contains('multiply')) {
        e.target.classList.add('operator-chosen');
        operator = '*';
      }
      if (e.target.classList.contains('subtract')) {
        e.target.classList.add('operator-chosen');
        operator = '-';
      }
      if (e.target.classList.contains('add')) {
        e.target.classList.add('operator-chosen');
        operator = '+';
      }
    }
  }

  updateDisplay();
});

function add() {
  return String(Number((Number(firstNumber) + Number(secondNumber)).toFixed(10)));
}

function addOneDigit(digit) {
  if (operator === '' || operator === '=' && secondNumber === '') {
    if (firstNumber.length < 15) {
      if (digit === '.') {
        if (firstNumber.indexOf('.') === -1) firstNumber += '.';
      } else {
        firstNumber = (firstNumber !== '0')
          ? firstNumber += digit
          : digit;
      }
    }
  } else {
    if (secondNumber.length < 15) {
      if (digit === '.') {
        if (secondNumber.indexOf('.') === -1)
          (secondNumber === '') ? secondNumber += '0.' : secondNumber += '.';
      } else {
        secondNumber = (secondNumber !== '0')
          ? secondNumber += digit
          : digit;
      }
    }
  }
}

function calculate(op = '') {
  if (op === '%') {
    (secondNumber === '')
      ? firstNumber = percent(firstNumber)
      : secondNumber = percent(secondNumber);
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
  if (secondNumber === '0' || secondNumber === '') return '404'
  return String(Number((firstNumber / secondNumber).toFixed(10)));
}

function inverseNumber() {
  if (secondNumber === '') {
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
  indexOfPoint = number.indexOf('.');
  if (indexOfPoint === -1) {
    return String(number / 100);
  } else {
    let lengthOfDecimalPart = number.slice(indexOfPoint + 1).length;
    return (number / 100).toFixed(lengthOfDecimalPart + 2);
  }
}

function subtract() {
  return String(Number((firstNumber - secondNumber).toFixed(10)));
}

function removeOneDigit() {
  if (secondNumber === '') {
    firstNumber = firstNumber.slice(0, -1);
  } else {
    secondNumber = secondNumber.slice(0, -1);
  }
}

function updateDisplay() {
  if (secondNumber === '' || operator === '=') {
    if (firstNumber.length > 14) {
      display.textContent = firstNumber.slice(0, 15);
    } else {
      if (firstNumber === '') display.textContent = 0;
      else display.textContent = firstNumber;
    }
  } else {
    if (secondNumber.length > 14) {
      display.textContent = secondNumber.slice(0, 15);
    }
    if (secondNumber === '') display.textContent = 0;
    else display.textContent = secondNumber;
  }
}