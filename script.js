const calculator = document.querySelector('.calculator');

calculator.style.width = calculateMainBlockSize();

function calculateMainBlockSize() {
  let size;
  if (window.innerWidth > window.innerHeight) {
    size = '50vh';
  } else {
    size = '80%';
  }
  return size;
}