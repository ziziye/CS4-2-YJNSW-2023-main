/// <reference types="Cypress" />
describe("career progression page test", function () {
  beforeEach(() => {
    cy.visit("/roles/2/progression");
  });

  it("Career Progression Url test", function () {
    cy.contains("Career Progression");
    cy.contains("Discover Roles");
  });
  it("Career Progression test", function () {
    cy.get("[data-cy=CareerProgression-searchinput]")
      .type("youth", { force: true })
      .should("have.value", "youth")
      .clear();

    cy.get("[data-cy=CareerProgression-submit]").click({ force: true });

    cy.contains("Custodial").click({ force: true });
    cy.contains("Custodial").prev().should("be.checked");

    cy.contains("Community").click({ force: true });
    cy.contains("Community").prev().should("be.checked");

    cy.contains("Business Support").click({ force: true });
    cy.contains("Business Support").prev().should("be.checked");

    cy.contains("Identified-only").click({ force: true });
    cy.contains("Identified-only").prev().should("be.checked");

    cy.get("canvas").click({ force: true });
  });
});
