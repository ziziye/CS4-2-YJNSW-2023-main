import "nsw-design-system/dist/css/main.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import CareerProgressionPage from "./pages/CareerProgressionPage";
import RoleOverviewPage from "./pages/RoleOverviewPage";
import GoalsPage from "./pages/GoalsPage";
import ViewSelectedGoalsPage from "./pages/ViewSelectedGoalsPage";
import SeventyTwentyTenPage from "./pages/SeventyTwentyTenPage";
import CapabilityComparisonPage from "./pages/CapabilityComparisonPage";
import NotFoundPage from "./pages/NotFoundPage";
import Welcome from "./pages/Welcome";
// import Logout from "./pages/Logout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="roles/:roleId/progression" element={<CareerProgressionPage />} />
      <Route path="roles/:roleId/overview" element={<RoleOverviewPage />} />
      <Route path="roles/:roleId/goals/:toRoleId" element={<GoalsPage />} />
      <Route path="roles/:roleId/goals/selected/:toRoleId" element={<ViewSelectedGoalsPage />} />
      <Route path="roles/:roleId/learning" element={<SeventyTwentyTenPage />} />
      <Route path="/roles/:roleId/comparison/:toRoleId" element={<CapabilityComparisonPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
