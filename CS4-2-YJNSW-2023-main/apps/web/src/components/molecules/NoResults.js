function NoResults() {
  return (
    <div className="nsw-m-top-lg">
      <div className="nsw-results-bar">
        <div className="nsw-results-bar__info">Sorry, no results found for your search</div>
      </div>
      <hr></hr>
      <div className="nsw-m-top-xl">
        <h4>Didn’t find what you were looking for?</h4>
        <ul>
          <li>Try using different or fewer keywords </li>
          <li>Check your spelling</li>
          <li>Try broader or general search terms</li>
        </ul>
      </div>
    </div>
  );
}

export default NoResults;
