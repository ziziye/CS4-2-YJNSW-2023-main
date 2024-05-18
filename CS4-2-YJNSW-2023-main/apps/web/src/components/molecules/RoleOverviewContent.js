import Proptypes from "prop-types";
import { Card, Section } from "nsw-ds-react";
import RoleOverviewMedia from "./RoleOverviewMedia";
import "./RoleOverviewContent.css";
import cms from "../../api-clients/cms";
import { useState, useEffect, useRef, useCallback } from "react";
import RoleLearningResults from "./RoleLearningResults";
import RoleResources from "./RoleResources";

const STRAPI_BASE_URL = process.env.REACT_APP_STRAPI_BASE_URL;

function RoleOverviewContent({ role, roleId }) {
  // console.log(role);
  const firstUpdate = useRef(true);
  const [roleActivities, setRoleActivities] = useState({ data: {} });

  const fetchRoleActivities = useCallback(async () => {
    let res = await cms.getAllRoleDetails(roleId);
    if (res.error && res.error.status === 404) {
      return;
    }
    setRoleActivities(res);
    // console.log(res);
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
      <Section className="layout--halves" container={true} style="white">
        <div className="nsw-grid">
          <div className="nsw-col nsw-col-sm-6">
            <div className="nsw-block">
              <RoleOverviewMedia role={role} strapiBaseURL={STRAPI_BASE_URL} />
            </div>
          </div>
          <div className="nsw-col nsw-col-sm-6">
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
          </div>
        </div>
      </Section>
      <Section className="layout--halves" container={true} style="white">
        <h2>Development Activities</h2>
        <div className="nsw-block">
          <div className="nsw-grid">
            <div className="nsw-col nsw-col-md-6 nsw-col-lg-4">
              <Card headline="Capabilities" link={`#rolecapability`} data-cy="Card-learning20">
                Assisted Learning
              </Card>
            </div>
            <div className="nsw-col nsw-col-md-6 nsw-col-lg-4">
              <Card
                headline="Resources"
                // link={`/roles/${role.id}/learning#resources`}
                link={`#roleresource`}
                data-cy="Card-learning70"
              >
                Workplace Learning
              </Card>
            </div>
            <div className="nsw-col nsw-col-md-6 nsw-col-lg-4">
              <Card
                headline="Goals"
                link={`/roles/${role.id}/learning#goals`}
                data-cy="Card-learning10"
              >
                Formal Learning
              </Card>
            </div>
          </div>
        </div>
      </Section>
      <Section className="layout--halves" container={true} style="white">
        <h2>Career Progression</h2>
        <div className="nsw-block">
          <div className="nsw-grid">
            <div className="nsw-col nsw-col-md-6 nsw-col-lg-4">
              <Card
                headline="Progression"
                link={`/roles/${role.id}/progression`}
                data-cy="Card-Progression"
              >
                Progress to another role
              </Card>
            </div>
          </div>
        </div>
      </Section>
      <Section className="layout--halves" container={true} style="white" id="rolecapability">
        <RoleLearningResults roleActivities={roleActivities.data} type="capabilities" />
      </Section>
      <Section className="layout--halves" container={true} style="white" id="roleresource">
        <RoleResources roleActivities={roleActivities} strapiBaseURL={STRAPI_BASE_URL} />
      </Section>
    </>
  );
}

RoleOverviewContent.propTypes = {
  role: Proptypes.object,
  roleId: Proptypes.number,
};

export default RoleOverviewContent;
