import FullWidthContentTemplate from "../components/templates/FullWidthContentTemplate";
import RoleOverview from "../components/organisms/RoleOverview";

function RoleOverviewPage() {
  sessionStorage.clear("SelectedGoals");
  return <FullWidthContentTemplate content={<RoleOverview />} />;
}

export default RoleOverviewPage;
