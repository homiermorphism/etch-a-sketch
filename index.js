const gridContainer = document.querySelector('.grid-container');
const options = document.getElementsByName('sketch-type');
const cells = document.getElementsByClassName('grid-item');


function makeGrid(n) {
  gridContainer.style.setProperty('--grid-amount', n);
  for (i=0; i < (n*n); i++) {
    const cell = document.createElement('div');
    gridContainer.appendChild(cell).className = 'grid-item';
    cell.addEventListener('mouseover', (e) => {
      e.currentTarget.style.backgroundColor = 'gray';
    });
  }
}



makeGrid(16);
