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
let color = document.querySelectorAll(".color");

const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const color3 = document.querySelector(".color3");
const color4 = document.querySelector(".color4");
const color5 = document.querySelector(".color5");

const hexas = document.querySelectorAll(".color-name");

const hexa1 = document.querySelector(".color-name1");
const hexa2 = document.querySelector(".color-name2");
const hexa3 = document.querySelector(".color-name3");
const hexa4 = document.querySelector(".color-name4");
const hexa5 = document.querySelector(".color-name5");

let colorBox1 = document.querySelector(".color-box1");
let colorBox2 = document.querySelector(".color-box2");
let colorBox3 = document.querySelector(".color-box3");
let colorBox4 = document.querySelector(".color-box4");
let colorBox5 = document.querySelector(".color-box5");

// HEXA ANZEIGEN
function fillHexa() {
  for (let i = 1; i <= 5; i++) {
    document.querySelector(`.color-name${i}`).innerText =
      document.querySelector(`.color${i}`).value;
  }
}

// HEXA KOPIEREN

function copyHexa() {
  const hexas = [hexa1, hexa2, hexa3, hexa4, hexa5];

  hexas.forEach((colorElement, index) => {
    colorElement.setAttribute("title", `Copy ${hexas[index].textContent}`);
    colorElement.addEventListener("click", () => {
      navigator.clipboard
        .writeText(hexas[index].textContent)
        .then(() => alert(`Copied: ${hexas[index].textContent}`))
        .catch((err) => alert("Copy failed", err));
    });
  });
}

copyHexa();

// FARBE FÜR START
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let colorMath = "#";
  for (let i = 0; i < 6; i++) {
    colorMath += letters[Math.floor(Math.random() * 16)];
  }
  return colorMath;
}

// FARBE FÜR START BEI SPACE
document.addEventListener("keydown", (x) => {
  if (x.code === "Space") {
    x.preventDefault();

    const randomColor = getRandomColor();
    color1.value = randomColor;

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
    harmonies.forEach((item) => item.classList.remove("harmony-active"));
    harmony.classList.add("harmony-active");

    const randomColor = getRandomColor();
    color1.value = randomColor;

    if (harmony.classList.contains("complementary")) {
      colorBox3.remove();
    } else {
      if (!colors.contains(colorBox3)) colors.appendChild(colorBox3);
    }

    if (
      harmony.classList.contains("complementary") ||
      harmony.classList.contains("triadic") ||
      harmony.classList.contains("split-complementary")
    ) {
      colorBox4.remove();
    } else {
      if (!colors.contains(colorBox4)) colors.appendChild(colorBox4);
    }

    if (
      harmony.classList.contains("complementary") ||
      harmony.classList.contains("triadic") ||
      harmony.classList.contains("tetradic") ||
      harmony.classList.contains("split-complementary")
    ) {
      colorBox5.remove();
    } else {
      if (!colors.contains(colorBox5)) colors.appendChild(colorBox5);
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
color1.addEventListener("input", function () {
  updateComplementary1();
  updateMonochromatic();
  updateTriadic();
  updateTetradic();
  updateSplitComplementary();
  updateAnalogous();
  fillHexa();
});

color2.addEventListener("input", function () {
  updateComplementary2();
  updateMonochromatic();
  updateTriadic();
  updateTetradic();
  updateSplitComplementary();
  updateAnalogous();
  fillHexa();
});

color3.addEventListener("input", function () {
  updateMonochromatic();
  updateTriadic();
  updateTetradic();
  updateSplitComplementary();
  updateAnalogous();
  fillHexa();
});

color4.addEventListener("input", function () {
  updateMonochromatic();
  updateTetradic();
  updateAnalogous();
  fillHexa();
});

color5.addEventListener("input", function () {
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

// RANDOM
function random2() {
  color2.value = getRandomColor();
  color3.value = getRandomColor();
  color4.value = getRandomColor();
  color5.value = getRandomColor();
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
  color2.value = createComplementary(color1.value);
  isUpdating = false;
}

function updateComplementary2() {
  isUpdating = false;
  if (!complementary.classList.contains("harmony-active")) return;
  isUpdating = true;
  color1.value = createComplementary(color2.value);
  isUpdating = false;
}

// TRIADIC
function createTriadic(hex) {
  const [h, s, l] = hexToHSL(hex);

  const h1 = (h + 120) % 360;
  const h2 = (h + 240) % 360;

  return [hslToHex({ h: h1, s: s, l: l }), hslToHex({ h: h2, s: s, l: l })];
}

createTriadic(color1.value);

isUpdating = false;

function updateTriadic() {
  const isActive = document.querySelector(".triadic.harmony-active");
  if (isActive) {
    const [triadic1, triadic2] = createTriadic(color1.value);
    color2.value = triadic1;
    color3.value = triadic2;
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
    const [c1, c2, c3, c4] = createTetradic(color1.value);
    color1.value = c1;
    color2.value = c2;
    color3.value = c3;
    color4.value = c4;
  }
}

// MONOCHROMATIC
function createMonocromatic(hex, level) {
  const hexClean = hex.replace("#", "");
  let r = parseInt(hexClean.substring(0, 2), 16);
  let g = parseInt(hexClean.substring(2, 4), 16);
  let b = parseInt(hexClean.substring(4, 6), 16);

  function adjustColor(color, factor) {
    return Math.min(Math.max(0, color + factor), 255);
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
    color2.value = createMonocromatic(color1.value, 1);
    color3.value = createMonocromatic(color1.value, 2);
    color4.value = createMonocromatic(color1.value, 3);
    color5.value = createMonocromatic(color1.value, 4);
    isUpdating = false;
  }
}

// SPLIT COMPLEMENTARY
function updateSplitComplementary() {
  const isActive = document.querySelector(
    ".split-complementary.harmony-active"
  );
  if (isActive) {
    const [splitComp1, splitComp2] = createSplitComplementary(color1.value);
    color2.value = splitComp1;
    color3.value = splitComp2;
  }
}
updateSplitComplementary();

function createSplitComplementary(hex) {
  const [h, s, l] = hexToHSL(hex);

  const h1 = (h + 160) % 360;
  const h2 = (h + 200) % 360;

  const color1 = hslToHex({ h: h1, s, l });
  const color2 = hslToHex({ h: h2, s, l });

  return [color1, color2];
}

// ANALOGOUS
isUpdating = false;

function updateAnalogous() {
  if (isUpdating) return;
  const isActive = analogous.classList.contains("harmony-active");
  if (isActive) {
    isUpdating = true;

    const [c2, c3, c4, c5] = createAnalogous(color1.value, 20);
    color2.value = c2;
    color3.value = c3;
    color4.value = c4;
    color5.value = c5;

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
