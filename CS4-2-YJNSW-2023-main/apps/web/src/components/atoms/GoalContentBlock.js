function GoalContentBlock(props) {
  const measures = props.measures;
  const listItems = measures.map((measure) => <li key={measure.toString()}>{measure}</li>);
  return (
    <div className="nsw-block">
      <div className="nsw-side-nav__header">
        <h3>Goal Information</h3>
      </div>
      <div className="nsw-block" style={{ overflowY: "scroll", height: "250px" }}>
        <p>
          <b>Name: </b>
          {props.name}
        </p>
        <p>
          <b>Type: </b>
          {props.type}
        </p>
        <p>
          <b>Measure:</b>
        </p>
        <ol>{listItems}</ol>
      </div>
    </div>
  );
}

export default GoalContentBlock;
