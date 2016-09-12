'use strict';
const sinon = require('sinon');
const utils = require('../../lib/utils/utils');

require('chai').should();

describe('Utility functions', () => {

  describe('Random Color Generators', () => {

    before(() => {
      sinon.stub(Math, 'random').returns(1);
    });

    after(() => {
      Math.random.restore();
    });

    it('randomHex should create a valid hex string', () => {
      const expected = '#ffffff';
      utils.randomHex().should.equal(expected);
    });

    it('randomRGB should create a valid RGB string', () => {
      const expected = 'rgb(255,255,255)';
      utils.randomRGB().should.equal(expected);
    });

    it('randomRGBA should create a valid RGBA string', () => {
      const expected = 'rgb(255,255,255,1)';
      utils.randomRGBA().should.equal(expected);
    });
  });
});
