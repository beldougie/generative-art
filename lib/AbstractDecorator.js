'use strict';
class AbstractDecorator {
    get xSqueeze() {
        return 0.85;
    }

    get iterations() {
        return 8;
    }

    get lineWidth() {
        return this.config.lineWidth;
    }

    get ctx() {
        return this._ctx;
    }

    get minMaxRad() {
        return this.config.minMaxRad;
    }

    get maxMaxRad() {
        return this.config.maxMaxRad;
    }

    get minRadFactor() {
        return this.config.minRadFactor;
    }

    get numCircles() {
        return this.config.numCircles;
    }

    get displayWidth() {
        return this.config.canvasWidth;
    }

    get displayHeight() {
        return this.config.canvasHeight;
    }

    get drawsPerFrame() {
        return this.config.drawsPerFrame;
    }

    get bgColor() {
        return this.config.bgColor;
    }

    get urlColor() {
        return this.config.urlColor;
    }

    get config() {
        return this._config;
    }

    get circles() {
        return this._circles;
    }

    constructor(ctx, config) {
        this._ctx = ctx;
        this._config = config;
    }

    begin() {
        throw new Error('Error! AbstractDecorator#begin must be overridden');
    }

    onTimer() {
        throw new Error('Error! AbstractDecorator#onTimer must be overridden');
    }

    setCircles() {
        throw new Error('Error! AbstractDecorator#setCircles must be overridden');
    }

    drawCircle() {
        throw new Error('Error! AbstractDecorator#drawCircle must be overridden');
    }

    setLinePoints() {
        throw new Error('Error! AbstractDecorator#setLinePoints must be overridden');
    }
}

module.exports = AbstractDecorator;
