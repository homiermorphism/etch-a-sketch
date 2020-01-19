const gridContainer = document.querySelector('.grid-container');
const cells = document.getElementsByClassName('grid-item');
const buttonsDiv = document.querySelector('.buttons');
const resizeButton = document.getElementById('resizeButton');
const clearButton = document.getElementById('clearButton');
const rainbowButton = document.getElementById('rainbowButton');
const darkenButton = document.getElementById('darkenButton');
const grayButton = document.getElementById('grayButton');

let userInput = document.getElementById('userInput').value;
let currentColor = 'gray';

makeGrid(16);

function makeGrid(n) {
  gridContainer.style.setProperty('--grid-amount', n);
  for (i=0; i < (n*n); i++) {
    const cell = document.createElement('div');
    gridContainer.appendChild(cell).className = 'grid-item';
    cell.addEventListener('mouseover', (e) => {
      if (currentColor === 'rainbow') {
        e.currentTarget.style.backgroundColor = getRandomColor();
      }
      else if (currentColor === 'darken') {
        e.currentTarget.style.backgroundColor = darkenColor(e);
      }
      else if (currentColor === 'gray') {
        e.currentTarget.style.backgroundColor = 'gray';
      }
    });
  }
}

function clearGrid() {
  while (cells.length > 0) {
    cells[0].parentNode.removeChild(cells[0]);
  }
  makeGrid(userInput);
}


function resizeGrid() {
  userInput = document.getElementById('userInput').value;
  clearGrid();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function darkenColor(e) {
  let opacity = Number(e.target.style.opacity);
  e.target.style.backgroundColor = 'gray';
  e.target.style.opacity = opacity + 0.2;
}

function rainbow() {
  clearGrid();
  currentColor = 'rainbow';
}

function darken() {
  clearGrid();
  currentColor = 'darken';
}

function gray() {
  clearGrid();
  currentColor = 'gray';
}

clearButton.addEventListener('click', clearGrid);
resizeButton.addEventListener('click', resizeGrid);
rainbowButton.addEventListener('click', rainbow);
darkenButton.addEventListener('click', darken);
grayButton.addEventListener('click', gray);
