/* eslint-disable no-unused-vars */
// import RoleForceGraphData from "../molecules/RoleForceGraphData";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState, useContext } from "react";
import cms from "../../api-clients/cms";
import { CareerProgressionContext } from "../../contexts/CareerProgression";
import CareerProgressionRoleComparison from "../molecules/CareerProgressionRoleComparison";
import OrgChart from "../molecules/OrgChart";
import { CapabilityComparisonProvider } from "../../contexts/CapabilityComparison";

function RoleForceGraph() {
  const { roleId } = useParams();
  const [roleProgression, setRoleProgression] = useState({ data: [] });
  const [roleInfo, setRoleInfo] = useState({ data: {} });
  const [compareRoleInfo, setCompareRoleInfo] = useState({ data: {} });
  const state = useContext(CareerProgressionContext)[0];

  const fetchRoleInfo = useCallback(async () => {
    let res = await cms.getRoleInfo(roleId);
    if (res.error && res.error.status === 404) {
      return;
    }
    setRoleInfo(res);
    if (state.results.data) {
      setRoleProgression(state.results);
    }
    if (state.roleId) {
      let res = await cms.getRoleInfo(state.roleId);
      if (res.error && res.error.status === 404) {
        return;
      }
      setCompareRoleInfo(res);
    }
  });

  useEffect(() => {
    fetchRoleInfo();
  }, [state.results.data]);
  return state.discoverRole ? (
    <OrgChart currentRole={roleInfo.data} progressRole={roleProgression.data} />
  ) : (
    <CapabilityComparisonProvider>
      <CareerProgressionRoleComparison role={compareRoleInfo.data} currentRole={roleInfo.data} />
    </CapabilityComparisonProvider>
  );
}

export default RoleForceGraph;
