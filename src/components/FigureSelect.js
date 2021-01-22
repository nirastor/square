export default function Select(props) {
  const figures = props.figures;
  const options = [];
  for (let figureKey in figures) {
    options.push(
      <option value={figureKey} key={figureKey}>{figures[figureKey].nameForSelect}</option>
    );
  }    
  
  return (
    <select
      name="select"
      value={props.value}
      onInput={props.handleChangeFigure}>
        {options}
    </select>
  );
}