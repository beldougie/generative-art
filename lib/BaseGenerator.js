'use strict';
const Canvas = require('canvas');
const _ = require('lodash');
const DEFAULT_CONFIG = require('./generation-constants').DEFAULT_CONFIG;

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
 *  - lineWidth Number (default 3)
 *  - bgColor String (default '#ffffff')
 *  - urlColor String (default '#000000')
 *  - drawsPerFrame Number (default 6)
 *  - canvasWidth Number (default 200)
 *  - canvasHeight Number (default 200)
 */
class BaseGenerator {
    /**
     * Construct a new BaseGenerator instance
     *
     * @param config optional override default configuration options
     */
    constructor(config, decoratorClass) {
        if(!_.isUndefined(config) && _.isObject(config)) {
            this._config = _.extend(DEFAULT_CONFIG, config);
        } else {
            this._config = DEFAULT_CONFIG;
        }
        this._decorator = decoratorClass;
        this.circles = [];
        this.xSqueeze = 0.85;
    }

    get config() {
        return this._config;
    }

    createCanvas() {
        this.canvas = new Canvas(this.config.canvasWidth, this.config.canvasHeight);
        this.context = this.canvas.getContext('2d');
        return !!this.canvas;
    }

    startGeneration() {
        this.createCanvas();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.displayWidth, this.canvas.displayHeight);

        this.decorator = new this.decoratorClass(this.context, this.config);
        this.decorator.begin();
    }
}

module.exports = BaseGenerator;
