/* eslint-disable react/no-unknown-property */
import SelectedRows from "../molecules/SelectedRows";
import "nsw-design-system/dist/css/main.css";
import "../organisms/Goals.css";
import { useState } from "react";

function ViewSelectedGoals() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [timestamp, setTimestamp] = useState(0);
  var data = JSON.parse(sessionStorage.getItem("SelectedGoals"));

  // This is so that goals can be added when there is no goals selected
  if (data === null) {
    sessionStorage.setItem("SelectedGoals", JSON.stringify([]));
    data = JSON.parse(sessionStorage.getItem("SelectedGoals"));
  }
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
      <h1>Review Goals</h1>
      <div className="capability-print-container nsw-block" id="comparison-table">
        <a className="nsw-link nsw-link--icon" onClick={handlePrintButtonClick}>
          <span className="material-icons nsw-material-icons" focusable="false" aria-hidden="true">
            print
          </span>
          <span>Print PDF page</span>
        </a>
      </div>
      <div className="nsw-accordion__toggle nsw-block">
        <button onClick={handleCollapseButtonClick}>Collapse All</button>
        <button onClick={handleExpandButtonClick}>Expand All</button>
      </div>
      <SelectedRows setdata={data} isAccordionOpen={isAccordionOpen} timestamp={timestamp} />
    </>
  );
}
export default ViewSelectedGoals;
