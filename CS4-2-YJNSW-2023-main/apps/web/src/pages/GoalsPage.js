import Goals from "../components/organisms/Goals";
import FullWidthContentTemplate from "../components/templates/FullWidthContentTemplate";
import { GoalProvider } from "../contexts/Goal";

function GoalsPage() {
  return (
    <>
      <GoalProvider>
        <FullWidthContentTemplate content={<Goals />} />
      </GoalProvider>
    </>
  );
}

export default GoalsPage;
