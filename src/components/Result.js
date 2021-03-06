export default function Result(props) {  
  if (props.result.err) {
    return (
      <div className="result">
        <div className="result-error">{props.result.err}</div>
      </div>
    );
  }

  const result = props.result.result;
  
  return (
    <div className="result">
      <div className="result-square">Площадь: {result.square}</div>
      {result.note &&
        <div>Заметка: {result.note}</div>
      }
    </div>
  );
}