import { useState } from "react";
import { Alert, Button, FormGroupText } from "nsw-ds-react";
import { Accordion, AccordionGroup } from "../atoms/Accordion";
import "../molecules/SelectedRow.css";
import "nsw-design-system/dist/css/main.css";
import { useParams } from "react-router-dom";

function SelectedRows(props) {
  const { roleId, toRoleId } = useParams();
  const [data] = useState(props.setdata);
  const deletearray = [];
  const checked = [];
  const [open, setOpen] = useState(false);
  const [showbutton, setButton] = useState(true);
  let empty = false;

  if (data === null) {
    empty = true;
  } else if (data.length === 0) {
    empty = true;
  }

  function InPageAlert() {
    return (
      <Alert as="error" title="At least one of the fields are empty">
        <p>Please fill out all fields</p>
      </Alert>
    );
  }

  function EditableCells() {
    const [editgoal, setEditGoal] = useState("");
    const [edittype, setEditType] = useState("");
    const [editsubtype, setEditSubType] = useState("");
    const [editdesc, setEditDesc] = useState("");
    const [intextalert, setIntextAlert] = useState(false);
    var math = Math.floor(Math.random() * 1000) + 1;
    var newobject = {
      id: editgoal + math,
      attributes: {
        goalDesc: editdesc,
        goalName: editgoal,
        goalType: {
          data: {
            id: editgoal,
            attributes: {
              goalTypeName: edittype,
            },
          },
        },
        goalSubtype: {
          data: {
            id: editgoal,
            attributes: {
              goalSubtypeName: editsubtype,
            },
          },
        },
      },
    };
    const handleclick = () => {
      if (
        editdesc.trim().length === 0 ||
        edittype.trim().length === 0 ||
        editgoal.trim().length === 0 ||
        editsubtype.trim().length === 0
      ) {
        setIntextAlert(true);
      } else {
        data.push(newobject);
        setOpen(false);
        setButton(true);
        sessionStorage.setItem("SelectedGoals", JSON.stringify(data));
        setIntextAlert(false);
      }
    };

    return (
      <>
        {intextalert && <InPageAlert />}
        <FormGroupText
          helper=""
          htmlId="goal"
          label="Goal Name"
          value={editgoal}
          onChange={(val) => setEditGoal(val.target.value)}
        />

        <FormGroupText
          helper=""
          htmlId="Type"
          label="Goal Type"
          value={edittype}
          onChange={(val) => setEditType(val.target.value)}
        />

        <FormGroupText
          helper=""
          htmlId="subtype"
          label="Goal Subtype"
          value={editsubtype}
          onChange={(val) => setEditSubType(val.target.value)}
        />

        <div className="nsw-form__group">
          <label className="nsw-form__label" htmlFor="form-textarea-2">
            Description
          </label>
          <textarea
            className="nsw-form__input"
            name="textarea"
            id="form-textarea-2"
            value={editdesc}
            onChange={(val) => setEditDesc(val.target.value)}
          ></textarea>
        </div>
        <p></p>
        <div className="nsw-grid">
          <div className="nsw-col nsw-col-sm-2">
            <Button onClick={handleclick}>Add Goal</Button>
          </div>
          <div className="nsw-col nsw-col-sm-2">
            <Button
              onClick={() => {
                setOpen(false);
                setButton(true);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </>
    );
  }

  function EmptyData() {
    return (
      <td colSpan="4">
        <p style={{ textAlign: "center" }}>Please select goals from the Goal Table</p>
      </td>
    );
  }

  const handlechange = (e) => {
    if (e.target.checked) {
      checked.push(e.target);
      for (var a = 0; a < data.length; a++) {
        if (String(data[a].id) === String(e.target.value)) {
          deletearray.push(data[a]);
        }
      }
    } else {
      for (var b = 0; b < data.length; b++) {
        if (String(data[b].id) === e.target.value) {
          for (var c = 0; c < deletearray.length; c++) {
            if (deletearray[c] === data[b]) {
              deletearray.splice(c, 1);
              break;
            }
          }
        }
      }
      for (var f = 0; f < checked.length; f++) {
        if (String(checked[f].id) === String(e.target.value)) {
          checked.splice(f, 1);
        }
      }
    }
  };
  const handledelete = () => {
    for (var e = 0; e < deletearray.length; e++) {
      for (var d = 0; d < data.length; d++) {
        if (data[d] === deletearray[e]) {
          data.splice(d, 1);
        }
      }
    }
    for (var t = 0; t < checked.length; t++) {
      checked[t].disabled = "disabled";
      // this disabled all selected items
    }
    sessionStorage.clear("SelectedGoals");
    sessionStorage.setItem("SelectedGoals", JSON.stringify(data));
  };
  return (
    <>
      <div className="nsw-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th width="57%">Goal Name</th>
              <th width="20%">Type</th>
              <th width="25%">Subtype</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((goals) => (
              <tr key={String(goals.id)}>
                <td style={{ textAlign: "center" }}>
                  <form>
                    <input
                      className="nsw-form__checkbox-input"
                      type="checkbox"
                      name={String(goals.id)}
                      value={goals.id}
                      id={goals.id}
                      defaultChecked={false}
                      onChange={handlechange}
                    />
                    <label className="nsw-form__checkbox-label" htmlFor={String(goals.id)}></label>
                  </form>
                </td>
                <td colSpan="3">
                  <AccordionGroup>
                    <Accordion
                      isAccordionOpen={props.isAccordionOpen}
                      timestamp={props.timestamp}
                      header={
                        <>
                          <div contentEditable="true" className="Goal-Name">
                            {goals.attributes?.goalName}
                          </div>
                          <div contentEditable="true" className="Goal-Type">
                            {goals.attributes?.goalType.data.attributes.goalTypeName}
                          </div>
                          <div contentEditable="true" className="Goal-Subtype">
                            {goals.attributes?.goalSubtype.data.attributes.goalSubtypeName}
                          </div>
                        </>
                      }
                      body={
                        <>
                          <div>
                            <p contentEditable="true">
                              <b>Measures: </b>
                            </p>
                            <p contentEditable="true" id="goalDesc">
                              {goals.attributes?.goalDesc}
                            </p>
                          </div>
                        </>
                      }
                    />
                  </AccordionGroup>
                </td>
              </tr>
            ))}
            <tr>{empty && <EmptyData />}</tr>
          </tbody>
        </table>
      </div>
      <div className="nsw-grid">
        <div className="nsw-col nsw-col-md-6 nsw-col-lg-3">
          {showbutton && (
            <Button
              style={"dark-outline-solid"}
              onClick={() => {
                setOpen(true);
                setButton(false);
              }}
            >
              Add Custom Goal
            </Button>
          )}
        </div>
        <div className="nsw-col nsw-col-xs-2 nsw-offset-lg-7 removegoal">
          <Button style="danger" onClick={handledelete}>
            Remove Goals
          </Button>
        </div>
        <div className="nsw-col nsw-col-md-6 nsw-col-lg-3">
          <Button style="dark-outline-solid" link={`/roles/${roleId}/goals/${toRoleId}`}>
            <span className="material-icons nsw-material-icons">arrow_left</span>
            Back
          </Button>
        </div>
      </div>
      {open && <EditableCells />}
    </>
  );
}

export default SelectedRows;
