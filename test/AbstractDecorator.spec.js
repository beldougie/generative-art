'use strict';
const chai = require('chai');
const expect = chai.expect;
const AbstractDecorator = require('../lib/AbstractDecorator');
const TEST_CONFIG = require('../lib/generation-constants').SOLID_CONFIG;

chai.should();
describe('AbstractDecorator', () => {

  it('should be easy to access the properties', () => {
    let sut = new AbstractDecorator({}, TEST_CONFIG);
    expect(sut.numCircles).to.equal(TEST_CONFIG.numCircles);
    expect(sut.minMaxRad).to.equal(TEST_CONFIG.minMaxRad);
    expect(sut.maxMaxRad).to.equal(TEST_CONFIG.maxMaxRad);
    expect(sut.minRadFactor).to.equal(TEST_CONFIG.minRadFactor);
    expect(sut.lineWidth).to.equal(TEST_CONFIG.lineWidth);
    expect(sut.bgColor).to.equal(TEST_CONFIG.bgColor);
    expect(sut.urlColor).to.equal(TEST_CONFIG.urlColor);
    expect(sut.drawsPerFrame).to.equal(TEST_CONFIG.drawsPerFrame);
    expect(sut.displayWidth).to.equal(TEST_CONFIG.canvasWidth);
    expect(sut.displayHeight).to.equal(TEST_CONFIG.canvasHeight);
    expect(sut.iterations).to.equal(8);
  });
});
