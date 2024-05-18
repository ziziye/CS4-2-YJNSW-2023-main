import GoalTable from "../molecules/GoalTable";
import { useCallback, useEffect, useRef, useState, useContext } from "react";
import cms from "../../api-clients/cms";
import GoalDropDown from "../atoms/GoalDropDown";
import { useParams } from "react-router-dom";
import { GoalContext } from "../../contexts/Goal";
import { Button } from "nsw-ds-react";

function Goals() {
  const firstUpdate = useRef(true);
  const [goalInfo, setGoalInfo] = useState({ data: {} });
  const { roleId, toRoleId } = useParams();
  const [state] = useContext(GoalContext);
  const filter = state.filter;
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [timestamp, setTimestamp] = useState(0);

  const fetchGoalInfo = useCallback(async () => {
    if (filter === "ALL") {
      let res = await cms.getGoals(roleId, toRoleId);
      setGoalInfo(res);
    } else {
      let res = await cms.getGoalsFilter(roleId, toRoleId, filter);
      setGoalInfo(res);
    }
  });

  useEffect(() => {
    if (firstUpdate.current) {
      fetchGoalInfo();
      firstUpdate.current = false;
    } else {
      firstUpdate.current = true;
    }
  }, []);

  const handleExpandButtonClick = () => {
    setIsAccordionOpen(true);
    setTimestamp(Date.now());
  };

  const handleCollapseButtonClick = () => {
    setIsAccordionOpen(false);
    setTimestamp(Date.now());
  };

  let data = Array.from(goalInfo.data);
  var newdata = [];
  if (data.length === 0) {
    //
  } else {
    newdata = data[0].attributes?.goals.data;
  }
  return (
    <>
      <h1>Goals</h1>

      <div className="nsw-block">
        <p>If a Goal is clicked, it will show the Goal{"'"}s measures.</p>
        <p>
          Please select the Goal{"(s)"} from the list below, then click {`"Add Selected Goals" `}
          button.
        </p>
        <p>
          Your selected Goal{"(s)"} are viewable by clicking {`"View Selected Goals"`} button.
        </p>
        <p>After the Goal{"(s)"} have been added, they will be removed from the selectable list.</p>
        <p>You can add Custom Goal(s) after clicking {`"View Selected Goals"`} button.</p>
        <p></p>
        <GoalDropDown />
        <Button onClick={fetchGoalInfo}>Apply</Button>
      </div>
      <div className="nsw-accordion__toggle nsw-block">
        <button onClick={handleCollapseButtonClick}>Collapse All</button>
        <button onClick={handleExpandButtonClick}>Expand All</button>
      </div>
      <GoalTable setdata={newdata} isAccordionOpen={isAccordionOpen} timestamp={timestamp} />
    </>
  );
}
export default Goals;
