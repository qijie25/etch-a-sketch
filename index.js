let buttonStates = {
    normal: false,
    rainbow: false,
    erase: false,
};

const buttons = document.querySelectorAll(".normal-btn, .rainbow-btn, .erase-btn, .clear-btn");

const colorChange = document.querySelector("#base");

const gridContainer = document.querySelector(".grid-container");
const gridSizeInput = document.getElementById("grid-size");
const gridSizeValue = document.getElementById("grid-size-value");

const normalBtn = document.getElementById('normal');
const rainbowBtn = document.getElementById('rainbow');
const eraseBtn = document.getElementById('erase');
const clearBtn = document.getElementById('clear');

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

        gridContainer.appendChild(gridItem);
    }
}

function clearEventListeners() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        const newItem = item.cloneNode(true); // Clone the node to remove all event listeners
        item.parentNode.replaceChild(newItem, item); // Replace the old item with the new one
    });
}

function normalMode() {
    clearEventListeners();
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            this.style.backgroundColor = colorChange.value;
        });
    });
}

function rainbowMode() {
    clearEventListeners();
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            const hue = Math.random() * 360;
            const saturation = 60 + Math.random() * 40;
            const lightness = 50 + Math.random() * 30;
            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            this.style.backgroundColor = color;

            // Convert HSL to Hex
            const rgbColor = hslToRgb(hue / 360, saturation / 100, lightness / 100);
            const hexColor = rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);

            // Update the color picker to the current rainbow color
            colorChange.value = hexColor;
        });
    });
}

// Function to convert HSL to RGB
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Function to convert RGB to Hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function erase() {
    clearEventListeners();
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            this.style.backgroundColor = '#fff';
        });
    });
}

function clear() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.style.backgroundColor = '#fff';
    });
}

function updateButtonState(activeButton) {
    buttons.forEach(button => {
        button.classList.remove('active'); // Remove 'active' class from all buttons
    });
    activeButton.classList.add('active'); // Add 'active' class to the selected button
}

// Add event listener to the "Normal Mode" button
normalBtn.addEventListener('click', function() {
    buttonStates.normal = true;
    buttonStates.rainbow = false;
    buttonStates.shade = false;
    buttonStates.erase = false;
    buttonStates.lighten = false;

    updateButtonState(this);
    normalMode();
});

// Add event listener to the "Rainbow Mode" button
rainbowBtn.addEventListener('click', function() {
    buttonStates.normal = false;
    buttonStates.rainbow = true;
    buttonStates.shade = false;
    buttonStates.erase = false;
    buttonStates.lighten = false;

    updateButtonState(this);
    rainbowMode();
});

eraseBtn.addEventListener('click', function() {
    buttonStates.normal = false;
    buttonStates.rainbow = false;
    buttonStates.shade = false;
    buttonStates.erase = true;
    buttonStates.lighten = false;

    updateButtonState(this);
    erase();
});

clearBtn.addEventListener('click', function() {
    buttonStates.normal = false;
    buttonStates.rainbow = false;
    buttonStates.shade = false;
    buttonStates.erase = false;
    buttonStates.lighten = false;

    updateButtonState(this);
    clear();
});

// Initialize the grid when the page loads
createGrid(gridSizeInput.value);

gridSizeInput.addEventListener('input', function () {
    gridSizeValue.textContent = `${this.value}x${this.value}`;
    createGrid(this.value);
    if (buttonStates.normal) {
        normalMode();
    } else if (buttonStates.rainbow) {
        rainbowMode();
    } else if (buttonStates.erase) {
        erase();
    }
});
