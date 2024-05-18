import React from "react";
import { render, screen } from "@testing-library/react";
import RoleOverviewContent from "./RoleOverviewContent";

describe("RoleOverviewContent Component", () => {
  const role = {
    attributes: {
      roleName: "Test Role",
      longDesc: "Test Role Description",
      mediaPDF: {
        data: {
          attributes: {
            mime: "application/pdf",
            url: "/test.pdf",
          },
        },
      },
    },
  };
  const roleId = 1;

  test("renders role name and description", () => {
    render(<RoleOverviewContent role={role} roleId={roleId} />);
    const roleName = screen.getByText("Test Role");
    const roleDesc = screen.getByText("Test Role Description");
    expect(roleName).toBeInTheDocument();
    expect(roleDesc).toBeInTheDocument();
  });

  test("renders Learn more link for PDF media", () => {
    render(<RoleOverviewContent role={role} roleId={roleId} />);
    const learnMoreLink = screen.getByText("Learn more about this role");
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink).toHaveAttribute("href", "/test.pdf");
  });

  test("does not render Learn more link for non-PDF media", () => {
    const nonPdfRole = {
      ...role,
      attributes: {
        ...role.attributes,
        mediaPDF: {
          data: {
            attributes: {
              mime: "image/jpeg",
              url: "/test.jpg",
            },
          },
        },
      },
    };

    render(<RoleOverviewContent role={nonPdfRole} roleId={roleId} />);
    const learnMoreLink = screen.queryByText("Learn more about this role");
    expect(learnMoreLink).not.toBeInTheDocument();
    
  });
});
