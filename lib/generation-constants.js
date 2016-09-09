'use strict';

module.exports = {
  TWO_PI: Math.PI * 2,
  DEFAULT_CONFIG: {
    numCircles: 1,
    minMaxRad: 200,
    maxMaxRad: 200,
    minRadFactor: 0.2,
    lineWidth: 1,
    bgColor: '#ffffff',
    urlColor: '#000000',
    drawsPerFrame: 6,
    canvasWidth: 200,
    canvasHeight: 200,
    iterations: 6
  },
  SOLID_CONFIG: {
    numCircles: 1,
    minMaxRad: 20,
    maxMaxRad: 190,
    minRadFactor: 0.4,
    lineWidth: 1,
    bgColor: '#ffffff',
    urlColor: '#000000',
    canvasWidth: 200,
    canvasHeight: 200,
    drawsPerFrame: 8,
    iterations: 6
  }
};
