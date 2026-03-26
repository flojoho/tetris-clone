export default class MainGrid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.array = Array.from({ length: height + 5 }, () => Array.from({ length: width }, () => false));
    }
}
