export default class Circle {
  constructor() {
    this.nameForSelect = 'круг';
    this.numOfParams = 1;
    this.description = 'Введите радиус';
  }

  calculate(params) {
    const radius = params[0];
    return {
      result: {
        square: Math.PI * radius * radius,
      },
      err: false
    };
  }
}