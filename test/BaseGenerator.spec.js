'use strict';
const BaseGenerator = require('../lib/BaseGenerator');
const expect = require('chai').expect;
require('chai').should();

describe('BaseGenerator class', () => {

    it('should set default config on construction', () => {
        let sut = new BaseGenerator();
        let expected = {
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
        }
        sut.getConfig().should.deep.equal(expected);
    });

    it('should override config values passed to constructor', () => {
        let newConfig = {
            numCircles: 5,
            minMaxRad: 1000
        };
        let expected = {
            numCircles: 5,
            minMaxRad: 1000,
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
        let sut = new BaseGenerator(newConfig);
        sut.getConfig().should.deep.equal(expected);
    });

    it('should create a canvas object', () => {
        let sut = new BaseGenerator();
        expect(sut.createCanvas()).to.be.ok;
    });
});
