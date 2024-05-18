import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ViewSelectedGoals from "./ViewSelectedGoals";

// Mock sessionStorage
beforeEach(() => {
  const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  global.sessionStorage = sessionStorageMock;
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders the component correctly", () => {
  render(<ViewSelectedGoals />);

  // Check if the component renders without errors
  const pageTitle = screen.getByText("Review Goals");
  expect(pageTitle).toBeInTheDocument();

  const printPdfButton = screen.getByText("Print PDF page");
  expect(printPdfButton).toBeInTheDocument();

  const printWordButton = screen.getByText("Print Word Format");
  expect(printWordButton).toBeInTheDocument();
});

test("handles print PDF button click", () => {
  render(<ViewSelectedGoals />);
  const printPdfButton = screen.getByText("Print PDF page");

  fireEvent.click(printPdfButton);

});

test("handles print Word Format button click", () => {
  render(<ViewSelectedGoals />);
  const printWordButton = screen.getByText("Print Word Format");

  fireEvent.click(printWordButton);

});
