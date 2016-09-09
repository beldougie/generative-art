'use strict';
const SolidGenerator = require('../lib/SolidGenerator');
const expect = require('chai').expect;
const EXPECTED_CONFIG = require('../lib/generation-constants').SOLID_CONFIG;
require('chai').should();

describe('SolidGenerator class', () => {

  it('should set default config on construction', () => {
    let sut = new SolidGenerator();
    sut.config.should.deep.equal(EXPECTED_CONFIG);
  });

  it('should override config values passed to constructor', () => {
    let newConfig = {
      numCircles: 5,
      minMaxRad: 1000
    };
    let expected = EXPECTED_CONFIG;
    expected.minMaxRad = 1000;
    expected.maxMaxRad = 200;

    let sut = new SolidGenerator(newConfig);
    sut.config.should.deep.equal(expected);
  });

  it('should create a canvas object', () => {
    let sut = new SolidGenerator();
    expect(sut.createCanvas()).to.be.ok;
  });
});
