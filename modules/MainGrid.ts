import Square from "./Square";

export default class MainGrid {
  public width: number;
  public height: number;
  public array: (Square | false)[][]

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.array = Array.from(
      { length: height + 5 },
      () => Array.from({ length: width }, () => false)
    )
  }
}
