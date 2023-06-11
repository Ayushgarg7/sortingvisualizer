// Generate a random array of numbers
function generateArray(size, min, max) {
  var array = [];
  for (var i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return array;
}

// Reset the array and display it on the screen
function resetArray() {
  var arrayContainer = document.querySelector('.array-container');
  arrayContainer.innerHTML = '';

  var array = generateArray(20, 10, 200);

  
  for (var i = 0; i < array.length; i++) {
    var bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = array[i] + 'px';
    arrayContainer.appendChild(bar);
  }
}

// Swap two elements in the array
function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// Visualize Bubble Sort algorithm
async function visualizeBubbleSort() {
  resetArray();
  var arrayBars = document.querySelectorAll('.bar');
  var array = [];
  for (var i = 0; i < arrayBars.length; i++) {
    array.push(parseInt(arrayBars[i].style.height));
  }

  var n = array.length;

  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - 1 - i; j++) {
      // Visualize the comparison
      arrayBars[j].style.backgroundColor = '#38ff38';
      arrayBars[j + 1].style.backgroundColor = '#38ff38';

      await new Promise(resolve => setTimeout(resolve, 300)); // Delay for visualization

      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        swap(arrayBars, j, j + 1);

        // Update the heights of bars after swapping
        arrayBars[j].style.height = array[j] + 'px';
        arrayBars[j + 1].style.height = array[j + 1] + 'px';
      }

      // Reset the color after comparison
      arrayBars[j].style.backgroundColor = '#333';
      arrayBars[j + 1].style.backgroundColor = '#333';
    }

    // Visualize the sorted portion
    arrayBars[n - 1 - i].style.backgroundColor = '#ff2885';
  }

  // Visualize the final sorted array
  for (var i = 0; i < arrayBars.length; i++) {
    arrayBars[i].style.backgroundColor = '#ff2885';
  }
}

// Visualize Selection Sort algorithm
async function visualizeSelectionSort() {
  resetArray();
  var arrayBars = document.querySelectorAll('.bar');
  var array = [];
  for (var i = 0; i < arrayBars.length; i++) {
    array.push(parseInt(arrayBars[i].style.height));
  }

  var n = array.length;

  for (var i = 0; i < n - 1; i++) {
    var minIndex = i;

    // Visualize the current minimum index
    arrayBars[minIndex].style.backgroundColor = '#38ff38';

    for (var j = i + 1; j < n; j++) {
      // Visualize the comparison
      arrayBars[j].style.backgroundColor = '#38ff38';

      await new Promise(resolve => setTimeout(resolve, 300)); // Delay for visualization

      if (array[j] < array[minIndex]) {
        // Reset the previous minimum index color
        arrayBars[minIndex].style.backgroundColor = '#333';
        minIndex = j;
      } else {
        // Reset the color after comparison
        arrayBars[j].style.backgroundColor = '#333';
      }
    }

    // Swap the minimum element with the current element
    swap(array, i, minIndex);
    swap(arrayBars, i, minIndex);

    // Update the heights of bars after swapping
    arrayBars[i].style.height = array[i] + 'px';
    arrayBars[minIndex].style.height = array[minIndex] + 'px';

    // Visualize the sorted portion
    arrayBars[i].style.backgroundColor = '#ff2885';
  }

  // Visualize the final sorted array
  arrayBars[n - 1].style.backgroundColor = '#ff2885';
}

// Visualize Insertion Sort algorithm
async function visualizeInsertionSort() {
  resetArray();
  // generateArray(20,10,200)
  var arrayBars = document.querySelectorAll('.bar');
  var array = [];
  for (var i = 0; i < arrayBars.length; i++) {
    array.push(parseInt(arrayBars[i].style.height));
  }

  var n = array.length;

  for (var i = 1; i < n; i++) {
    var key = array[i];
    var j = i - 1;

    // Visualize the current key
    arrayBars[i].style.backgroundColor = '#38ff38';

    while (j >= 0 && array[j] > key) {
      // Shift elements greater than the key to the right
      array[j + 1] = array[j];
      arrayBars[j + 1].style.height = array[j + 1] + 'px';

      // Visualize the swapping
      arrayBars[j].style.backgroundColor = '#ffaa00';
      arrayBars[j + 1].style.backgroundColor = '#ffaa00';

      await new Promise(resolve => setTimeout(resolve, 300)); // Delay for visualization

      // Reset the color after swapping
      arrayBars[j].style.backgroundColor = '#333';
      arrayBars[j + 1].style.backgroundColor = '#333';

      j--;
    }

    array[j + 1] = key;
    arrayBars[j + 1].style.height = key + 'px';

    // Visualize the sorted portion
    for (var k = 0; k <= i; k++) {
      arrayBars[k].style.backgroundColor = '#ff2885';
    }
  }

  // Visualize the final sorted array
  for (var i = 0; i < arrayBars.length; i++) {
    arrayBars[i].style.backgroundColor = '#ff2885';
  }
}

// Generate a new array on page load
window.addEventListener('load', function () {
  resetArray();
});

// Attach event listeners to the buttons
document.getElementById('resetBtn').addEventListener('click', function () {
  resetArray();
});

document.getElementById('bubbleSortBtn').addEventListener('click', function () {
  resetArray();
  visualizeBubbleSort();
});

document.getElementById('selectionSortBtn').addEventListener('click', function () {
  resetArray();
  visualizeSelectionSort();
});

document.getElementById('insertionSortBtn').addEventListener('click', function () {
  resetArray();
  visualizeInsertionSort();
});
