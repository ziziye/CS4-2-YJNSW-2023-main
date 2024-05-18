import RoleOverviewContent from "../molecules/RoleOverviewContent";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import cms from "../../api-clients/cms";

function RoleOverview() {
  const firstUpdate = useRef(true);
  const { roleId } = useParams();
  const [roleInfo, setRoleInfo] = useState({ data: {} });

  const fetchRoleInfo = useCallback(async () => {
    let res = await cms.getRoleInfo(roleId);
    if (res.error && res.error.status === 404) {
      return;
    }
    setRoleInfo(res);
    // console.log("roleInfo", res);
  });

  useEffect(() => {
    if (firstUpdate.current) {
      fetchRoleInfo();
      firstUpdate.current = false;
    } else {
      firstUpdate.current = true;
    }
  });
  return (
    <>
      <h1>Role Overview</h1>
      <RoleOverviewContent role={roleInfo.data} roleId={roleId * 1} />
    </>
  );
}

export default RoleOverview;
