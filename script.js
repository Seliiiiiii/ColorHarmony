const cross = document.querySelector(".cross-info");
const infoBox = document.querySelector(".info-box");

cross.addEventListener("click", () => {
  infoBox.style.display = "none";
});

const harmonies = document.querySelectorAll(".harmony");
const random = document.querySelector(".random");
const complementary = document.querySelector(".complementary");
const triadic = document.querySelector(".triadic");
const tetradic = document.querySelector(".tetradic");
const monochromatic = document.querySelector(".monochromatic");
const splitComplementary = document.querySelector(".split-complementary");
const analogous = document.querySelector(".analogous");

const colors = document.querySelector(".colors");

let colorInputs = [
  document.querySelector(".color1"),
  document.querySelector(".color2"),
  document.querySelector(".color3"),
  document.querySelector(".color4"),
  document.querySelector(".color5"),
];

let hexas = [
  document.querySelector(".color-name1"),
  document.querySelector(".color-name2"),
  document.querySelector(".color-name3"),
  document.querySelector(".color-name4"),
  document.querySelector(".color-name5"),
];

let boxes = [
  document.querySelector(".color-box1"),
  document.querySelector(".color-box2"),
  document.querySelector(".color-box3"),
  document.querySelector(".color-box4"),
  document.querySelector(".color-box5"),
];

const box1 = document.querySelector(".color-box1");
const box2 = document.querySelector(".color-box2");
const box3 = document.querySelector(".color-box3");
const box4 = document.querySelector(".color-box4");
const box5 = document.querySelector(".color-box5");

let locks = [
  document.querySelector(".schloss-1"),
  document.querySelector(".schloss-2"),
  document.querySelector(".schloss-3"),
  document.querySelector(".schloss-4"),
  document.querySelector(".schloss-5"),
];

let isLocked = [false, false, false, false, false];

// HEADER
const header = document.querySelector("header");
const h1Titel = document.querySelector("h1");
const h1Span = document.querySelector(".focus-span");
const button = document.querySelector(".button-start");

setInterval(() => {
  const homeColor = getRandomColor();
  header.style.backgroundColor = homeColor;
  button.style.backgroundColor = header.style.backgroundColor;
  button.style.color = createComplementary(homeColor);
  const shadowColor = createMonocromatic(homeColor, 4);
  button.style.boxShadow = `0 2px 8px 1px ${shadowColor}`;
  h1Titel.style.color = createMonocromatic(homeColor, 4);
  h1Span.style.color = createComplementary(homeColor);
}, 3000);

// HEXA ANZEIGEN
function fillHexa() {
  for (let i = 0; i < 5; i++) {
    hexas[i].innerText = colorInputs[i].value;
  }
}

// HEXA KOPIEREN
function copyHexa() {
  hexas.forEach((colorElement, index) => {
    if (colorElement.dataset.listenerAttached === "true") return;
    colorElement.setAttribute("title", `Copy ${hexas[index].textContent}`);
    colorElement.addEventListener("click", () => {
      navigator.clipboard
        .writeText(hexas[index].textContent)
        .then(() => alert(`Copied: ${hexas[index].textContent}`))
        .catch((err) => alert("Copy failed", err));
    });
    colorElement.dataset.listenerAttached = "true";
  });
}

copyHexa();

// FARBE FÜR START
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let colorInputs = "#";
  for (let i = 0; i < 6; i++) {
    colorInputs += letters[Math.floor(Math.random() * 16)];
  }
  return colorInputs;
}

// FARBE FÜR START BEI SPACE
document.addEventListener("keydown", (x) => {
  if (x.code === "Space") {
    x.preventDefault();

    random2();
    updateComplementary1();
    updateComplementary2();
    updateTriadic();
    updateTetradic();
    updateMonochromatic();
    updateSplitComplementary();
    updateAnalogous();
    fillHexa();
    copyHexa();
  }
});

// AUSWAHL VON HARMONY
harmonies.forEach((harmony) => {
  harmony.addEventListener("click", () => {
    if (
      harmony.classList.contains("complementary") ||
      harmony.classList.contains("triadic") ||
      harmony.classList.contains("tetradic") ||
      harmony.classList.contains("monochromatic") ||
      harmony.classList.contains("split-complementary") ||
      harmony.classList.contains("analogous")
    ) {
      const falseCount = isLocked.filter((locked) => locked).length;
      if (falseCount >= 2) {
        harmonies.forEach((item) => item.classList.remove("harmony-active"));

        alert("You can only lock one color at a time.");

        return;
      }
      if (falseCount <= 1) {
        harmony.classList.add("harmony-active");
      }
    }

    if (!colors.contains(box3)) colors.appendChild(box3);
    if (!colors.contains(box4)) colors.appendChild(box4);
    if (!colors.contains(box5)) colors.appendChild(box5);

    if (harmony.classList.contains("complementary")) {
      if (colors.contains(box3)) colors.removeChild(box3);
      if (colors.contains(box4)) colors.removeChild(box4);
      if (colors.contains(box5)) colors.removeChild(box5);
    }

    if (
      harmony.classList.contains("triadic") ||
      harmony.classList.contains("split-complementary")
    ) {
      if (colors.contains(box4)) colors.removeChild(box4);
      if (colors.contains(box5)) colors.removeChild(box5);
    }

    if (harmony.classList.contains("tetradic")) {
      if (colors.contains(box5)) colors.removeChild(box5);
    }

    random2();
    updateComplementary1();
    updateComplementary2();
    updateTriadic();
    updateTetradic();
    updateMonochromatic();
    updateSplitComplementary();
    updateAnalogous();
    fillHexa();
    copyHexa();
  });
});

// UPDATE COLORS
colorInputs[0].addEventListener("input", function () {
  updateComplementary1();
  updateMonochromatic();
  updateTriadic();
  updateTetradic();
  updateSplitComplementary();
  updateAnalogous();
  fillHexa();
});

colorInputs[1].addEventListener("input", function () {
  updateComplementary2();
  updateMonochromatic();
  updateTriadic();
  updateTetradic();
  updateSplitComplementary();
  updateAnalogous();
  fillHexa();
});

colorInputs[2].addEventListener("input", function () {
  updateMonochromatic();
  updateTriadic();
  updateTetradic();
  updateSplitComplementary();
  updateAnalogous();
  fillHexa();
});

colorInputs[3].addEventListener("input", function () {
  updateMonochromatic();
  updateTetradic();
  updateAnalogous();
  fillHexa();
});

colorInputs[4].addEventListener("input", function () {
  updateMonochromatic();
  updateAnalogous();
  fillHexa();
});

//  HEX TO HSL
function hexToHSL(hex) {
  let r = 0,
    g = 0,
    b = 0;

  hex = hex.replace("#", "");

  if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (hex.length === 3) {
    r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
    g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
    b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return [h, s, l];
}

// HSL TO HEX
function hslToHex(hsl) {
  let { h, s, l } = hsl;
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

// ALLGEMEIN
let isUpdating = false;
lockToggler();

// RANDOM

function random2() {
  colorInputs.forEach((input, index) => {
    if (!isLocked[index]) {
      const randomHex = getRandomColor();
      input.value = randomHex;
    }
  });
}

//COMPLEMENTARY
function createComplementary(hex) {
  const hsl = hexToHSL(hex);

  const compHue = (hsl[0] + 180) % 360;
  const complementaryColor = hslToHex({ h: compHue, s: hsl[1], l: hsl[2] });
  return complementaryColor;
}

function updateComplementary1() {
  isUpdating = false;
  if (!complementary.classList.contains("harmony-active")) return;
  isUpdating = true;
  colorInputs[1].value = createComplementary(colorInputs[0].value);
  isUpdating = false;
}

function updateComplementary2() {
  isUpdating = false;
  if (!complementary.classList.contains("harmony-active")) return;
  isUpdating = true;
  colorInputs[0].value = createComplementary(colorInputs[1].value);
  isUpdating = false;
}

// TRIADIC
function createTriadic(hex) {
  const [h, s, l] = hexToHSL(hex);

  const h1 = (h + 120) % 360;
  const h2 = (h + 240) % 360;

  return [hslToHex({ h: h1, s: s, l: l }), hslToHex({ h: h2, s: s, l: l })];
}

createTriadic(colorInputs[0].value);

isUpdating = false;

function updateTriadic() {
  const isActive = document.querySelector(".triadic.harmony-active");
  if (isActive) {
    const [triadic1, triadic2] = createTriadic(colorInputs[0].value);
    colorInputs[1].value = triadic1;
    colorInputs[2].value = triadic2;
  }
}

// TETRADIC
function createTetradic(hex) {
  const [h, s, l] = hexToHSL(hex);
  const h2 = (h + 90) % 360;
  const h3 = (h + 180) % 360;
  const h4 = (h + 270) % 360;

  return [
    hslToHex({ h, s, l }),
    hslToHex({ h: h2, s, l }),
    hslToHex({ h: h3, s, l }),
    hslToHex({ h: h4, s, l }),
  ];
}

function updateTetradic() {
  const isActive = document.querySelector(".tetradic.harmony-active");
  if (isActive) {
    const [c1, c2, c3, c4] = createTetradic(colorInputs[0].value);
    colorInputs[0].value = c1;
    colorInputs[1].value = c2;
    colorInputs[2].value = c3;
    colorInputs[3].value = c4;
  }
}

// MONOCHROMATIC
function createMonocromatic(hex, level) {
  const hexClean = hex.replace("#", "");
  let r = parseInt(hexClean.substring(0, 2), 16);
  let g = parseInt(hexClean.substring(2, 4), 16);
  let b = parseInt(hexClean.substring(4, 6), 16);

  function adjustColor(colorInputs, factor) {
    return Math.min(Math.max(0, colorInputs + factor), 255);
  }

  const factor = 25 * level;
  const adjustedR = adjustColor(r, factor);
  const adjustedG = adjustColor(g, factor);
  const adjustedB = adjustColor(b, factor);

  return `#${((1 << 24) + (adjustedR << 16) + (adjustedG << 8) + adjustedB)
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
}

isUpdating = false;

function updateMonochromatic() {
  if (isUpdating) return;
  const isActive = monochromatic.classList.contains("harmony-active");
  if (isActive) {
    isUpdating = true;
    colorInputs[1].value = createMonocromatic(colorInputs[0].value, 1);
    colorInputs[2].value = createMonocromatic(colorInputs[0].value, 2);
    colorInputs[3].value = createMonocromatic(colorInputs[0].value, 3);
    colorInputs[4].value = createMonocromatic(colorInputs[0].value, 4);
    isUpdating = false;
  }
}

// SPLIT COMPLEMENTARY
function updateSplitComplementary() {
  const isActive = document.querySelector(
    ".split-complementary.harmony-active"
  );
  if (isActive) {
    const [splitComp1, splitComp2] = createSplitComplementary(
      colorInputs[0].value
    );
    colorInputs[1].value = splitComp1;
    colorInputs[2].value = splitComp2;
  }
}
updateSplitComplementary();

function createSplitComplementary(hex) {
  const [h, s, l] = hexToHSL(hex);

  const h1 = (h + 160) % 360;
  const h2 = (h + 200) % 360;

  const split1 = hslToHex({ h: h1, s, l });
  const split2 = hslToHex({ h: h2, s, l });

  return [split1, split2];
}

// ANALOGOUS
isUpdating = false;

function updateAnalogous() {
  if (isUpdating) return;
  const isActive = analogous.classList.contains("harmony-active");
  if (isActive) {
    isUpdating = true;

    const [c2, c3, c4, c5] = createAnalogous(colorInputs[0].value, 20);
    colorInputs[1].value = c2;
    colorInputs[2].value = c3;
    colorInputs[3].value = c4;
    colorInputs[4].value = c5;

    isUpdating = false;
  }
}

function createAnalogous(hex, angleShift) {
  const [h, s, l] = hexToHSL(hex);
  const offsets = [1, 2, 3, 4];
  return offsets.map((offset) => {
    const newH = (h + offset * angleShift + 360) % 360;
    return hslToHex({ h: newH, s, l });
  });
}

//SCHLOSS
function lockToggler() {
  locks.forEach((lock, index) => {
    lock.addEventListener("click", () => {
      const isClosed = lock.src.includes("schloss-close.svg");

      if (isClosed) {
        lock.src = "schloss-open.svg";
        isLocked[index] = false;
      } else {
        lock.src = "schloss-close.svg";
        isLocked[index] = true;

        const openBeforeClose = isLocked.slice(0, index).includes(false);

        if (!openBeforeClose) {
          return;
        }

        let unlockedIndex = isLocked.findIndex((locked) => !locked);

        if (unlockedIndex !== -1) {
          let tempColor = colorInputs[unlockedIndex].value;
          colorInputs[unlockedIndex].value = colorInputs[index].value;
          colorInputs[index].value = tempColor;

          let tempSrc = locks[unlockedIndex].src;
          locks[unlockedIndex].src = locks[index].src;
          locks[index].src = tempSrc;

          let tempLocked = isLocked[unlockedIndex];
          isLocked[unlockedIndex] = isLocked[index];
          isLocked[index] = tempLocked;
        }
      }
    });
  });
}
