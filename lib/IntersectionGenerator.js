'use strict';
const IntersectionDecorator = require('./IntersectionDecorator');
const BaseGenerator = require('./BaseGenerator');
const DEFAULT_CONFIG = require('./generation-constants').INTERSECTION_CONFIG;
const _ = require('lodash');

class IntersectionGenerator extends BaseGenerator {
  constructor(config) {
    super(_.extend(DEFAULT_CONFIG, config), IntersectionDecorator);
  }
}

module.exports = IntersectionGenerator;
