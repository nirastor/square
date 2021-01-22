import React from 'react';

import Circle from './figures/circle';
import Triangle from './figures/triangle';

export default class App extends React.Component {
  constructor() {
    super();
    this.figures = [
      new Circle(),
      new Triangle(),
    ];
    this.state = {
      selectedFigure: this.figures[0].name,
      values: [''],
    }
    this.handleChangeFigure = this.handleChangeFigure.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getFigure(figureName = this.state.selectedFigure) {
    return this.figures.find((figure) => figure.name === figureName);
  }
  
  getNumberOfInputs(figureName = this.state.selectedFigure) {
    return this.getFigure(figureName).numOfParams;
  }

  handleChangeFigure(e) {
    const newFigure = e.target.value;
    const newValues = new Array(this.getNumberOfInputs(newFigure));
    this.setState({
      selectedFigure: newFigure,
      values: newValues,
      /*
        Тут можно подумать о том как сохранять ранее введенные пользователем значения
        Пример кейса выбрал круг -> ввел число -> выбрал треугольник -> появились два новых поля ->
        выбрал круг обратно -> введенное число сохранилось
      
      */
    });
  }

  handleInput(e) {
    const id = e.target.id;
    const value = e.target.value;
    const newValues = this.state.values.slice();
    newValues[id] = value;
    /* 
      Почему-то при вводе значений для треугольника возникает ошибка неконтролируемого ввода
    */
    /* 
     Возможна ошибка от того что новое values опирается на старое values?
     Как правильно поступать в такой ситуации?
    */
    this.setState({
      values: newValues,
    });

  }

  createOptionsList() {
    return this.figures.map((figure) =>
      <option value={figure.name} key={figure.name}>{figure.nameForSelect}</option>
    );
  }

  /*
    Каждый инпут сам по себе -- кандидат на то, чтобы стать отдельным компонентом
    Или нет?
  */
  createInputsList() {
    const inputs = [];
    for (let i = 0; i < this.getNumberOfInputs(); i += 1) {
      inputs.push(
        <input type="text" key={this.state.selectedFigure + i} id={i} value={this.state.values[i]} onChange={this.handleInput}/>
        /*
          Фигура + индекс в ключе используютсядля того чтобы при смене фигуры поля были новыми
        
          Не очень ок использовать индекс массива в качестве ключа,
          Но тут не вижу других вариаентов кроме как вводить искуственный id для этих полей
          Поскольку массив не будет сортироваться изменться и т.п. должно быть нормлально.

          Также не смог быстро найти как просто достать react key из события
          Поэтому продублировал его в html id
          Наверное тоже такое себе решение, но работает
        */
      )
    }
    return inputs;
  }

  createResult() {
    const numbers = this.state.values.map((i) => Number(i));
    const badIndex = numbers.findIndex((num) => (isNaN(num) || num <= 0));
    
    if (badIndex !== -1) {
      return 'Введите числа больше нуля во все поля';
    }

    const result = this.getFigure().calculate(numbers);

    if (result.err) {
      return result.err;
    }

    return (
      <React.Fragment>
        <div>Площадь: {result.result.square}</div>
        {result.result.note &&
          <div>Заметка: {result.result.note}</div>
        }
      </React.Fragment>
    );
  }
  
  render() {
    /*
      Три кандидата на то чтобы стать отдельными комопонентами
      Но пока делаю без передачи состояния
    */
    const options = this.createOptionsList();
    const inputs = this.createInputsList();
    const result = this.createResult();
        
    return (
      <React.Fragment>
        <select
          name="select"
          value={this.state.value}
          onInput={this.handleChangeFigure}>
            {options}
        </select>
        <div>Выбран: {this.state.selectedFigure}</div>
        <div>{inputs}</div>
        <div>{result}</div>
      </React.Fragment>
    );
  }
}
