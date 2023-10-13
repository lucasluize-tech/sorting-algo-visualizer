# Algo Visualizer

Algo Visualizer is a web application designed to visually demonstrate the working of various sorting algorithms. It provides an intuitive way to understand how different sorting algorithms work, by allowing users to watch these algorithms in action.

## Features

- **Multiple Sorting Algorithms**: The visualizer supports the following sorting algorithms:
  - Bubble Sort
  - Merge Sort
  - Selection Sort
  - Insertion Sort
  - Quick Sort
- **Interactive UI**: Users can:

  - Create random arrays of different sizes using a slider.
  - Initiate the visualization of any sorting algorithm by clicking on the associated button.

- **Responsive Visualization**: The visualization responds dynamically to the array size specified by the user.

- **Color-Coded Visualization**: The elements being compared or swapped are highlighted for better understanding.

- **Customizable Delay**: Developers can customize the delay time in the visualization by modifying the `DELAY_TIME` constant in the JavaScript file, to slow down or speed up the visualization.

- **Developer Friendly**: The code is structured in a function modular fashion, making it easier to understand and extend.

## Usage

1. Open the `index.html` file in your browser.
2. Use the slider to specify the size of the array you want to sort.
3. Click on any of the sorting algorithm buttons to start the visualization.

## Developer Notes

- The `script.js` file contains the JavaScript code that powers the visualization. The sorting algorithms are implemented as async functions to allow for the visualization delay.
- used `uglifyjs` to minify the js file
- The `styles.css` file (not provided) and Tailwind CSS are used for styling the web page.
- The `normalizeValue` function is used to normalize the height of the bars representing the array elements, so they fit well within the visualization container.

## Author

This project was created by [Lucas Luize](https://lucasluize.com/).

## License

This project is open source and available under the [MIT License](LICENSE).
