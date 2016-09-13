'use strict';
const AbstractDecorator = require('./AbstractDecorator');
const utils = require('./utils/utils');
const _ = require('lodash');
const TWO_PI = require('./generation-constants').TWO_PI;

class IntersectionDecorator extends AbstractDecorator {
  get xSqueeze() {
    return 0.75;
  }
  constructor(ctx, config) {
    let defaultConfig = {};
    if(_.isUndefined(config.color1)) {
      defaultConfig.color1 = utils.randomRGBA();
    }
    if(_.isUndefined(config.color2)) {
      defaultConfig.color2 = utils.randomRGBA();
    }
    super(ctx, _.extend(defaultConfig, config));
    this._circles = [];
  }

  begin() {
    this.drawCount = 0;
    this.setCircles();
    return new Promise((resolve, reject) => {
      try {
        this.running = true;
        while(this.running === true) {
          this.onTimer();
        }
        return resolve(this.ctx);
      } catch(e) {
        reject(e);
      }
    });
  }

  onTimer() {
    for(let j = 0; j < this.drawsPerFrame; j++) {
      this.drawCount++;
      this.circles.forEach(circle => {
        this.drawCircle.apply(this, [circle]);
      });
    }
  }

  setCircles() {
    var maxR, minR;
    var grad;
    var phase = Math.random() * TWO_PI;
    var phaseVariance = 0.2 * Math.PI * 2;

    for(let i = 0; i < this.numCircles; i++) {
      maxR = this.minMaxRad + Math.random() * (this.maxMaxRad - this.minMaxRad);
      minR = this.minRadFactor * maxR;
      if(i === 0) {
        grad = this.ctx.createRadialGradient(0, 0, minR, 0, 0, maxR);
        grad.addColorStop(1, this.config.color1);
        grad.addColorStop(0, this.config.color2);
      } else {
        grad = this.ctx.createRadialGradient(0, 0, minR, 0, 0, maxR);
        grad.addColorStop(0, this.config.color2);
        grad.addColorStop(1, this.config.color1);
      }
    }

    var newCircle = {
      centerX: -this.maxMaxRad,
      centerY: this.displayHeight / 2 - 50,
      maxRad: maxR,
      minRad: minR,
      color: grad, //can set a gradient or solid color here.
      fillColor: this.urlColor,
      param: 0,
      changeSpeed: 1 / 220,
      phase: Math.random() * TWO_PI, //the phase to use for a single fractal curve.
      globalPhase: phase + (2 * Math.random() - 1) * phaseVariance, //the curve as a whole will rise and fall by a sinusoid.
    };
    this.circles.push(newCircle);
    newCircle.pointList1 = this.setLinePoints();
    newCircle.pointList2 = this.setLinePoints();
  }

  drawCircle(c) {
    c.param += c.changeSpeed;
    if(c.param >= 1) {
      c.param = 0;

      c.pointList1 = c.pointList2;
      c.pointList2 = this.setLinePoints();
    }
    let cosParam = 0.5 - 0.5 * Math.cos(Math.PI * c.param);

    this.ctx.strokeStyle = c.color;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.fillStyle = c.fillColor;
    this.ctx.beginPath();
    let point1 = c.pointList1.first;
    let point2 = c.pointList2.first;

    //slowly rotate
    c.phase += 0.0002;

    let theta = c.phase;
    let rad = c.minRad + (point1.y + cosParam * (point2.y - point1.y)) * (c.maxRad - c.minRad);

    //move center
    c.centerX += 0.5;
    c.centerY += 0.04;
    let yOffset = 40 * Math.sin(c.globalPhase + this.drawCount / 2500 * TWO_PI);
    //stop when off screen
    if(c.centerX > this.displayWidth + this.maxMaxRad) {
      this.running = false;
    }

    //we are drawing in new position by applying a transform. We are doing this so the gradient will move with the drawing.
    this.ctx.setTransform(this.xSqueeze, 0, 0, 1, c.centerX, c.centerY + yOffset);

    //Drawing the curve involves stepping through a linked list of points defined by a fractal subdivision process.
    //It is like drawing a circle, except with varying radius.
    let xy = this.squeeze(rad, theta);
    this.ctx.lineTo(xy[0], xy[1]);
    while(point1.next !== undefined) {
      point1 = point1.next;
      point2 = point2.next;
      theta = TWO_PI * (point1.x + cosParam * (point2.x - point1.x)) + c.phase;
      rad = c.minRad + (point1.y + cosParam * (point2.y - point1.y)) * (c.maxRad - c.minRad);
      xy = this.squeeze(rad, theta);
      this.ctx.lineTo(xy[0], xy[1]);
    }
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }

  setLinePoints() {
    let pointList = {};
    pointList.first = { x: 0, y: 1 };

    let lastPoint = { x: 1, y: 1 };
    let minY = 1;
    let maxY = 1;
    let point;
    let nextPoint;
    let dx, newX, newY;
    let minRatio = 0.5;

    pointList.first.next = lastPoint;
    for(let i = 0; i < this.iterations; i++) {
      point = pointList.first;
      while(point.next !== undefined) {
        nextPoint = point.next;

        dx = nextPoint.x - point.x;
        newX = minRatio * (point.x + nextPoint.x);
        newY = minRatio * (point.y + nextPoint.y);
        newY += dx * (Math.random() * 2 - 1);

        var newPoint = { x: newX, y: newY };

        //min, max
        if(newY < minY) {
          minY = newY;
        } else if(newY > maxY) {
          maxY = newY;
        }

        //put between points
        newPoint.next = nextPoint;
        point.next = newPoint;

        point = nextPoint;
      }
    }

    //normalize to values between 0 and 1
    if(maxY !== minY) {
      var normalizeRate = 1 / (maxY - minY);
      point = pointList.first;
      while(point !== undefined) {
        point.y = normalizeRate * (point.y - minY);
        point = point.next;
      }
    }
    //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
    else {
      point = pointList.first;
      while(point !== undefined) {
        point.y = 1;
        point = point.next;
      }
    }

    return pointList;
  }

}

module.exports = IntersectionDecorator;
