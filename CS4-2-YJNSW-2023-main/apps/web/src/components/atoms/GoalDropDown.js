import { FormGroupSelect } from "../atoms/FormGroupSelect";
import { useContext } from "react";
import { GoalContext } from "../../contexts/Goal";
function GoalDropDown() {
  const dispatch = useContext(GoalContext)[1];
  const handlechange = (e) => {
    dispatch({ type: "CHANGED_FILTER", payload: e.target.value });
  };
  return (
    <>
      <div style={{ width: "25%" }}>
        <FormGroupSelect
          helper="Select a goal type from the list"
          label="Goal Type:"
          options={[
            {
              text: "ALL",
              value: "ALL",
            },
            {
              text: "Performance",
              value: "Performance",
            },
            {
              text: "Development",
              value: "Development",
            },
            {
              text: "Capability",
              value: "Capability",
            },
            {
              text: "70: Workplace Learning",
              value: "70",
            },
            {
              text: "20: Assisted Learning",
              value: "20",
            },
            {
              text: "10: Formal Learning",
              value: "10",
            },
          ]}
          onChange={handlechange}
        />
      </div>
    </>
  );
}
export default GoalDropDown;
