/// <reference types="Cypress" />
describe("Overview page test", function () {
  beforeEach(() => {});

  it("OverviewPage URL Test", function () {
    cy.visit("/roles/2/overview");
    cy.contains("Role Overview");
    cy.get("[data-cy=link-role]").click({ force: true });
  });

  it("Activities 70", function () {
    cy.visit("/roles/2/overview");
    cy.contains("Role Overview");
    cy.get('[data-cy="Card-learning70"]').click({ force: true });
    cy.contains("Development Activities");
  });

  it("Activities 20", function () {
    cy.visit("/roles/2/overview");
    cy.contains("Role Overview");
    cy.get('[data-cy="Card-learning20"]').click({ force: true });
    cy.contains("Development Activities");
  });

  it("Activities 10", function () {
    cy.visit("/roles/2/overview");
    cy.contains("Role Overview");
    cy.get('[data-cy="Card-learning10"]').click({ force: true });
    cy.contains("Development Activities");
  });

  it("Career Progression", function () {
    cy.visit("/roles/2/overview");
    cy.get('[data-cy="Card-Progression"]').click({ force: true });

    cy.contains("Career Progression");
  });
});
