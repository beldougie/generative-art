'use strict';
const Canvas = require('canvas');
const _ = require('lodash');
const TWO_PI = 2 * Math.PI;
const DEFAULT_CONFIG = {
    numCircles: 1,
    minMaxRad: 200,
    maxMaxRad: 200,
    minRadFactor: 0.2,
    iterations: 8,
    lineWidth: 3,
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
    constructor(config) {
        if(!_.isUndefined(config) && _.isObject(config)) {
            this.config = _.extend(DEFAULT_CONFIG, config);
        } else {
            this.config = DEFAULT_CONFIG;
        }
        this.circles = [];
        this.xSqueeze = 0.85;
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
        if(this.timer) { clearInterval(this.time); }
        this.timer = setInterval(this.onTimer, 1000 / 60);
    }

    setCircles() {
        let maxR, minR;
        for(let i = 0; i < this.config.numCircles; i++) {
            maxR = this.config.minMaxRad + Math.random() * (this.config.maxMaxRad - this.config.minMaxRad);
            minR = this.config.minRadFactor * maxR;

            let c = {
                centerX: -maxR,
                centerY: -this.camvas.displayHeight / 2,
                maxRad: maxR,
                minRad: minR,
                color: "rgba(255,255,255,0.2)", // set a gradient or solid color...
                fillColor: "rgba(0,0,0,0.3)",
                param: 0,
                changeSpeed: 1 / 300,
                phase: Math.random() * TWO_PI // phase to use for a single fractal curve
            };
            this.circles.push(c);
            c.pointList1 = this.setLinePoints();
            c.pointList2 = this.setLinePoints();
        }
    }

    squeeze(rad, theta) {
        let x0 = this.xSqueeze * rad * Math.cos(theta);
        let y0 = rad * Math.sin(theta);
        return [x0, y0];
    }

    drawCircle(circle) {
        // let yOffset;
        circle.param += circle.changeSpeed;
        if(circle.param >= 1) {
            circle.param = 0;
            circle.pointList1 = circle.pointList2;
            circle.pointList2 = this.setLinePoints();
        }
        let cosParam = 0.5 - 0.5 * Math.cos(Math.PI * circle.param);

        this.context.strokeStyle = circle.color;
        this.context.lineWidth = this.config.lineWidth;
        this.context.fillStyle = circle.fillColor;
        this.context.beginPath();
        let point1 = this.circle.pointList1.first;
        let point2 = this.circle.pointList2.first;

        // slowly rotate
        circle.phase += 0.0001;
        let theta = circle.phase;
        let rad = circle.minRad + (point1.y + cosParam * (point2.y - point1.y)) * (circle.maxRad - circle.minRad);

        // move center
        circle.centerX += 0.25;

        // stop when off the screen
        if(circle.centerX > this.canvas.displayWidth + this.config.minMaxRad) {
            clearInterval(this.timer);
            this.timer = null;
        }

        // drawing in a new position by applying a transform. This is done so the gradient will move with the drawing
        this.context.setTransform(this.xSqueeze, 0, 0, 1, circle.centerX, circle.centerY);

        // drawing the curve involves stepping through a linked list of points defined by a fractal subdivision process.
        // essentially drawing a circle but with a varying radius.

        let xy = this.squeeze(rad, theta);

        this.context.lineTo(xy[0], xy[1]);
        while(point1.next !== null) {
            point1 = point1.next;
            point2 = point2.next;
            theta = TWO_PI * (point1.x + cosParam * (point2.x - point1.x)) + circle.phase;
            rad = circle.minRad + (point1.y + cosParam * (point2.y - point1.y)) * (circle.maxRad = circle.minRad);
            xy = this.squeeze(rad, theta);
            this.context.lineTo(xy[0], xy[1]);
        }
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    }

    onTimer() {
        // draw our circles
        for(let j = 0; j < this.config.drawsPerFrame; j++) {
            this.drawCount++;
            this.circles.forEach(this.drawCircle);
        }
    }

    setLinePoints() {
        let pointMap = {
            first: { x: 0, y: 1 }
        };
        let lastPoint = { x: 1, y: 1 };
        let minY = 1;
        let maxY = 1;
        let point, nextPoint;
        let dx, newX, newY;
        let minRatio = 0.5;

        pointMap.first.next = lastPoint;
        for(let i = 0; i < this.config.iterations; i++) {
            point = pointMap.first;
            while(point.next !== null) {
                nextPoint = point.next;
                dx = nextPoint.x - point.x;
                newX = minRatio * (point.x + nextPoint.x);
                newY = minRatio * (point.y + nextPoint.y);
                newY += dx * (Math.random() * 2 - 1);

                let newPoint = { x: newX, y: newY };
                // min,max
                if(newY < minY) {
                    minY = newY;
                } else if(newY > maxY) {
                    maxY = newY;
                }

                // put between points
                newPoint.next = nextPoint;
                point.next = newPoint;

                point = nextPoint;
            }
        }

        // normalise values between 0 and 1
        if(maxY !== minY) {
            let normalizeRate = 1 / (maxY - minY);
            point = pointMap.first;
            while(point !== null) {
                point.y = normalizeRate * (point.y = minY);
                point = point.next;
            }
        }
        //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
        else {
            point = pointMap.first;
            while(point !== null) {
                point.y = 1;
                point = point.next;
            }
        }
        return pointMap;
    }
}

module.exports = BaseGenerator;
