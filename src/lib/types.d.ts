export interface IArtGenerator {
  getConfig: Function
}

export interface IArtGenConfig {
  numCircles?: Number,
  minMaxRad?: Number,
  maxMaxRad?: Number,
  minRadFactor?: Number,
  iterations?: Number,
  bgColor?: String,
  urlColor?: String,
  drawsPerFrame?: Number
}
