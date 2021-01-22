export default function Input(props) {
  const inputs = [];
  for (let i = 0; i < props.figure.numOfParams; i += 1) {
    inputs.push(
      <input
        className="inputs-input"
        type="text"
        key={props.selectedFigure + i}
        id={i}
        value={props.values[i]}
        onChange={props.onChange}
      />
    )
  }

  return (
    <div className="inputs">
      <div className="inputs-description">{props.figure.description}</div>
      <div className="inputs-inputs-list">
        {inputs}
      </div>
      {!props.checkValues() && 
        <div className="iputs-validate-message">Введите числа больше нуля во все поля</div>
      }
    </div>
  );
}