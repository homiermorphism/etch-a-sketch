const gridContainer = document.querySelector('.grid-container');

function makeGrid(n) {
  gridContainer.style.setProperty('--grid-amount', n);
  for (i=0; i < (n*n); i++) {
    const cell = document.createElement('div');
    gridContainer.appendChild(cell).className = "grid-item";
  }
}

makeGrid(16);
