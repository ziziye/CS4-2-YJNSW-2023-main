import StreamFilters from "../molecules/StreamFilters";
import IdentifiedFilter from "../molecules/IdentifiedFilter";
import { useContext } from "react";
import { SearchContext } from "../../contexts/Search";
import { Button } from "nsw-ds-react";

function ResultFilters() {
  const [state, dispatch] = useContext(SearchContext);

  const filters = [
    <StreamFilters key="StreamFilters" />,
    <IdentifiedFilter key="IdentifiedFilter" />,
  ].map((filter) => {
    return (
      <div className="nsw-filters__item" key={filter.key}>
        {filter}
      </div>
    );
  });

  const handleApplyFiltersClick = () => {
    dispatch({ type: "CLICK_APPLY_FILTERS_BUTTON" });
  };

  const handleClearFiltersClick = () => {
    dispatch({ type: "CLICK_CLEAR_FILTERS_BUTTON" });
  };

  const content = (
    <div className="nsw-filters nsw-filters--fixed">
      <div className="nsw-filters__wrapper">
        <div className="nsw-filters__title">Filter results</div>
        <div className="nsw-filters__list">{filters}</div>
        <div className="nsw-filters__accept">
          <Button type="submit" data-cy="filters-submit" onClick={handleApplyFiltersClick}>
            Apply filters
          </Button>
        </div>
        <div className="nsw-filters__cancel">
          <Button type="reset" data-cy="filters-reset" onClick={handleClearFiltersClick}>
            Clear all filters
          </Button>
        </div>
      </div>
    </div>
  );

  return state.lastSearchTimestamp ? content : null;
}

export default ResultFilters;
