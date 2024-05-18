import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WelcomeOptions from "./WelcomeOptions";

describe("WelcomeOptions Component", () => {
  test("renders correctly", () => {
    render(<WelcomeOptions />);
    // Verify that the component renders without errors
    const guideCard = screen.getByText("Guide");
    const roleCard = screen.getByText("Search Role");
    const progressionCard = screen.getByText("Career Progression");

    expect(guideCard).toBeInTheDocument();
    expect(roleCard).toBeInTheDocument();
    expect(progressionCard).toBeInTheDocument();
  });

  test("displays PDF and Video buttons", () => {
    render(<WelcomeOptions />);
    // Check for the existence of the PDF and Video buttons
    const pdfButton = screen.getByText("Preview PDF");
    const videoButton = screen.getByText("Preview Video");

    expect(pdfButton).toBeInTheDocument();
    expect(videoButton).toBeInTheDocument();
  });

  test("shows PDF when clicking the PDF button", () => {
    render(<WelcomeOptions />);
    const pdfButton = screen.getByText("Preview PDF");
    fireEvent.click(pdfButton);

    // After clicking the PDF button, check that the PDF component is displayed
    const pdfComponent = screen.getByText("PDF Component"); // Adjust this selector to match your PDF component

    expect(pdfComponent).toBeInTheDocument();
  });

  test("shows Video when clicking the Video button", () => {
    render(<WelcomeOptions />);
    const videoButton = screen.getByText("Preview Video");
    fireEvent.click(videoButton);

    // After clicking the Video button, check that the Video component is displayed
    const videoComponent = screen.getByText("Video Component"); // Adjust this selector to match your Video component

    expect(videoComponent).toBeInTheDocument();
  });
});
