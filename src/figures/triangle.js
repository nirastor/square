export default class Triangle {
  constructor() {
    this.name = 'triangle';
    this.nameForSelect = 'треугольник';
    this.numOfParams = 3;
    this.description = 'Введите три стороны треугольника';
  }

  /*
    Спорный вопрос с короткими именами переменных.
    Но в случае с локальным использованием: только внутри класса
    и учитывая предметную область: стороны треугольника,
    то наверное можно
  */

  heronFormula(a, b, c) {
    const p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
  }

  calculate(params) {
    const sides = params.slice();
    sides.sort((a, b) => a - b);

    const a = sides[0];
    const b = sides[1];
    const c = sides[2];

    const result = {};
    
    if (a + b <= c) {
      result.result = false;
      result.err = 'Треугольник не существует';
      return result;
    }

    result.result = {};
    result.err = false;

    if (a * a + b * b === c * c) {
      result.result.square = a * b / 2;
      result.result.note = 'Треугольник прямоугольный';
      return result;
    }
    
    result.result.square = this.heronFormula(a, b, c);
 
    return result;
  }
}