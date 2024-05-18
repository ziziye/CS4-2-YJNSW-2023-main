import { render, screen } from "@testing-library/react";
import SearchPanel from "./SearchPanel";

test("displays the search title", () => {
  render(<SearchPanel />);
  const element = screen.getByLabelText("Search");
  expect(element).toBeInTheDocument();
});
