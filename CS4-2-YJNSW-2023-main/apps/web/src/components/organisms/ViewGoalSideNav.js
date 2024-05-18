import GoalContentBlock from "../atoms/GoalContentBlock";

function ViewGoalSideNav() {
  const array = ["Info 1", "Info 2", "Info 3"];
  return (
    <>
      <GoalContentBlock name="Act Up As A CaseWorker" type="Performance" measures={array} />
    </>
  );
}
export default ViewGoalSideNav;
