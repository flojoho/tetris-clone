
export type Color = 'white' | 'whiteTransparent';

export default class Square {
  public x: number;
  public y: number;
  public color: Color;

  constructor(x: number, y: number, color: Color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  public static width = 30;
}
