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
      e.currentTarget.style.backgroundColor = currentColor;
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
  // need the [0] below because 'getElementSSSSByTagName' returns a nodelist
  // and we are grabbing the first item in the list
  let selectTag = dropdownMenu[i].getElementsByTagName('select')[0];
  // div to hold the color selected
  let selectedItem = document.createElement('div');
  selectedItem.setAttribute('class','select-selected');
  // change the HTML of the selected color div to the selected HTML option
  selectedItem.innerHTML = selectTag.options[selectTag.selectedIndex].innerHTML;
  dropdownMenu[i].appendChild(selectedItem);

  // div to hold smaller divs with colors
  let dropdownOptions = document.createElement('div');
  dropdownOptions.setAttribute('class','select-items select-hide');
  // we can use selectTag.length because we don't actually use j until
  // we get to the options. So we're actually using the length of the options
  // list inside of the selectTag
  for (j=1; j < selectTag.length; j++) { // j=1 so that "Choose Color:" goes away
    // divs for the colors
    let optionDiv = document.createElement('div');
    optionDiv.innerHTML = selectTag.options[j].innerHTML;
    optionDiv.addEventListener('click', function(e) {
      //when an item is clicked, update the dropdown menu and the selected item
      // parentNode is the dropdownOptions div created above
      // previousSibling is the selected div
      let selectedItemDiv = this.parentNode.previousSibling;
      for (i=0; i < selectTag.length; i++) {
        if (selectTag.options[i].innerHTML == this.innerHTML) {
          selectedItemDiv.innerHTML = this.innerHTML;
          let currentSelectedItem = this.parentNode.getElementsByClassName('same-as-selected');
          for (k=0; k < currentSelectedItem.length; k++) {
            currentSelectedItem[k].removeAttribute('class');
          }
          this.setAttribute('class','same-as-selected');
          break;
        }
      }
      currentColor = selectedItem.innerHTML;
    }); //end of event listener
    dropdownOptions.appendChild(optionDiv);
  } // end of second for loop (j)
  dropdownMenu[i].appendChild(dropdownOptions);
  selectedItem.addEventListener('click', function(e) {
    e.stopPropagation();
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
} // end of first for loop (i)

function closeSelect(element) {
  let array = [];
  let dropdownOptions = document.getElementsByClassName('select-items');
  let selectedItem = document.getElementsByClassName('select-selected');
  for (i=0; i < selectedItem.length; i++) {
    if (element == selectedItem[i]) {
      array.push(i)
    }
    else {
      selectedItem[i].classList.remove('select-arrow-active');
    }
  }
  for (i=0; i < dropdownOptions.length; i++) {
    if (array.indexOf(i)) {
      dropdownOptions[i].classList.add('select-hide');
    }
  }
}

document.addEventListener('click', closeSelect);
