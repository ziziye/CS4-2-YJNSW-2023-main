import React from "react";
import { render, screen, act } from "@testing-library/react";
import CareerProgression from "./CareerProgression"; // Import your component
import { CareerProgressionContext } from "../../contexts/CareerProgression";
import { MemoryRouter, Route } from "react-router-dom";
import cms from "../../api-clients/cms";

jest.mock("../../api-clients/cms");
const [state, dispatch] = useReducer(reducer, initialState);


describe("CareerProgression Component", () => {
  it("renders the CareerProgressionDiscover component", async () => {
    const fakeData = { data: [] };
    cms.getRolesProgression.mockResolvedValue(fakeData);
    cms.getRoleInfo.mockResolvedValue(fakeData);

    render(
      <MemoryRouter initialEntries={["/roles/123"]}>
        <Route path="/roles/:roleId">
          <CareerProgressionContext.Provider value={[state, dispatch]}>
            <CareerProgression />
          </CareerProgressionContext.Provider>
        </Route>
      </MemoryRouter>
    );

    // Wait for the component to finish rendering
    await act(async () => {
      screen.getByTestId("career-progression-discover"); // Make sure your CareerProgressionDiscover component has a test ID
    });
  });

  it("fetches role information and search results", async () => {
    const fakeRoleInfo = { data: { attributes: { roleName: "Test Role" } }};
    const fakeSearchResults = { data: { attributes: { roleName: "Test Role" } }};

    cms.getRoleInfo.mockResolvedValue(fakeRoleInfo);
    cms.getRolesProgression.mockResolvedValue(fakeSearchResults);

    render(
      <MemoryRouter initialEntries={["/roles/123"]}>
        <Route path="/roles/:roleId">
          <CareerProgressionContext.Provider value={[state, dispatch]}>
            <CareerProgression />
          </CareerProgressionContext.Provider>
        </Route>
      </MemoryRouter>
    );

    // Wait for the component to finish rendering
    await act(async () => {
      screen.getByTestId("career-progression-discover"); // Make sure your CareerProgressionDiscover component has a test ID
    });

    // Check that role information and search results were fetched
    expect(cms.getRoleInfo).toHaveBeenCalledWith("123");
    expect(cms.getRolesProgression).toHaveBeenCalledWith(/* your expected parameters */);
  });
});
