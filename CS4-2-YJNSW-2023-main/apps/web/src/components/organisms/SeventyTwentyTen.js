import LearningResults from "../molecules/LearningResults";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import cms from "../../api-clients/cms";

function SeventyTwentyTen() {
  const firstUpdate = useRef(true);
  const { roleId } = useParams();
  const [roleActivities, setRoleActivities] = useState({ data: {} });

  const fetchRoleActivities = useCallback(async () => {
    let res = await cms.getAllRoleDetails(roleId);
    if (res.error && res.error.status === 404) {
      return;
    }
    setRoleActivities(res);
  });

  useEffect(() => {
    if (firstUpdate.current) {
      fetchRoleActivities();
      firstUpdate.current = false;
    } else {
      firstUpdate.current = true;
    }
  }, []);
  return (
    <>
      <LearningResults roleActivities={roleActivities.data} type="resources" />
      <LearningResults roleActivities={roleActivities.data} type="capabilities" />
      <LearningResults roleActivities={roleActivities.data} type="goals" />
    </>
  );
}

export default SeventyTwentyTen;
