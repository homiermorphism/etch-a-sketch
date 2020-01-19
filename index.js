const gridContainer = document.querySelector('.grid-container');
const cells = document.getElementsByClassName('grid-item');
const buttonsDiv = document.querySelector('.buttons');
const resizeButton = document.getElementById('resizeButton');
const clearButton = document.getElementById('clearButton');
const dropdownMenu = document.getElementsByClassName('dropdown-menu');

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

clearButton.addEventListener('click', clearGrid);
resizeButton.addEventListener('click', resizeGrid);


for (i=0; i < dropdownMenu.length; i++) {
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! why do we need the [0] below????
  let selectTag = dropdownMenu[i].getElementsByTagName('select')[0];
  // div to hold the color selected
  let selectedColor = document.createElement('div');
  selectedColor.setAttribute('class','select-selected');
  // change the HTML of the selected color div to the selected HTML option
  selectedColor.innerHTML = selectTag.options[selectTag.selectedIndex].innerHTML;
  dropdownMenu[i].appendChild(selectedColor);

  // div to hold smaller divs with colors
  let colorOptions = document.createElement('div');
  colorOptions.setAttribute('class','select-items select-hide');
  // we can use selectTag.length because we don't actually use j until
  // we get to the options. So we're actually using the length of the options
  // list inside of the selectTag
  for (j=1; j < selectTag.length; j++) { // j=1 so that "Choose Color:" goes away
    // divs for the colors
    let colorItem = document.createElement('div');
    colorItem.innerHTML = selectTag.options[j].innerHTML;
    colorItem.addEventListener('click', function(e) {
      //when an item is clicked, update the dropdown menu and the selected item
      // parentNode is the colorOptions div created above
      // previousSibling is the selected div
      let selectedColorDiv = this.parentNode.previousSibling;
      for (i=0; i < selectTag.length; i++) {
        if (selectTag.options[i].innerHTML == this.innerHTML) {
          let selectedItem = selectTag.selectedIndex;
          selectedColorDiv.innerHTML = this.innerHTML;
          let currentSelectedColor = this.parentNode.getElementsByClassName('same-as-selected');
          for (k=0; k < currentSelectedColor.length; k++) {
            currentSelectedColor[k].removeAttribute('class');
          }
          this.setAttribute('class','same-as-selected');
          break;
        }
      }
    }); //end of event listener
    colorOptions.appendChild(colorItem);
  } // end of second for loop (j)
  dropdownMenu[i].appendChild(colorOptions);
  selectedColor.addEventListener('click', function(e) {
    e.stopPropagation();
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
} // end of first for loop (i)

function closeSelect(element) {
  let array = [];
  let colorOptions = document.getElementsByClassName('select-items');
  let selectedColor = document.getElementsByClassName('select-selected');
  for (i=0; i < selectedColor.length; i++) {
    if (element == selectedColor[i]) {
      array.push(i)
    }
    else {
      selectedColor[i].classList.remove('select-arrow-active');
    }
  }
  for (i=0; i < colorOptions.length; i++) {
    if (array.indexOf(i)) {
      colorOptions[i].classList.add('select-hide');
    }
  }
}

document.addEventListener('click', closeSelect);
