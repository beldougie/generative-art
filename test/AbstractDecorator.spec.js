'use strict';
const chai = require('chai');
const expect = chai.expect;
const AbstractDecorator = require('../lib/AbstractDecorator');
const TEST_CONFIG = require('../lib/generation-constants').SOLID_CONFIG;

chai.should();
describe('AbstractDecorator', () => {

  it('construction without parameters should throw an error', () => {
    let createEmpty = () => new AbstractDecorator();
    let createNoCfg = () => new AbstractDecorator({});
    let createNoCtx = () => new AbstractDecorator(undefined, {});


    expect(createEmpty).to.throw(Error, 'ctx and config are required');
    expect(createNoCfg).to.throw(Error, 'ctx and config are required');
    expect(createNoCtx).to.throw(Error, 'ctx and config are required');
  });

  it('should allow configuration to be overriden', () => {
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
    expect(sut.iterations).to.equal(TEST_CONFIG.iterations);
  });

  it('should throw an exception when begin() is called', () => {
    let sut = new AbstractDecorator({}, TEST_CONFIG);
    expect(sut.begin).to.throw(Error, 'Error! AbstractDecorator#begin must be overridden');
  });

  it('should throw an exception when onTimer() is called', () => {
    let sut = new AbstractDecorator({}, TEST_CONFIG);
    expect(sut.onTimer).to.throw(Error, 'Error! AbstractDecorator#onTimer must be overridden');
  });

  it('should throw an exception when setCircles() is called', () => {
    let sut = new AbstractDecorator({}, TEST_CONFIG);
    expect(sut.setCircles).to.throw(Error, 'Error! AbstractDecorator#setCircles must be overridden');
  });

  it('should throw an exception when drawCircle() is called', () => {
    let sut = new AbstractDecorator({}, TEST_CONFIG);
    expect(sut.drawCircle).to.throw(Error, 'Error! AbstractDecorator#drawCircle must be overridden');
  });

  it('should throw an exception when setLinePoints() is called', () => {
    let sut = new AbstractDecorator({}, TEST_CONFIG);
    expect(sut.setLinePoints).to.throw(Error, 'Error! AbstractDecorator#setLinePoints must be overridden');
  });
});
