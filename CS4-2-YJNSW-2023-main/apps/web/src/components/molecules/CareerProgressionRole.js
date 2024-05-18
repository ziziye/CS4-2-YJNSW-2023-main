import { Card } from "nsw-ds-react";
import { CareerProgressionContext } from "../../contexts/CareerProgression";
import { useContext } from "react";
import Proptypes from "prop-types";
import "./CareerProgressionRole.css";

function CareerProgressionRole({ role, currentRole }) {
  const dispatch = useContext(CareerProgressionContext)[1];

  const handleButtonClick = () => {
    dispatch({ type: "CLICK_SWITCH_BUTTON", payload: true });
    dispatch({ type: "RETURN_ROLE_ID", payload: null });
  };
  return (
    <nav className="nsw-side-nav" aria-labelledby="sksm726ns">
      <div className="nsw-side-nav__header" id="sksm726ns">
        <a className="nsw-p-right-sm">
          <h4 onClick={handleButtonClick}>
            <span
              className="material-icons nsw-material-icons--20"
              // focusable="false"
              aria-hidden="true"
            >
              west
            </span>
            <span>
              <span>
                All Roles<span className="sr-only">a page</span>
              </span>
            </span>
          </h4>
        </a>
      </div>
      <div className="nsw-block">
        <div>
          <div>
            <h3>{role.attributes?.roleName}</h3>
            <p>{role.attributes?.shortDesc}</p>
          </div>
        </div>
        <div className="nsw-block"></div>
        <div className="nsw-side-nav__header" id="sksm726ns"></div>
        <div className="nsw-block scroll-nav">
          <div className="nsw-block">
            <Card
              headline="Capability Comparison"
              link={`/roles/${currentRole}/comparison/${role.id}`}
            >
              Compare role progression
            </Card>
          </div>
          <h3>More Information</h3>
          <div className="nsw-block">
            <Card headline="Role Description" link={`/roles/${role.id}/overview`}>
              Role Overview
            </Card>
          </div>
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
    </nav>
  );
}

CareerProgressionRole.propTypes = {
  role: Proptypes.object,
  currentRole: Proptypes.string,
};

export default CareerProgressionRole;
