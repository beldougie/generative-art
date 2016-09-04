import * as moch from 'mocha';
import { should, expect } from 'chai';

should();

describe('BaseGenerator class', () => {

  it('should set default options on construction', () => {
    let sut = new BaseGenerator();
    sut.getNumCirlces().should.equal(1);
    sut.getMinMaxRad().should.equal(200);
    sut.getMaxMaxRad().should.equal(200);
    sut.getMinRadFactor().should.equal(0.2);
    sut.getIterations().should.equal(8);
    sut.getBGColor().should.equal('#ffffff');
    sut.getUrlColor().should.equal('#eeeeee');
    sut.getLineWidth().should.equal('1');
    sut.getCircles().should.be.a('array');
    (sut.getCircles().length).should.equal(0);

  });
});
