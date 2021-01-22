export default function Select(props) {
  const value = props.value;
  const handleChangeFigure = props.handleChangeFigure;
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
      value={value}
      onInput={handleChangeFigure}>
        {options}
    </select>
  );
}