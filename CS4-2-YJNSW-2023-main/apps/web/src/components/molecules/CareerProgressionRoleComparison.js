import { Card, Section, Alert } from "nsw-ds-react";
import RoleOverviewMedia from "./RoleOverviewMedia";
import { CapabilityComparisonContext } from "../../contexts/CapabilityComparison";
import { CareerProgressionContext } from "../../contexts/CareerProgression";
import { useContext, useCallback, useState, useEffect, useRef } from "react";
import Proptypes from "prop-types";
import "./CareerProgressionRole.css";
import "./SelectedRows";
import cms from "../../api-clients/cms";
import "../molecules/SelectedRow.css";
import "nsw-design-system/dist/css/main.css";
import CapabilityAccordion from "../molecules/CapabilityAccordion";

const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;

function CareerProgressionRoleComparison({ role, currentRole }) {
  const firstUpdate = useRef(true);
  const [fromRoleInfo, setFromRoleInfo] = useState({ data: {} });
  const [toRoleInfo, setToRoleInfo] = useState({ data: {} });
  const [capabilityInfo, setCapabilityInfo] = useState({ data: [] });
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [timestamp, setTimestamp] = useState(0);
  const state = useContext(CapabilityComparisonContext)[0];
  const progressionState = useContext(CareerProgressionContext)[0];
  const capabilityTotal = state.capabilityTotal.reduce((sum, x) => sum + x, 0);
  const fetchRoleCapability = useCallback(async () => {
    let resFromRole = await cms.getRoleCapability(currentRole.id);
    let resToRole = await cms.getRoleCapability(progressionState.roleId);
    let resCapability = await cms.getCapabilities();
    if (
      (resFromRole.error && resFromRole.error.status === 404) ||
      (resToRole.error && resToRole.error.status === 404)
    ) {
      return;
    }
    setFromRoleInfo(resFromRole);
    setToRoleInfo(resToRole);
    setCapabilityInfo(resCapability);
  });

  const handlePrintButtonClick = () => {
    window.print();
  };
  const handleExpandButtonClick = () => {
    setIsAccordionOpen(true);
    setTimestamp(Date.now());
  };

  const handleCollapseButtonClick = () => {
    setIsAccordionOpen(false);
    setTimestamp(Date.now());
  };
  useEffect(() => {
    if (firstUpdate.current) {
      fetchRoleCapability();
      firstUpdate.current = false;
    } else {
      firstUpdate.current = true;
    }
  });
  console.log(toRoleInfo);

  return (
    <Section className="layout--halves" container={true} style="white">
      <div className="nsw-grid">
        <div className="nsw-col nsw-col-sm-6">
          <div className="nsw-block">
            <RoleOverviewMedia role={currentRole} strapiBaseURL={STRAPI_BASE_URL} />
          </div>

          <div className="nsw-block">
            <h3>{currentRole.attributes?.roleName}</h3>
            <p>{currentRole.attributes?.longDesc}</p>
            {currentRole.attributes?.mediaPDF.data?.attributes.mime === "application/pdf" ? (
              <a
                href={STRAPI_BASE_URL + currentRole.attributes?.mediaPDF.data?.attributes.url}
                rel="noreferrer"
                target="_blank"
                data-cy="link-role"
              >
                Learn more about this role
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="nsw-block scroll-nav">
            <div className="nsw-block">
              <h3>Development Activities</h3>
            </div>
            <div className="nsw-block"></div>
            <div>
              <div className="nsw-block">
                <Card
                  data-cy="card-WorkplaceLearning"
                  headline="Resources"
                  link={`/roles/${currentRole.id}/learning#resources`}
                >
                  Workplace Learning
                </Card>
              </div>
              <div className="nsw-block">
                <Card
                  data-cy="card-AssistedLearning"
                  headline="Capabilities"
                  link={`/roles/${currentRole.id}/learning#capabilities`}
                >
                  Assisted Learning
                </Card>
              </div>
              <div className="nsw-block">
                <Card
                  data-cy="card-FormalLearning"
                  headline="Goals"
                  link={`/roles/${currentRole.id}/learning#goals`}
                >
                  Formal Learning
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="nsw-col nsw-col-sm-6">
          <div className="nsw-block">
            <RoleOverviewMedia role={role} strapiBaseURL={STRAPI_BASE_URL} />
          </div>

          <div className="nsw-block">
            <h3>{role.attributes?.roleName}</h3>
            <p>{role.attributes?.longDesc}</p>
            {role.attributes?.mediaPDF.data?.attributes.mime === "application/pdf" ? (
              <a
                href={STRAPI_BASE_URL + role.attributes?.mediaPDF.data?.attributes.url}
                rel="noreferrer"
                target="_blank"
                data-cy="link-role"
              >
                Learn more about this role
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="nsw-block scroll-nav">
            <div className="nsw-block">
              <h3>Development Activities</h3>
            </div>
            <div className="nsw-block"></div>
            <div>
              <div className="nsw-block">
                <Card
                  data-cy="card-WorkplaceLearning"
                  headline="Resources"
                  link={`/roles/${role.id}/learning#resources`}
                >
                  Workplace Learning
                </Card>
              </div>
              <div className="nsw-block">
                <Card
                  data-cy="card-AssistedLearning"
                  headline="Capabilities"
                  link={`/roles/${role.id}/learning#capabilities`}
                >
                  Assisted Learning
                </Card>
              </div>
              <div className="nsw-block">
                <Card
                  data-cy="card-FormalLearning"
                  headline="Goals"
                  link={`/roles/${role.id}/learning#goals`}
                >
                  Formal Learning
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Capabilities Comparison</h2>
      <table>
        <thead>
          <tr>
            <th className="fromRoleCol">
              <h3>{fromRoleInfo.data.attributes?.roleName}</h3>
            </th>
            <th className="toRoleCol">
              <h3>{toRoleInfo.data.attributes?.roleName}</h3>
            </th>
            <th className="levelCol">
              <h4>Capability Development</h4>
            </th>
          </tr>
        </thead>
        <div className="capability-print-container nsw-block" id="comparison-table">
          <a className="nsw-link nsw-link--icon" onClick={handlePrintButtonClick}>
            <span className="material-icons nsw-material-icons" aria-hidden="true">
              print
            </span>
            <span>Print page</span>
          </a>
        </div>
        <br />
        <br />
        <div className="nsw-accordion__toggle nsw-block">
          <button onClick={handleCollapseButtonClick}>Collapse All</button>
          <button onClick={handleExpandButtonClick}>Expand All</button>
        </div>
        <tbody>
          <CapabilityAccordion
            fromRole={fromRoleInfo.data}
            toRole={toRoleInfo.data}
            capabilities={capabilityInfo.data}
            isAccordionOpen={isAccordionOpen}
            timestamp={timestamp}
          />
          <tr>
            <td colSpan="2" className="capability-total">
              <h3>Total</h3>
            </td>
            <td className="capability-total-level">
              <h3>+{capabilityTotal} Level</h3>
            </td>
            {capabilityTotal > 10 ? (
              <Alert as={"info"} title={"High Requirement on Capability Levels"}>
                Development required on 10+ capabilities
              </Alert>
            ) : (
              ""
            )}
          </tr>
        </tbody>
      </table>
      <h2 id="goals">Goals</h2>
      <div className="nsw-block">
        <div className="nsw-grid">
          <div className="nsw-col nsw-col-md-6 nsw-col-lg-4">
            <Card headline="Goals" link={`/roles/${currentRole.id}/goals/${role.id}`}>
              Set your development goals
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}

CareerProgressionRoleComparison.propTypes = {
  role: Proptypes.object,
  currentRole: Proptypes.object,
};

export default CareerProgressionRoleComparison;
