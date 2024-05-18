import CareerProgressionResults from "./CareerProgressionResults";
import IdentifiedFilter from "./IdentifiedFilter";
import StreamFilters from "./StreamFilters";
import { useContext, useState } from "react";
import { CareerProgressionContext } from "../../contexts/CareerProgression";
import Proptypes from "prop-types";
import "./CareerProgressionDiscover.css";

function CareerProgressionDiscover({ resultsCount }) {
  const [searchText, setSearchText] = useState("");
  const dispatch = useContext(CareerProgressionContext)[1];

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch({ type: "CLICK_SEARCH_BUTTON", payload: searchText });
  };

  return (
    <nav className="nsw-side-nav" aria-labelledby="sksm726ns">
      <div className="nsw-side-nav__header" id="sksm726ns">
        <h4>Discover Roles</h4>
      </div>
      <div className="nsw-block">
        <div className="nsw-form">
          <div className="nsw-form__input-group nsw-form__input-group--icon nsw-form__input-group--large">
            <label className="sr-only" htmlFor="search-bar">
              Search
            </label>
            <input
              className="nsw-form__input"
              type="text"
              id="search-bar"
              name="search-bar"
              placeholder="Search by keyword"
              onChange={handleSearchTextChange}
              data-cy="CareerProgression-searchinput"
            ></input>
            <button
              className="nsw-button nsw-button--white nsw-button--flex"
              type="submit"
              onClick={handleSearchSubmit}
              data-cy="CareerProgression-submit"
            >
              <span
                className="material-icons nsw-material-icons"
                // focusable="false"
                aria-hidden="true"
              >
                search
              </span>
            </button>
          </div>
        </div>
        <div className="nsw-grid">
          <div className="nsw-col nsw-col-sm-6">
            <StreamFilters />
          </div>
          <div className="nsw-col nsw-col-sm-6">
            <IdentifiedFilter />
          </div>
        </div>
        <div className="nsw-side-nav__header">
          <p>
            {resultsCount} {resultsCount > 1 ? "Results" : "Result"}
          </p>
        </div>
      </div>
      <div className="scroll-nav">
        <CareerProgressionResults />
      </div>
    </nav>
  );
}

CareerProgressionDiscover.propTypes = {
  resultsCount: Proptypes.number,
};

export default CareerProgressionDiscover;
