import LeftSidebarTemplate from "../components/templates/LeftSidebarTemplate";
import SeventyTwentyTen from "../components/organisms/SeventyTwentyTen";
import LearningSideNav from "../components/organisms/LearningSideNav";

function SeventyTwentyTenPage() {
  sessionStorage.clear("SelectedGoals");
  return (
    <LeftSidebarTemplate
      topContent={<h1>Development Activities</h1>}
      sidebarContent={<LearningSideNav />}
      mainContent={<SeventyTwentyTen />}
    />
  );
}

export default SeventyTwentyTenPage;
