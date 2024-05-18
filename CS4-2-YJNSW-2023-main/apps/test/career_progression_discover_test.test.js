import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CareerProgressionDiscover from "./CareerProgressionDiscover";

const [state, dispatch] = useReducer(reducer, initialState);

describe("CareerProgressionDiscover Component", () => {
  test("renders the component correctly", () => {
    render(
      <CareerProgressionDiscover resultsCount={10} />,
      { wrapper: ({ children }) => (
        <CareerProgressionContext.Provider value={[state, dispatch]}>
          {children}
        </CareerProgressionContext.Provider>
      )}
    );

    // Check if the component renders without errors
    const discoverHeader = screen.getByText("Discover Roles");
    expect(discoverHeader).toBeInTheDocument();

    const searchInput = screen.getByTestId("CareerProgression-searchinput");
    expect(searchInput).toBeInTheDocument();

    const submitButton = screen.getByTestId("CareerProgression-submit");
    expect(submitButton).toBeInTheDocument();

    const streamFilters = screen.getByTestId("StreamFilters"); // Make sure StreamFilters and IdentifiedFilter components have test IDs
    expect(streamFilters).toBeInTheDocument();

    const identifiedFilter = screen.getByTestId("IdentifiedFilter");
    expect(identifiedFilter).toBeInTheDocument();
  });

  test("handles search input change and submit", () => {
    render(
      <CareerProgressionDiscover resultsCount={10} />,
      { wrapper: ({ children }) => (
        <CareerProgressionContext.Provider value={[state, dispatch]}>
          {children}
        </CareerProgressionContext.Provider>
      )}
    );

    // Check if search input change and submit are handled correctly
    const searchInput = screen.getByTestId("CareerProgression-searchinput");
    const submitButton = screen.getByTestId("CareerProgression-submit");

    fireEvent.change(searchInput, { target: { value: "Search Term" } });
    fireEvent.click(submitButton);

  });
});
