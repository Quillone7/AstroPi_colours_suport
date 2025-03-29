const ledPanel = document.getElementById('led-panel');
const colorPalette = document.getElementById('color-palette');
const codeOutput = document.getElementById('code-output');
const resetButton = document.getElementById('reset-button');

const colors = {
    a: [240, 240, 240], // a = (240, 240, 240)
    b: [150, 150, 150], // b = (150, 150, 150)
    c: [50, 50, 50],     // c = (50, 50, 50)
    d: [100, 150, 200], // d = (100, 150, 200)
    e: [0, 0, 200],     // e = (0, 0, 200)
    f: [150, 100, 100], // f = (150, 100, 100)
    g: [0, 200, 200],   // g = (0, 200, 200)
    h: [0, 200, 150],   // h = (0, 200, 150)
    j: [150, 200, 100], // j = (150, 200, 100)
    k: [100, 150, 100], // k = (100, 150, 100)
    l: [0, 255, 0],     // l = (0, 255, 0)
    m: [0, 150, 0],     // m = (0, 150, 0)
    n: [150, 200, 150], // n = (150, 200, 150)
    o: [100, 100, 50],  // o = (100, 100, 50)
    p: [200, 200, 100], // p = (200, 200, 100)
    q: [255, 255, 0],   // q = (255, 255, 0)
    r: [200, 150, 100], // r = (200, 150, 100)
    s: [150, 100, 50],  // s = (150, 100, 50)
    t: [200, 100, 0],   // t = (200, 100, 0)
    u: [200, 0, 0],     // u = (200, 0, 0)
    v: [255, 0, 0],     // v = (255, 0, 0)
    w: [200, 100, 100], // w = (200, 100, 100)
    y: [255, 0, 255],   // y = (255, 0, 255)
    z: [150, 0, 200],   // z = (150, 0, 200)
    x: [0, 0, 0]        // x = (0, 0, 0)
};

let selectedColor = null;
let ledGrid = [];

// Generowanie planszy LED
for (let i = 0; i < 64; i++) {
    const led = document.createElement('div');
    led.style.backgroundColor = `rgb(${colors['x'].join(',')})`; // Domyślnie kolor x
    led.style.border = '1px solid #ffcccc';
    led.addEventListener('click', () => {
        if (selectedColor) {
            led.style.backgroundColor = `rgb(${colors[selectedColor].join(',')})`;
            ledGrid[i] = selectedColor;
            updateCodeOutput();
        } else {
            led.style.backgroundColor = `rgb(${colors['x'].join(',')})`; // Ustaw na kolor x
            ledGrid[i] = 'x';
            updateCodeOutput();
        }
    });
    ledPanel.appendChild(led);
    ledGrid.push('x'); // Domyślnie kolor x
}

// Generowanie palety kolorów
for (const color in colors) {
    const colorOption = document.createElement('div');
    colorOption.classList.add('color-option');
    colorOption.style.backgroundColor = `rgb(${colors[color] ? colors[color].join(',') : '#fff'})`;
    colorOption.textContent = color;
    colorOption.addEventListener('click', () => {
        selectedColor = color;
    });
    colorPalette.appendChild(colorOption);
}

// Aktualizacja kodu wyjściowego
function updateCodeOutput() {
    let code = "";
    for (let i = 0; i < ledGrid.length; i++) {
        const color = ledGrid[i];
        if (color) {
            code += color + ", ";
        } else {
            code += "x, "; // Ustaw na kolor x
        }
        if ((i + 1) % 8 === 0) {
            code += "\n";
        }
    }
    codeOutput.textContent = code;
}

// Generowanie listy kolorów po prawej stronie
function generateColorList() {
    let colorListHTML = "Kolory:\n";
    for (const color in colors) {
        colorListHTML += `${color} = (${colors[color].join(', ')})\n`;
    }
    codeOutput.insertAdjacentHTML('afterend', `<div id="color-list">${colorListHTML}</div>`);
}

generateColorList();

resetButton.addEventListener('click', () => {
    for (let i = 0; i < 64; i++) {
        ledPanel.children[i].style.backgroundColor = `rgb(${colors['x'].join(',')})`; // Ustaw na kolor x
        ledGrid[i] = 'x';
    }
    updateCodeOutput();
});

updateCodeOutput();