/* eslint-disable react/no-unknown-property */
import { Card, Alert } from "nsw-ds-react";
import "./CapabilityComparison.css";
import "nsw-design-system/dist/css/main.css";
import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import cms from "../../api-clients/cms";
import CapabilityAccordion from "../molecules/CapabilityAccordion";
import { CapabilityComparisonContext } from "../../contexts/CapabilityComparison";

function CapabilityComparison() {
  const firstUpdate = useRef(true);
  const { roleId, toRoleId } = useParams();
  const [fromRoleInfo, setFromRoleInfo] = useState({ data: {} });
  const [toRoleInfo, setToRoleInfo] = useState({ data: {} });
  const [capabilityInfo, setCapabilityInfo] = useState({ data: [] });
  const state = useContext(CapabilityComparisonContext)[0];
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [timestamp, setTimestamp] = useState(0);
  const capabilityTotal = state.capabilityTotal.reduce((sum, x) => sum + x, 0);

  const fetchRoleCapability = useCallback(async () => {
    let resFromRole = await cms.getRoleCapability(roleId);
    let resToRole = await cms.getRoleCapability(toRoleId);
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

  useEffect(() => {
    if (firstUpdate.current) {
      fetchRoleCapability();
      firstUpdate.current = false;
    } else {
      firstUpdate.current = true;
    }
  }, []);

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

  return (
    <>
      <h1>Capability Comparison</h1>
      <nav className="nsw-in-page-nav" aria-labelledby="in-page-nav">
        <div id="in-page-nav" className="nsw-in-page-nav__title">
          On this page
        </div>
        <ul>
          <li>
            <a href="#comparison-table">Capability Comparison Table</a>
          </li>
          <li>
            <a href="#goals">Goals</a>
          </li>
        </ul>
      </nav>

      <div className="capability-print-container nsw-block" id="comparison-table">
        <a className="nsw-link nsw-link--icon" onClick={handlePrintButtonClick}>
          <span className="material-icons nsw-material-icons" focusable="false" aria-hidden="true">
            print
          </span>
          <span>Print page</span>
        </a>
      </div>
      <div className="nsw-accordion__toggle nsw-block">
        <button onClick={handleCollapseButtonClick}>Collapse All</button>
        <button onClick={handleExpandButtonClick}>Expand All</button>
      </div>
      <div className="nsw-table" tabIndex="0">
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
            </tr>
          </tbody>
        </table>
        {capabilityTotal > 10 ? (
          <Alert as={"info"} title={"High Requirement on Capability Levels"}>
            Development required on 10+ capabilities
          </Alert>
        ) : (
          ""
        )}
      </div>
      <h2 id="goals">Goals</h2>
      <div className="nsw-block">
        <div className="nsw-grid">
          <div className="nsw-col nsw-col-md-6 nsw-col-lg-4">
            <Card headline="Goals" link={`/roles/${roleId}/goals/${toRoleId}`}>
              Set your development goals
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default CapabilityComparison;
