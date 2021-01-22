import React from 'react';

// figures
import Circle from './figures/circle';
import Triangle from './figures/triangle';

// components
import Select from './components/FigureSelect';
import Inputs from './components/Inputs';
import Result from './components/Result';

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
    this.checkValues = this.checkValues.bind(this);
  }

  getFigure(figureName = this.state.selectedFigure) {
    return this.figures.find((figure) => figure.name === figureName);
  }
  
  getNumberOfInputs(figureName = this.state.selectedFigure) {
    return this.getFigure(figureName).numOfParams;
  }

  checkValues() {
    const numbers = this.state.values.map((i) => Number(i));
    const badIndex = numbers.findIndex((num) => (isNaN(num) || num <= 0));
    return badIndex === -1;
  }

  /* 
    Почему-то при вводе значений после смены фигуры возникает ошибка неконтролируемого ввода
  */

  /*
    Тут можно подумать о том как сохранять ранее введенные пользователем значения
    Пример кейса выбрал круг -> ввел число -> выбрал треугольник -> появились два новых поля ->
    выбрал круг обратно -> введенное число сохранилось
  */
  handleChangeFigure(e) {
    const newFigure = e.target.value;
    const newValues = new Array(this.getNumberOfInputs(newFigure));
    this.setState({
      selectedFigure: newFigure,
      values: newValues,

    });
  }

  /* 
    Переделать сетСтейт на стрелку
  */
  handleInput(e) {
    const id = e.target.id;
    const value = e.target.value;
    const newValues = this.state.values.slice();
    newValues[id] = value;
    this.setState({
      values: newValues,
    });

  }

  render() {   
    return (
      <div className="column">
        <Select
          figures={this.figures}
          value={this.state.value}
          handleChangeFigure={this.handleChangeFigure}
        />
        <Inputs 
          figure={this.getFigure()}
          selectedFigure={this.state.selectedFigure}
          values={this.state.values}
          onChange={this.handleInput}
          checkValues={this.checkValues}
        />
        {this.checkValues() &&
          <Result
            result={this.getFigure().calculate(this.state.values.map((i) => Number(i)))}
          />
        }
      </div>
    );
  }
}
