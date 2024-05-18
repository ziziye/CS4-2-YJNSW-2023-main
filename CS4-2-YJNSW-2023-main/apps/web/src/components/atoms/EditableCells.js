import { useState } from "react";
import { FormGroupText } from "nsw-ds-react";

function EditableCells() {
  const [editgoal, setEditGoal] = useState("");
  const [edittype, setEditType] = useState("");
  const [editsubtype, setEditSubType] = useState("");

  return (
    <>
      <td></td>
      <td>
        <FormGroupText
          helper="Add New Goal"
          htmlId="goal"
          label="Goal Information"
          value={editgoal}
          onChange={(val) => setEditGoal(val.target.value)}
        />
      </td>
      <td>
        <FormGroupText
          helper="Add Goal type"
          htmlId="Type"
          label="Goal Type"
          value={edittype}
          onChange={(val) => setEditType(val.target.value)}
        />
      </td>
      <td>
        <FormGroupText
          helper="Add Subtype"
          htmlId="subtype"
          label="Goal Subtype"
          value={editsubtype}
          onChange={(val) => setEditSubType(val.target.value)}
        />
      </td>
      <tr>
        <td></td>
        <td td colSpan="3">
          <FormGroupText helper="Add Description" htmlId="description" label="Goal Description" />
        </td>
      </tr>
    </>
  );
}
export default EditableCells;
