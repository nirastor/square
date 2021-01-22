export default class Circle {
  constructor() {
    this.name = 'circle';
    this.nameForSelect = 'круг';
    this.numOfParams = 1;
    this.description = 'Введите длинну окружности';
  }

  calculate(params) {
    const length = params[0];
    return {
      result: {
        square: length * length / 4 * Math.PI,
      },
      err: false
    };
  }
}