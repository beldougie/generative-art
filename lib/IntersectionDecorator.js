'use strict';
const AbstractDecorator = require('./AbstractDecorator');
const utils = require('./utils/utils');
const _ = require('lodash');
class IntersectionDecorator extends AbstractDecorator {
  constructor(ctx, config) {
    let defaultConfig = {};
    if(_.isUndefined(config.color1)) {
      defaultConfig.color1 = utils.randomRGBA();
    }
    if(_.isUndefined(config.color2)) {
      defaultConfig.color2 = utils.randomRGBA();
    }
    super(ctx, _.extend(defaultConfig, config));
  }

  begin() {
    console.log('this.config', this.config);
    return new Promise(resolve => resolve(this.ctx));
  }

  onTimer() {
    console.log('tick');
  }

  setCircles() {
    console.log('circles');
  }

  drawCircle() {
    console.log('draw circle');
  }

  setLinePoints() { console.log('line points'); }
}

module.exports = IntersectionDecorator;
