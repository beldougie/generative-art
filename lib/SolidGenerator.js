'use strict';
const BaseGenerator = require('./BaseGenerator');
const SolidDecorator = require('./SolidDecorator');
const _ = require('lodash');
const DEFAULT_CONFIG = require('./generation-constants').SOLID_CONFIG;

class SolidGenerator extends BaseGenerator {
    constructor(config) {
        super(_.extend(DEFAULT_CONFIG, config), SolidDecorator);
    }
}


module.exports = SolidGenerator;
