import CareerProgressionDiscover from "../molecules/CareerProgressionDiscover";
// import CareerProgressionRole from "../molecules/CareerProgressionRole";
import { CareerProgressionContext } from "../../contexts/CareerProgression";
import { useCallback, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import cms from "../../api-clients/cms";

function CareerProgression() {
  const [state, dispatch] = useContext(CareerProgressionContext);
  const switchedRoleId = state.roleId;
  const { roleId } = useParams();
  // const [roleInfo, setRoleInfo] = useState({ data: {} });
  const [resultCount, setResultCount] = useState(0);

  const fetchRoleInfo = useCallback(async () => {
    let res = await cms.getRoleInfo(switchedRoleId);
    if (res.error && res.error.status === 404) {
      return;
    }
    // setRoleInfo(res);
  });

  const performSearch = useCallback(async () => {
    let res = await cms.getRolesProgression(
      {
        searchTerm: state.searchTerm,
        streamFilters: state.selectedStreamFilters,
        identifiedFilter: state.selectedIdentifiedFilter,
      },
      roleId
    );
    dispatch({ type: "RETURN_SEARCH_RESULTS", payload: res });
    setResultCount(res.data.length);
  }, [state.lastSearchTimestamp]);

  useEffect(() => {
    if (switchedRoleId) {
      fetchRoleInfo();
    }
    performSearch();
  }, [switchedRoleId, performSearch]);

  return <>{<CareerProgressionDiscover resultsCount={resultCount} />}</>;
}
export default CareerProgression;
