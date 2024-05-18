import GoalFilters from "../atoms/GoalFilters";
import GoalContentBlock from "../atoms/GoalContentBlock";

function GoalSideNav() {
  const array = ["Info 1", "Info 2", "Info 3"];
  return (
    <>
      <GoalFilters />
      <GoalContentBlock name="Act Up As A CaseWorker" type="Performance" measures={array} />
    </>
  );
}
export default GoalSideNav;
