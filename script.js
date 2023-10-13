const bubbleSortButton = document.querySelector("#bubbleSort-button");
const mergeSortButton = document.querySelector("#mergeSort-button");
const selectionSortButton = document.querySelector("#selectionSort-button");
const insertionSortButton = document.querySelector("#insertionSort-button");
const quickSortButton = document.querySelector("#quickSort-button");
const arrayContainer = document.querySelectorAll(".array-container");
const submitForm = document.querySelector("#form");
// to change page color
const PAGE_COLOR = "#540cee";
const DELAY_TIME = 300; // in milliseconds

// start function to call the algorithm for each button
async function start(container, algorithm) {
  console.log(`using ${algorithm} on ${ARRAY}`);
  switch (algorithm) {
    case "Bubble Sort":
      console.log("calling bubble sort...");
      await bubbleSort(container, ARRAY);
      break;
    case "Selection Sort":
      console.log("calling selection sort...");
      await selectionSort(container, ARRAY);
      break;
    case "Merge Sort":
      console.log("calling merge sort...");
      await mergeSortIterative(container, ARRAY);
      break;
    case "Insertion Sort":
      console.log("calling insertion sort...");
      await insertionSort(container, ARRAY);
      break;
    case "Quick Sort":
      console.log("calling quick sort...");
      await quickSortIterative(container, ARRAY);
      break;
    default:
      console.error(`Unknown algorithm: ${algorithm}`);
  }
}

// UTILITIES

// highlight the bars that are being compared
function highlightBars(container, index1, index2) {
  const bars = container.querySelectorAll(".bar");
  if (bars[index1] === undefined || bars[index2] === undefined) return;
  bars[index1].style.backgroundColor = "#2f6e83";
  bars[index2].style.backgroundColor = "#b068b0";
}

// modify the height of the bars that are being compared
function updateBarHeights(container, index1, index2, arr) {
  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);
  const bars = container.querySelectorAll(".bar");
  if (bars[index1] === undefined || bars[index2] === undefined) return;
  bars[index1].style.height = `${
    normalizeValue(
      arr[index1],
      minVal,
      maxVal,
      30,
      70
    ) /* normalized height computation */
  }%`;
  bars[index1].innerHTML = `${arr[index1]}`;
  bars[index2].style.height = `${normalizeValue(
    arr[index2],
    minVal,
    maxVal,
    30,
    70
  )}%`;
  bars[index2].innerHTML = `${arr[index2]}`;
}

// make sure the final array is sorted and the heights are updated
function updateFinal(container, arr) {
  const bars = container.querySelectorAll(".bar");
  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);

  for (let i = 0; i < bars.length; i++) {
    const normalizedHeight = normalizeValue(arr[i], minVal, maxVal, 30, 70);
    bars[i].style.height = `${normalizedHeight}%`;
    bars[i].innerHTML = `${arr[i]}`;
  }
}

// reset the highlights
function resetHighlights() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar) => (bar.style.backgroundColor = PAGE_COLOR)); // Reset to original color
}

// ALGORITHMS

async function bubbleSort(container, arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      // Modified condition to len - i - 1
      highlightBars(container, j, j + 1);
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        console.log(`updating bar heights ${j} ${j + 1}`);
        updateBarHeights(container, j, j + 1, arr);
      }
      await sleep(DELAY_TIME); // Introduce a small delay
      resetHighlights();
    }
  }
  console.log("sorted -->", arr);
  return arr;
}

// sleep function to introduce a small delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function selectionSort(container, arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      highlightBars(container, min, j);
      if (arr[min] > arr[j]) {
        min = j;
      }
      await sleep(DELAY_TIME); // Introduce a small delay
      resetHighlights();
    }
    if (min !== i) {
      let tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
      console.log(`updating bar heights ${i} ${min}`);
      updateBarHeights(container, i, min, arr);
    }
  }
  updateFinal(container, arr);
  console.log("sorted -->", arr);
  return arr;
}

async function mergeSortIterative(container, arr) {
  let n = arr.length;
  for (let curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
    for (let left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
      let mid = Math.min(left_start + curr_size - 1, n - 1);
      let right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

      let start = left_start;
      let end = right_end;
      let l = start;
      let m = mid;
      let r = end;
      let n1 = m - l + 1;
      let n2 = r - m;
      let L = new Array(n1);
      let R = new Array(n2);

      for (let i = 0; i < n1; i++) L[i] = arr[l + i];
      for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

      let i = 0;
      let j = 0;
      let k = l;
      while (i < n1 && j < n2) {
        highlightBars(container, k, m + 1 + j);
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        await sleep(DELAY_TIME); // Introduce a small delay
        console.log(`updating bar heights ${k} ${m + 1 + j}`);
        updateBarHeights(container, k, m + 1 + j, arr);
        resetHighlights();
        k++;
      }

      while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
      }

      while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
      }
    }
  }
  updateFinal(container, arr);
  console.log("sorted -->", arr);
  return arr;
}

async function insertionSort(container, arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      highlightBars(container, j, j + 1);
      arr[j + 1] = arr[j];
      console.log(`updating bar heights ${j} ${j + 1}`);
      updateBarHeights(container, j, j + 1, arr);
      await sleep(200); // Introduce a small delay
      resetHighlights();
      j--;
    }
    arr[j + 1] = key;
    updateFinal(container, arr);
  }
  console.log("sorted -->", arr);
  return arr;
}

async function quickSortIterative(container, arr) {
  let stack = [];
  stack.push(0);
  stack.push(arr.length - 1);

  while (stack.length > 0) {
    let h = stack.pop();
    let l = stack.pop();

    let pivotIndex = await partition(container, arr, l, h);

    if (pivotIndex - 1 > l) {
      stack.push(l);
      stack.push(pivotIndex - 1);
    }

    if (pivotIndex + 1 < h) {
      stack.push(pivotIndex + 1);
      stack.push(h);
    }
  }
  updateFinal(container, arr);
  console.log("sorted -->", arr);
  return arr;
}

async function partition(container, arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    highlightBars(container, i, j);
    if (arr[j] <= pivot) {
      i++;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      console.log(`updating bar heights ${i} ${j}`);
      updateBarHeights(container, i, j, arr);
    }
    await sleep(DELAY_TIME); // Introduce a small delay
    resetHighlights();
  }

  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  updateBarHeights(container, i + 1, high, arr);

  return i + 1;
}
// ------------------------------
// START OF THE PROGRAM

let ARRAY = [];
let array_copy = [];
let lastSelected = null;

// generate random values for the array
function generateRandomValues(num) {
  for (let i = 0; i < num; i++) {
    ARRAY.push(Math.floor(Math.random() * 100));
  }
  array_copy = [...ARRAY]; // copy to preserve the original array state
}

// normalize the values to fit the bar chart
function normalizeValue(value, min, max, newMin, newMax) {
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
}

// here we generate the bar chart on every array container
function generateBarChart(arr) {
  const barChart = document.createElement("div");
  barChart.classList.add("bar-chart");
  barChart.style.height = `100%`;

  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);

  for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement("div");
    const normalizedHeight = normalizeValue(arr[i], minVal, maxVal, 30, 70);
    bar.classList.add(`bar`);
    bar.textContent = arr[i];
    bar.style.height = `${normalizedHeight}%`;
    barChart.appendChild(bar);
  }
  return barChart;
}

// Events

// submit form to generate random values and append the bar chart
submitForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const slider = document.querySelector(".slider");
  const n = slider.value;
  if (lastSelected === n) {
    e.target.disabled = true;
  } else {
    lastSelected = n;
    if (ARRAY.length > 0) {
      ARRAY = [];
    }
    generateRandomValues(n);
    console.log(`values ${n}, array ${ARRAY}`);
    arrayContainer.forEach((container) => {
      if (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
      }
      container.appendChild(generateBarChart(ARRAY));
    });
  }
  //disable submit button after submit
  e.target.disabled = true;
  // show message
  document.querySelector("#message").hidden = false;
});

// each algorithm button calls the start their function inside their own bar container

bubbleSortButton.addEventListener("click", async function () {
  const container = document.querySelector("#bubble-container");
  let name = this.value;
  await start(container, name);
  ARRAY = [...array_copy];
});

mergeSortButton.addEventListener("click", async function () {
  const container = document.querySelector("#merge-container");
  let name = this.value;
  await start(container, name);
  ARRAY = [...array_copy];
});

selectionSortButton.addEventListener("click", async function () {
  const container = document.querySelector("#selection-container");
  let name = this.value;
  await start(container, name);
  ARRAY = [...array_copy];
});

insertionSortButton.addEventListener("click", async function () {
  const container = document.querySelector("#insertion-container");
  let name = this.value;
  await start(container, name);
  ARRAY = [...array_copy];
});

quickSortButton.addEventListener("click", async function () {
  const container = document.querySelector("#quick-container");
  let name = this.value;
  await start(container, name);
  ARRAY = [...array_copy];
});
// PROGRAM END HERE
// ------------------------------
