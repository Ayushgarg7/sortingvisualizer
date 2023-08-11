const visualizationArea = document.querySelector('.visualization');
  const startButton = document.getElementById('startButton');
  const resetButton = document.getElementById('resetButton');
  const speedRange = document.getElementById('speedRange');
  const sizeRange = document.getElementById('sizeRange');
  const algorithmSelect = document.getElementById('algorithmSelect');
  let array = [];
  generateArray(sizeRange.value);
  resetButton.addEventListener('click', () => {
    generateArray(sizeRange.value);
  });

  sizeRange.addEventListener('input', () => {
    const newSize = sizeRange.value;
    generateArray(newSize);
  });

  function generateArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
  }

//   function getColor(value) {
//     const hue = Math.floor((value / 100) * 120); // Map value to hue (0-120)
//     return `hsl(${hue}, 100%, 50%)`; // Convert hue to an HSL color
//   }

  function displayArray() {
    visualizationArea.innerHTML = '';
    array.forEach(value => {
      const bar = document.createElement('div');
      bar.style.height = `${value * 3}px`;
    //   bar.style.backgroundColor = color;
    //   bar.style.border = '1px solid white';
      visualizationArea.appendChild(bar);
    });
  }


  sizeRange.addEventListener('input', () => {
    const newSize = sizeRange.value;
    generateArray(newSize);
  });



  async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          await swap(j, j + 1);
        }
      }
    }
  }

  async function selectionSort() {
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      await swap(i, minIndex);
    }
  }
  
  async function mergeSort(arr, left, right) {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      await mergeSort(arr, left, middle);
      await mergeSort(arr, middle + 1, right);
      await merge(arr, left, middle, right);
    }
  }
  
  async function merge(arr, left, middle, right) {
    const n1 = middle - left + 1;
    const n2 = right - middle;
    const leftArray = new Array(n1);
    const rightArray = new Array(n2);
  
    for (let i = 0; i < n1; i++) {
      leftArray[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      rightArray[j] = arr[middle + 1 + j];
    }
  
    let i = 0;
    let j = 0;
    let k = left;
  
    while (i < n1 && j < n2) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
      await sleep(100 - speedRange.value);
      displayArray();
    }
  
    while (i < n1) {
      arr[k] = leftArray[i];
      i++;
      k++;
      await sleep(100 - speedRange.value);
      displayArray();
    }
  
    while (j < n2) {
      arr[k] = rightArray[j];
      j++;
      k++;
      await sleep(100 - speedRange.value);
      displayArray();
    }
  }
  
  async function quickSort(arr, low, high) {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  }
  
  async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        await swap(i, j);
      }
    }
  
    await swap(i + 1, high);
    return i + 1;
  }
  
  async function heapSort() {
    const n = array.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }
  
    for (let i = n - 1; i > 0; i--) {
      await swap(0, i);
      await heapify(i, 0);
    }
  }
  
  async function heapify(heapSize, rootIndex) {
    let largestIndex = rootIndex;
    const leftChildIndex = 2 * rootIndex + 1;
    const rightChildIndex = 2 * rootIndex + 2;
  
    if (leftChildIndex < heapSize && array[leftChildIndex] > array[largestIndex]) {
      largestIndex = leftChildIndex;
    }
  
    if (rightChildIndex < heapSize && array[rightChildIndex] > array[largestIndex]) {
      largestIndex = rightChildIndex;
    }
  
    if (largestIndex !== rootIndex) {
      await swap(rootIndex, largestIndex);
      await heapify(heapSize, largestIndex);
    }
  }
  
  async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
        await sleep(100 - speedRange.value);
        displayArray();
      }
      array[j + 1] = key;
    }
  }
  

  async function swap(index1, index2) {
    await sleep(100 - speedRange.value);
    [array[index1], array[index2]] = [array[index2], array[index1]];
    displayArray();
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  startButton.addEventListener('click', async () => {
    const selectedAlgorithm = algorithmSelect.value;
    const selectedSize = sizeRange.value;

    startButton.disabled = true;
    resetButton.disabled = true;
    algorithmSelect.disabled = true;
    sizeRange.disabled = true;
  

    generateArray(selectedSize);
    displayArray();

    if (selectedAlgorithm === 'bubbleSort') {
      await bubbleSort();
    }

    else if (selectedAlgorithm === 'selectionSort') {
        await selectionSort();
      } else if (selectedAlgorithm === 'mergeSort') {
        await mergeSort(array, 0, array.length - 1);
        displayArray();
      } else if (selectedAlgorithm === 'quickSort') {
        await quickSort(array, 0, array.length - 1);
        displayArray();
      } else if (selectedAlgorithm === 'heapSort') {
        await heapSort();
        displayArray();
      } else if (selectedAlgorithm === 'insertionSort') {
        await insertionSort();
      }

      startButton.disabled = false;
  resetButton.disabled = false;
  algorithmSelect.disabled = false;
  sizeRange.disabled = false;
    
  });
  resetButton.addEventListener('click', () => {
    generateArray(sizeRange.value);
  
    // Re-enable buttons after reset
    startButton.disabled = false;
    resetButton.disabled = false;
    algorithmSelect.disabled = false;
    sizeRange.disabled = false;
  });

  function toggleNavbar() {
    const navbarItems = document.getElementById('navbarItems');
    navbarItems.classList.toggle('show');
  }
