import { useContext } from "react";
import { SearchContext } from "../../contexts/Search";

function ResultsBar() {
  const state = useContext(SearchContext)[0];
  const pagination = state.results.meta?.pagination;

  function getResultsInfoString() {
    const { page, pageSize, total } = pagination;
    const firstResult = Math.min(total, (page - 1) * pageSize + 1);
    const lastResult = Math.min(total, page * pageSize);

    return `Showing results ${firstResult} - ${lastResult} of ${total} results`;
  }

  function getContent() {
    return (
      <div className="nsw-results-bar">
        <div className="nsw-results-bar__info">{getResultsInfoString()}</div>
        <div className="nsw-results-bar__sorting">
          <label className="nsw-form__label" htmlFor="results-sort">
            Sort by:
          </label>
          <select className="nsw-form__select" id="results-sort" name="results-sort">
            <option value="name">Name</option>
          </select>
        </div>
      </div>
    );
  }

  return pagination ? getContent() : null;
}

export default ResultsBar;
