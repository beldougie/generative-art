'use strict';
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
    drawsPerFrame: 6
};

/**
 * BaseGenerator
 *
 * Contains the code required to generate art using `GenerationConfigs`
 */
const BaseGenerator = class {
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
        return null;
    }
}

module.exports = BaseGenerator;
