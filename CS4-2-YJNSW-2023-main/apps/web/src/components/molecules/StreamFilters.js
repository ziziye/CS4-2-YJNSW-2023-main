import { FormGroupCheckbox } from "nsw-ds-react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CareerProgressionContext } from "../../contexts/CareerProgression";
import { SearchContext } from "../../contexts/Search";

function StreamFilters() {
  const streams = ["Custodial", "Community", "Business Support"];
  const location = useLocation().pathname;
  const [state, dispatch] =
    location === "/search" ? useContext(SearchContext) : useContext(CareerProgressionContext);

  const handleFilterChange = (e) => {
    dispatch({
      type: "CLICK_STREAM_FILTER",
      payload: { stream: e.target.name, isSelected: e.target.checked },
    });
  };

  return (
    <FormGroupCheckbox
      as="group"
      data-cy="stream-checkbox"
      label="Stream"
      options={streams.map((stream) => {
        return {
          name: stream,
          text: stream,
          value: stream,
          checked: state.selectedStreamFilters.includes(stream),
          onChange: handleFilterChange,
        };
      })}
    />
  );
}

export default StreamFilters;
