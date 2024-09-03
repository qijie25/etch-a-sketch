let buttonStates = {
    normal: false,
    rainbow: false,
    shade: false,
    erase: false,
    lighten: false,
};

const buttons = document.querySelectorAll(".normal-btn, .rainbow-btn, .shade-btn, .erase-btn, .lighten-btn, .clear-btn");

const colorChange = document.querySelector("#base");

const gridContainer = document.querySelector(".grid-container");
const gridSizeInput = document.getElementById("grid-size");
const gridSizeValue = document.getElementById("grid-size-value");

function createGrid(size) {
    // Clear any existing grid
    gridContainer.innerHTML = '';

    // Calculate the size of each grid item
    const itemSize = 100 / size;

    // Create grid items
    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        // Set the size of each grid item using flexbox
        gridItem.style.flexBasis = `${itemSize}%`;
        gridItem.style.height = `${itemSize}%`;

        gridItem.addEventListener('mouseover', function () {
            this.style.backgroundColor = colorChange.value;
        });

        gridContainer.appendChild(gridItem);
    }
}

createGrid(gridSizeInput.value);

gridSizeInput.addEventListener('input', function () {
    gridSizeValue.textContent = `${this.value}x${this.value}`;
    createGrid(this.value);
});
