import { IArtGenerator, IArtGenConfig } from './types.d';
import * as _ from 'lodash';

/**
 * BaseGenerator
 *
 * Contains the code required to generate art using `GenerationConfigs`
 */
export class BaseGenerator implements IArtGenerator {
  private static DEFAULT_CONFIG: IArtGenConfig = {
    numCircles: 1,
    minMaxRad: 200,
    maxMaxRad: 200,
    minRadFactor: 0.2,
    iterations: 8,
    bgColor: '#ffffff',
    urlColor: '#000000',
    drawsPerFrame: 6
  };

  private config: IArtGenConfig;
  private circles: any[];
  private timer: any;
  private drawCount: Number;

  private TWO_PI: Number = 2 * Math.PI;

  constructor(options ? : IArtGenConfig) {
    this.config = _.extend(BaseGenerator.DEFAULT_CONFIG, (options || {}));
  }

  public getConfig() {
    return this.config;
  }
  public createCanvas() {
    return null;
  }
}
