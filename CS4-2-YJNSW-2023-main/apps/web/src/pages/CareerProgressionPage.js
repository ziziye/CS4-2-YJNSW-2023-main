import LeftSidebarTemplate from "../components/templates/LeftSidebarTemplate";
import CareerProgression from "../components/organisms/CareerProgression";
import { CareerProgressionProvider } from "../contexts/CareerProgression";
import RoleForceGraph from "../components/organisms/RoleForceGraph";

function CareerProgressionPage() {
  sessionStorage.clear("SelectedGoals");
  return (
    <CareerProgressionProvider>
      <LeftSidebarTemplate
        topContent={<h1>Career Progression</h1>}
        sidebarContent={<CareerProgression />}
        mainContent={<RoleForceGraph />}
        styleOption={"nsw-show-lg"}
      />
    </CareerProgressionProvider>
  );
}

export default CareerProgressionPage;
