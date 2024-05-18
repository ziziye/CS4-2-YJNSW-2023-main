import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GoalTable from "./GoalTable";

describe("GoalTable Component", () => {
  const props = {
    setdata: [], // An array of data for testing
    isAccordionOpen: true,
    timestamp: Date.now(),
  };

  test("renders table headers", () => {
    render(<GoalTable {...props} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(4);
    expect(headers[1]).toHaveTextContent("Goal Name");
    expect(headers[2]).toHaveTextContent("Type");
    expect(headers[3]).toHaveTextContent("Subtype");
  });

  test("renders checkboxes and handles selection", () => {
    render(<GoalTable {...props} />);
    const checkboxes = screen.getAllByRole("checkbox");
    
    expect(checkboxes).toHaveLength(props.setdata.length * 2); // *2 because of the array mapping

    // Simulate selecting and deselecting a checkbox
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

  });


  test("disables checkboxes when selected", () => {
    render(<GoalTable {...props} />);
    const checkboxes = screen.getAllByRole("checkbox");
    
    // Simulate selecting a checkbox
    fireEvent.click(checkboxes[0]);

    // Verify that the checkbox is disabled
    const disabledCheckbox = screen.getByRole("checkbox", { disabled: true });
    expect(disabledCheckbox).toBeInTheDocument();
  });

  test("displays selected goals in the table", () => {
    const selectedGoals = [{ id: "1", /* other properties */ }];
    const updatedProps = {
      ...props,
      setdata: selectedGoals,
    };

    render(<GoalTable {...updatedProps} />);
    const checkboxes = screen.getAllByRole("checkbox");

    // Verify that the checkboxes for selected goals are disabled
    for (const selectedGoal of selectedGoals) {
      const selectedCheckbox = checkboxes.find((checkbox) => checkbox.value === selectedGoal.id);
      expect(selectedCheckbox).toHaveAttribute("disabled");
    }
  });
});
