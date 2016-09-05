'use strict';
const Canvas = require('canvas');
const Image = Canvas.Image;

const _ = require('lodash');
const TWO_PI = 2 * Math.PI;
const DEFAULT_CONFIG = {
    numCircles: 1,
    minMaxRad: 200,
    maxMaxRad: 200,
    minRadFactor: 0.2,
    iterations: 8,
    bgColor: '#ffffff',
    urlColor: '#000000',
    drawsPerFrame: 6,
    canvasWidth: 200,
    canvasHeight: 200
};

/**
 * BaseGenerator
 *
 * Contains the code required to generate art using `GenerationConfigs`
 *
 * Pass a config object to the constructor to set your own options.
 * Available options are:
 *  - numCircles Number (default 1)
 *  - minMaxRad Number (default 200)
 *  - maxMaxRad Number (default 200)
 *  - minRadFactor Number (default 0.2)
 *  - iterations Number (default 8)
 *  - bgColor String (default '#ffffff')
 *  - urlColor String (default '#000000')
 *  - drawsPerFrame Number (default 6)
 *  - canvasWidth Number (default 200)
 *  - canvasHeight Number (default 200)
 */
const BaseGenerator = class {
    /**
     * Construct a new BaseGenerator instance
     *
     * @param config optional override default configuration options
     */
    constructor(config) {
        if(!_.isUndefined(config) && _.isObject(config)) {
            this.config = _.extend(DEFAULT_CONFIG, config);
        } else {
            this.config = DEFAULT_CONFIG;
        }
        this.circles = [];
    }

    getConfig() {
        return this.config;
    }

    createCanvas() {
        this.canvas = new Canvas(this.config.canvasWidth, this.config.canvasHeight);
        this.context = this.canvas.getContext('2d');
        console.log('the canvas:', this.canvas);
        console.info('Canvas created successfully');
        return !!this.canvas;
    }

    startGeneration() {
        this.createCanvas();
        this.drawCount = 0;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.displayWidth, this.canvas.displayHeight);
        this.setCircles();
        if(this.timer) clearInterval(this.time);
        this.timer = setInterval(this.onTimer, 1000 / 60);
    }

    setCircles() {

    }

    onTimer() {

    }
}

module.exports = BaseGenerator;
