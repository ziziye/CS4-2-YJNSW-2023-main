import { FormGroupSelect } from "../atoms/FormGroupSelect";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { CareerProgressionContext } from "../../contexts/CareerProgression";
import { SearchContext } from "../../contexts/Search";

function IdentifiedFilter() {
  const location = useLocation().pathname;
  const [state, dispatch] =
    location == "/search" ? useContext(SearchContext) : useContext(CareerProgressionContext);

  const handleFilterChange = (e) => {
    dispatch({ type: "CHANGE_IDENTIFIED_FILTER", payload: e.target.value });
  };

  return (
    <FormGroupSelect
      label="Identified"
      options={[
        {
          text: "All",
          value: "All",
        },
        {
          text: "Identified Only",
          value: "Identified Only",
        },
        {
          text: "Non-Identified Only",
          value: "Non-Identified Only",
        },
      ]}
      value={state.selectedIdentifiedFilter}
      onChange={handleFilterChange}
    />
  );
}

export default IdentifiedFilter;
