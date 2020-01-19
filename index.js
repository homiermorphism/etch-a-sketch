const gridContainer = document.querySelector('.grid-container');
const cells = document.getElementsByClassName('grid-item');
const buttonsDiv = document.querySelector('.buttons');
const resizeButton = document.getElementById('resizeButton');
const clearButton = document.getElementById('clearButton');
const shadingDropdown = document.getElementsByClassName('shading-dropdown');
const colorDropdown = document.getElementsByClassName('color-dropdown');

let userInput = 20;
let currentColor = 'gray';
let filling = 'Monochromatic';

makeGrid(20);

function makeGrid(n) {
  gridContainer.style.setProperty('--grid-amount', n);
  for (i=0; i < (n*n); i++) {
    const cell = document.createElement('div');
    gridContainer.appendChild(cell).className = 'grid-item';
    cell.addEventListener('mouseover', (e) => {
      if (filling === 'Monochromatic') {
        e.currentTarget.style.backgroundColor = currentColor;
      }
      else if (filling === 'Darken') {
        darkenGrid(e);
      }
      else if (filling === 'Rainbow') {
        currentColor = getRandomColor();
        e.currentTarget.style.backgroundColor = currentColor;
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
  userInput = window.prompt('Enter the number of rows/columns.')
  clearGrid();
  makeGrid(userInput);
}

function darkenGrid(e) {
  let opacity = Number(e.target.style.opacity);
  e.currentTarget.style.backgroundColor = currentColor;
  e.currentTarget.style.opacity = opacity + 0.2;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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

for (i=0; i < shadingDropdown.length; i++) {
  // need the [0] below because 'getElementSSSSByTagName' returns a nodelist
  // and we are grabbing the first item in the list
  let selectTag = shadingDropdown[i].getElementsByTagName('select')[0];
  // div to hold the color selected
  let selectedItem = document.createElement('div');
  selectedItem.setAttribute('class','select-selected');
  // change the HTML of the selected color div to the selected HTML option
  selectedItem.innerHTML = selectTag.options[selectTag.selectedIndex].innerHTML;
  shadingDropdown[i].appendChild(selectedItem);

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
      filling = this.innerHTML;
    }); //end of event listener
    dropdownOptions.appendChild(optionDiv);
  } // end of second for loop (j)
  shadingDropdown[i].appendChild(dropdownOptions);
  selectedItem.addEventListener('click', function(e) {
    e.stopPropagation();
    closeSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
} // end of first for loop (i)


for (i=0; i < colorDropdown.length; i++) {
  // need the [0] below because 'getElementSSSSByTagName' returns a nodelist
  // and we are grabbing the first item in the list
  let selectTag = colorDropdown[i].getElementsByTagName('select')[0];
  // div to hold the color selected
  let selectedItem = document.createElement('div');
  selectedItem.setAttribute('class','select-selected');
  // change the HTML of the selected color div to the selected HTML option
  selectedItem.innerHTML = selectTag.options[selectTag.selectedIndex].innerHTML;
  colorDropdown[i].appendChild(selectedItem);

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
      currentColor = this.innerHTML;
      if (filling === 'Rainbow') {
        filling = 'Monochromatic';
      }
    }); //end of event listener
    dropdownOptions.appendChild(optionDiv);
  } // end of second for loop (j)
  colorDropdown[i].appendChild(dropdownOptions);
  selectedItem.addEventListener('click', function(e) {
    e.stopPropagation();
    closeSelect(this);
    this.nextSibling.classList.toggle('select-hide');
    this.classList.toggle('select-arrow-active');
  });
} // end of first for loop (i)


document.addEventListener('click', closeSelect);
clearButton.addEventListener('click', clearGrid);
resizeButton.addEventListener('click', resizeGrid);
