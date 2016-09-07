'use strict';
const SolidGenerator = require('../lib/SolidGenerator');
const expect = require('chai').expect;
require('chai').should();

describe('BaseGenerator class', () => {

    it('should set default config on construction', () => {
        let sut = new SolidGenerator();
        let expected = {
            numCircles: 1,
            minMaxRad: 200,
            maxMaxRad: 200,
            minRadFactor: 0.2,
            lineWidth: 2,
            bgColor: '#ffffff',
            urlColor: '#000000',
            drawsPerFrame: 6,
            canvasWidth: 200,
            canvasHeight: 200
        };
        sut.config.should.deep.equal(expected);
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
            lineWidth: 2,
            bgColor: '#ffffff',
            urlColor: '#000000',
            drawsPerFrame: 6,
            canvasWidth: 200,
            canvasHeight: 200
        };
        let sut = new SolidGenerator(newConfig);
        sut.config.should.deep.equal(expected);
    });

    it('should create a canvas object', () => {
        let sut = new SolidGenerator();
        expect(sut.createCanvas()).to.be.ok;
    });
});
