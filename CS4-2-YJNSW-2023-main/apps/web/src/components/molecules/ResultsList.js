import { Link } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../contexts/Search";

function ResultsList() {
  const state = useContext(SearchContext)[0];
  const roles = state.results.data;

  const results = roles?.map((role) => {
    return (
      <div className="nsw-list-item" key={role.id}>
        <div className="nsw-list-item__content">
          <div className="nsw-list-item__title">
            <Link to={`/roles/${role.id}/overview`}>{role.attributes.roleName}</Link>
          </div>
          <div className="nsw-list-item__copy">{role.attributes.shortDesc}</div>
        </div>
      </div>
    );
  });

  return <div className="nws-search-results">{results}</div>;
}

export default ResultsList;
