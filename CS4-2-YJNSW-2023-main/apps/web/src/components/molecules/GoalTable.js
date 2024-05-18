import { Button } from "nsw-ds-react";
import { AccordionGroup, Accordion } from "../atoms/Accordion";
import { useState, useRef, useEffect } from "react";

import "nsw-design-system/dist/css/main.css";
import "../molecules/GoalTable.css";
import { useParams } from "react-router-dom";

function GoalTable(props) {
  const [data, setdata] = useState(props.setdata);
  const prevDataRef = useRef(props.setdata);
  const { roleId, toRoleId } = useParams();

  useEffect(() => {
    prevDataRef.current = props.setdata;
  }, []);

  if (props.setdata !== prevDataRef.current && data !== props.setdata) {
    setdata(props.setdata);
  }

  const array = [];
  const checked = [];
  var checkarray = JSON.parse(sessionStorage.getItem("SelectedGoals")); // gets the session data
  // Gets session storage data so it knows what has already been added
  if (checkarray === null) {
    //nothing
  } else {
    //get the history of what they have selected and adds it back to the array
    for (var d = 0; checkarray.length > d; d++) {
      array.push(checkarray[d]);
    }
    // deletes the goals from the data array, this is so we dont get duplications
    try {
      var datalength = data.length;
      for (var b = 0; array.length > b; b++) {
        for (var del = 0; datalength > del; del++) {
          if (data[del].id === array[b].id) {
            data.splice(del, 1);
            break;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  const handlechange = (e) => {
    if (e.target.checked) {
      checked.push(e.target); // adds the checkbox to an array so it can be disabledc
      for (var i = 0; i < data.length; i++) {
        if (String(data[i].id) === e.target.value) {
          // finds in the target value is in the data array
          array.push(data[i]);
          break;
        }
      }
    } else {
      for (var x = 0; x < data.length; x++) {
        // goes through the data array and removes the unchecked item
        if (String(data[x].id) === e.target.value) {
          for (var a = 0; a < array.length; a++) {
            if (array[a] === data[x]) {
              array.splice(a, 1);
              break;
            }
          }
        }
      }
      // goes through and removes the checked item from array, this is to stop
      // disabling non checked items
      for (var c = 0; c < checked.length; c++) {
        if (String(checked[c].id) === String(e.target.value)) {
          checked.splice(c, 1);
        }
      }
    }
  };

  const addSelectedGoals = () => {
    sessionStorage.clear("SelectedGoals");
    sessionStorage.setItem("SelectedGoals", JSON.stringify(array));
    for (var t = 0; t < checked.length; t++) {
      checked[t].disabled = "disabled";
      // this disabled all selected items
    }
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
            {/* the data || [] checks if its an array*/}
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
                          <div className="Goal-Name">{goals.attributes?.goalName}</div>
                          <div className="Goal-Type">
                            {goals.attributes?.goalType.data.attributes.goalTypeName}
                          </div>
                          <div className="Goal-Subtype">
                            {goals.attributes?.goalSubtype.data.attributes.goalSubtypeName}
                          </div>
                        </>
                      }
                      body={
                        <>
                          <div>
                            <p>
                              <b>Measures: </b>
                            </p>
                            <p className="goalDesc">{goals.attributes?.goalDesc}</p>
                          </div>
                        </>
                      }
                    />
                  </AccordionGroup>
                </td>
              </tr>
            ))}
            {(array || []).map((goals) => (
              <tr key={String(goals.id)}>
                <td style={{ textAlign: "center" }}>
                  <form>
                    <input
                      className="nsw-form__checkbox-input"
                      type="checkbox"
                      name={String(goals.id)}
                      value={goals.id}
                      id={goals.id}
                      defaultChecked={true}
                      disabled={true}
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
                          <div className="Goal-Name">{goals.attributes?.goalName}</div>
                          <div className="Goal-Type">
                            {goals.attributes?.goalType.data.attributes.goalTypeName}
                          </div>
                          <div className="Goal-Subtype">
                            {goals.attributes?.goalSubtype.data.attributes.goalSubtypeName}
                          </div>
                        </>
                      }
                      body={
                        <>
                          <div>
                            <p>
                              <b>Measures: </b>
                            </p>
                            <p className="goalDesc">{goals.attributes?.goalDesc}</p>
                          </div>
                        </>
                      }
                    />
                  </AccordionGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="nsw-grid">
        <div className="nsw-col nsw-col-md-6 nsw-col-lg-3">
          <Button style="dark-outline-solid" onClick={addSelectedGoals}>
            Add Selected Goals
          </Button>
        </div>
        <div className="nsw-col nsw-col-xs-3 nsw-offset-xs-6 goalview">
          <Button style="dark-outline-solid" link={`/roles/${roleId}/goals/selected/${toRoleId}`}>
            View Selected Goals
          </Button>
        </div>
      </div>
    </>
  );
}

export default GoalTable;
