/**
 * BaseGenerator
 *
 * Contains the code required to generate art using `GenerationConfigs`
 */
export class BaseGenerator {
  private _numCirles;
  private _minMaxRad;
  private _maxMaxRad;
  private _minRadFactor;
  private _iterations;
  private _bgColor;
  private _urlColor;
  private _circles;
  private _timer;
  private _drawsPerFrame;
  private _drawCount;
  private _bgColor;
  private _urlColor;

  private TWO_PI = 2 * Math.PI;

  private _defaultOptions = {
    numCircles: 1,
    minMaxRad: 200,
    minMaxRad: 200,
    minRadFactor: 0.2,
  }
}
