import Proptypes from "prop-types";
import { useEffect, useRef } from "react";
import "./LearningResults.css";

function RoleLearningResults({ roleActivities, type }) {
  const dataPopulated = useRef(false);

  const updateValue = (val) => {
    dataPopulated.current = val;
  };
  const results = roleActivities.attributes?.activities.data.map((roleInfo) => {
    return (
      <div className="nsw-block" key={roleInfo.id}>
        {roleInfo.attributes.activityType.data?.attributes.activityTypeName ===
        typeConfig[type].activityType ? (
          <h6>{roleInfo.attributes.activityDisplayName}</h6>
        ) : (
          ""
        )}
        {roleInfo.attributes.activityType.data?.attributes.activityTypeName ===
        typeConfig[type].activityType ? (
          // eslint-disable-next-line react/no-unknown-property
          <p onLoad={updateValue(true)}>{roleInfo.attributes.activityDesc}</p>
        ) : (
          ""
        )}
      </div>
    );
  });

  useEffect(() => {
    if (dataPopulated.current) {
      // handleInPageRedirect();
      updateValue(false);
    }
  }, [dataPopulated.current]);
  return (
    <>
      <h2 id={type}>{typeConfig[type].subHeading}</h2>
      {results}
    </>
  );
}

const typeConfig = {
  resources: {
    activityType: "workplace_70",
    // subHeading: "Resources: Workplace Learning",
    subHeading: "Resources",
  },
  capabilities: {
    activityType: "assisted_20",
    // subHeading: "Capabilities: Assisted Learning",
    subHeading: "Capabilities",
  },
  goals: {
    activityType: "formal_10",
    subHeading: "Goals: Formal Learning",
  },
};

RoleLearningResults.propTypes = {
  roleActivities: Proptypes.object,
  type: Proptypes.string,
};

// const handleInPageRedirect = () => {
//   const url = window.location.href;
//   window.location.href = url;
// };

export default RoleLearningResults;
