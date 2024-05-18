import Proptypes from "prop-types";
import { AccordionGroup, Accordion } from "../atoms/Accordion";
import "nsw-design-system/dist/css/main.css";
import "./CapabilityAccordion.css";
import React, { useContext, useEffect } from "react";
import { CapabilityComparisonContext } from "../../contexts/CapabilityComparison";

function mapCapabilityNameDesc(roleCapabilities) {
  const role = [];
  roleCapabilities?.map((capability) => {
    const nested = {};
    nested.capabilityName = capability.attributes?.capabilityName;
    nested.capabilityDesc = capability.attributes?.capabilityDesc;
    role.push(nested);
  });
  return role;
}

function capabilityWithoutLevel(roleMap) {
  const roleWithoutLevel = [];
  for (let i = 0; i < roleMap.length; i++) {
    let capability = roleMap[i].capabilityName;
    let capabilityName = capability.split("-")[0].trim();
    roleWithoutLevel.push(capabilityName);
  }
  return roleWithoutLevel;
}

function applyNotApplicableCapability(
  fromRoleMap,
  toRoleMap,
  fromRoleWithoutLevel,
  toRoleWithoutLevel
) {
  for (let i = 0; i < toRoleWithoutLevel.length; i++) {
    if (!fromRoleWithoutLevel.includes(toRoleWithoutLevel[i])) {
      let capabilityName = toRoleWithoutLevel[i];
      let capabilityLevel = "Not Applicable";
      let capability = {};
      capability.capabilityName = capabilityName.concat(" - ", capabilityLevel);
      capability.capabilityDesc = "Not Applicable";
      fromRoleMap.push(capability);
    }
  }

  for (let i = 0; i < fromRoleWithoutLevel.length; i++) {
    if (!toRoleWithoutLevel.includes(fromRoleWithoutLevel[i])) {
      let capabilityName = fromRoleWithoutLevel[i];
      let capabilityLevel = "Not Applicable";
      let capability = {};
      capability.capabilityName = capabilityName.concat(" - ", capabilityLevel);
      capability.capabilityDesc = "Not Applicable";
      toRoleMap.push(capability);
    }
  }
}

function currentCapabilityLevel(roleSorted) {
  const roleLevel = [];
  for (let i = 0; i < roleSorted.length; i++) {
    let capability = roleSorted[i].capabilityName;
    let capabilityLevel = capability.split("-")[1].trim();
    roleLevel.push(capabilityLevel);
  }
  return roleLevel;
}

function sortCapability(roleMap) {
  roleMap.sort((a, b) => a.capabilityName.localeCompare(b.capabilityName));
  return roleMap;
}

function CapabilityAccordion({ fromRole, toRole, capabilities, isAccordionOpen, timestamp }) {
  const dispatch = useContext(CapabilityComparisonContext)[1];
  const fromRoleCapabilities = fromRole?.attributes?.capabilities?.data;
  const toRoleCapabilities = toRole.attributes?.capabilities?.data;

  const fromRoleMap = mapCapabilityNameDesc(fromRoleCapabilities);
  const toRoleMap = mapCapabilityNameDesc(toRoleCapabilities);

  const fromRoleWithoutLevel = capabilityWithoutLevel(fromRoleMap);
  const toRoleWithoutLevel = capabilityWithoutLevel(toRoleMap);

  applyNotApplicableCapability(fromRoleMap, toRoleMap, fromRoleWithoutLevel, toRoleWithoutLevel);

  const fromRoleSorted = sortCapability(fromRoleMap);
  const toRoleSorted = sortCapability(toRoleMap);

  const fromRoleLevel = currentCapabilityLevel(fromRoleSorted);
  const toRoleLevel = currentCapabilityLevel(toRoleSorted);

  const fromCapabilityName = [];
  const fromCapabilityDesc = [];
  const toCapabilityName = [];
  const toCapabilityDesc = [];

  for (let i = 0; i < fromRoleSorted.length; i++) {
    fromCapabilityName.push(fromRoleSorted[i].capabilityName);
    fromCapabilityDesc.push(fromRoleSorted[i].capabilityDesc);
  }

  for (let i = 0; i < toRoleSorted.length; i++) {
    toCapabilityName.push(toRoleSorted[i].capabilityName);
    toCapabilityDesc.push(toRoleSorted[i].capabilityDesc);
  }

  function getLowerLevels(roleLevel, capabilityName) {
    let capabilityLevels = ["Foundational", "Intermediate", "Adept", "Advanced", "Highly Advanced"];
    if (roleLevel.length > 0 && !roleLevel.includes("Not Applicable")) {
      capabilityLevels.length = capabilityLevels.indexOf(roleLevel);

      const capabilityDescArr = [...capabilityLevels];
      for (let k = 0; k < capabilityLevels.length; k++) {
        for (let i = 0; i < capabilities.length; i++) {
          if (
            capabilities[i].attributes.capabilityName.split("-")[0].trim() ===
              capabilityName.split("-")[0].trim() &&
            capabilities[i].attributes.capabilityName.split("-")[1].trim() === capabilityLevels[k]
          ) {
            capabilityDescArr[capabilityDescArr.indexOf(capabilityLevels[k])] =
              capabilities[i].attributes.capabilityDesc;
          }
        }
      }

      const lowerCapabilityLevels = capabilityLevels.map((level, index) => {
        return (
          <React.Fragment key={level}>
            <h5>{level}</h5>
            <p>{capabilityDescArr[index]}</p>
          </React.Fragment>
        );
      });
      return [lowerCapabilityLevels, capabilityLevels.length + 1];
    }
  }

  const total = [];
  let accordion = [];
  for (let i = 0; i < fromCapabilityName.length; i++) {
    let fromRoleDesc = getLowerLevels(fromRoleLevel[i], fromCapabilityName[i])
      ? getLowerLevels(fromRoleLevel[i], fromCapabilityName[i])[0]
      : "";
    let toRoleDesc = getLowerLevels(toRoleLevel[i], toCapabilityName[i])
      ? getLowerLevels(toRoleLevel[i], toCapabilityName[i])[0]
      : "";
    let fromRoleLen = getLowerLevels(fromRoleLevel[i], fromCapabilityName[i])
      ? getLowerLevels(fromRoleLevel[i], fromCapabilityName[i])[1]
      : 0;
    let toRoleLen = getLowerLevels(toRoleLevel[i], toCapabilityName[i])
      ? getLowerLevels(toRoleLevel[i], toCapabilityName[i])[1]
      : 0;
    accordion.push(
      <>
        <tr>
          <td colSpan="2" className="capability-level">
            <AccordionGroup>
              <Accordion
                isAccordionOpen={isAccordionOpen}
                timestamp={timestamp}
                header={
                  <>
                    <div className="capability-level-title-left">{fromCapabilityName[i]}</div>
                    <div className="capability-level-title-right">{toCapabilityName[i]}</div>
                  </>
                }
                body={
                  <>
                    <div className="capability-level-body-left">
                      {fromRoleDesc}
                      <h5>{fromRoleLevel[i]}</h5>
                      <p>{fromCapabilityDesc[i]}</p>
                    </div>
                    <div className="capability-level-body-right">
                      {toRoleDesc}
                      <h5>{toRoleLevel[i]}</h5>
                      <p>{toCapabilityDesc[i]}</p>
                    </div>
                  </>
                }
              />
            </AccordionGroup>
          </td>
          <td
            className={`capability-development
            ${toRoleLen - fromRoleLen <= 0 ? "adequate" : ""}`}
          >
            <h4>
              {toRoleLen - fromRoleLen <= 0
                ? "Adequate"
                : "+" + (toRoleLen - fromRoleLen) + " level"}
            </h4>
          </td>
        </tr>
      </>
    );
    total.push(toRoleLen - fromRoleLen < 0 ? 0 : toRoleLen - fromRoleLen);
  }
  useEffect(() => {
    dispatch({ type: "RETURN_CAPABILITY_TOTAL", payload: total });
  }, [total.toString()]);
  return accordion;
}

CapabilityAccordion.propTypes = {
  fromRole: Proptypes.object,
  toRole: Proptypes.object,
  capabilities: Proptypes.array,
  isAccordionOpen: Proptypes.bool,
  timestamp: Proptypes.number,
};

export default CapabilityAccordion;
