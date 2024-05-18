import { CareerProgressionContext } from "../../contexts/CareerProgression";
import { useContext, useState } from "react";

function CareerProgressionResults() {
  const [state, dispatch] = useContext(CareerProgressionContext);
  const [selectedRole, setselectedRole] = useState(null);

  const roles = state.results.data;

  const handleButtonClick = (roleId) => {
    setselectedRole(roleId);
    dispatch({ type: "RETURN_ROLE_ID", payload: roleId });
    dispatch({ type: "CLICK_SWITCH_BUTTON", payload: false });
  };

  const results = roles?.map((role) => {
    return (
      <li key={role.attributes.toRole.data.id}>
        <a
          style={
            selectedRole === role.attributes.toRole.data.id ? { backgroundColor: "#CBEDFD" } : {}
          }
          onClick={() => handleButtonClick(role.attributes.toRole.data.id)}
        >
          {role.attributes.toRole.data.attributes.roleName}
        </a>
      </li>
    );
  });

  return <ul>{results}</ul>;
}

export default CareerProgressionResults;
