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
    this.figures = {
      circle: new Circle(),
      triangle: new Triangle(),
    }
    this.state = {
      selectedFigure: 'circle',
      values: [''],
    }
    this.handleChangeFigure = this.handleChangeFigure.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.checkValues = this.checkValues.bind(this);
  }

  checkValues() {
    const numbers = this.state.values.map((i) => Number(i));
    const badIndex = numbers.findIndex((num) => (isNaN(num) || num <= 0));
    return badIndex === -1;
  }

  /*
    Тут можно подумать о том как сохранять ранее введенные пользователем значения
    Пример кейса выбрал круг -> ввел число -> выбрал треугольник -> появились два новых поля ->
    выбрал круг обратно -> введенное в первое поле число сохранилось
  */
  handleChangeFigure(e) {
    const newFigure = e.target.value;
    const newValues = new Array(this.figures[newFigure].numOfParams);
    this.setState({
      selectedFigure: newFigure,
      values: newValues,
    });
  }

  /* 
    Почему-то при вводе значений после смены фигуры возникает ошибка неконтролируемого ввода
    Но все работает
  */
  handleInput(e) {
    this.setState((state) => {
      const id = e.target.id;
      const value = e.target.value;
      const newValues = state.values.slice();
      newValues[id] = value;
      return {values: newValues};
    });
  }

  render() {   
    return (
      <div className="column">
        <Select
          figures={this.figures}
          value={this.state.selectedFigure}
          handleChangeFigure={this.handleChangeFigure}
        />
        <Inputs 
          figure={this.figures[this.state.selectedFigure]}
          selectedFigure={this.state.selectedFigure}
          values={this.state.values}
          onChange={this.handleInput}
          checkValues={this.checkValues}
        />
        {this.checkValues() &&
          <Result
            result={this.figures[this.state.selectedFigure].calculate(this.state.values.map((i) => Number(i)))}
          />
        }
      </div>
    );
  }
}
