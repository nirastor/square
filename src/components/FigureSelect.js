export default function Select(props) {
  const value = props.value;
  const handleChangeFigure = props.handleChangeFigure;
  
  const figures = props.figures;
  const options = figures.map((figure) =>
    <option value={figure.name} key={figure.name}>{figure.nameForSelect}</option>
);
  
  return (
    <select
      name="select"
      value={value}
      onInput={handleChangeFigure}>
        {options}
    </select>
  );
}