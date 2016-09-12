'use strict';

function randomHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function randomRGB() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

function randomRGBA() {
  let rgb = randomRGB();
  return rgb.replace(/\)$/, ',' + Math.floor(Math.random()).toString() + ')');
}

module.exports = {
  randomHex: randomHex,
  randomRGB: randomRGB,
  randomRGBA: randomRGBA
};
