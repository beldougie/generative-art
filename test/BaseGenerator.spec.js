import { should, expect } from 'chai';
import { BaseGenerator } from '../lib/BaseGenerator';
import { IArtGenConfig } from '../lib/types.d';

should();
describe('BaseGenerator class', () => {

  it('should set default config on construction', () => {
    let sut = new BaseGenerator();
    let expected: IArtGenConfig = {
      numCircles: 1,
      minMaxRad: 200,
      maxMaxRad: 200,
      minRadFactor: 0.2,
      iterations: 8,
      bgColor: '#ffffff',
      urlColor: '#000000',
      drawsPerFrame: 6
    }

    sut.getConfig().should.deep.equal(expected);
  });

  it('should override config values passed to constructor', () => {
    let newConfig: IArtGenConfig = {
      numCircles: 5,
      minMaxRad: 1000
    };
    let expected: IArtGenConfig = {
      numCircles: 5,
      minMaxRad: 1000,
      maxMaxRad: 200,
      minRadFactor: 0.2,
      iterations: 8,
      bgColor: '#ffffff',
      urlColor: '#000000',
      drawsPerFrame: 6
    };
    let sut = new BaseGenerator(newConfig);
    sut.getConfig().should.deep.equal(expected);
  });

  it('should create a canvas object', () => {
    let sut = new BaseGenerator();
    sut.createCanvas().should.be.a('object');
  });
});
