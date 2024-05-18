/// <reference types="Cypress" />
describe("Search page test", function () {
  beforeEach(() => {
    cy.visit("/search");
  });

  it("Searchpage url test", function () {
    cy.contains("Search");
  });

  it("Searchinput test", function () {
    cy.get("#search-input")
      .type("youth", { force: true })
      .should("have.value", "youth")
      .clear()
      .should("have.value", "");

    cy.get("[data-cy=search-submit]").click({ force: true });

    cy.contains("Filter results");
    cy.contains("Custodial");

    cy.contains("Custodial").click({ force: true });
    cy.contains("Custodial").prev().should("be.checked");

    cy.contains("Community").click({ force: true });
    cy.contains("Community").prev().should("be.checked");

    cy.contains("Business Support").click({ force: true });
    cy.contains("Business Support").prev().should("be.checked");

    cy.contains("Identified-only").click({ force: true });
    cy.contains("Identified-only").prev().should("be.checked");

    cy.get("[data-cy=filters-reset]").click({ force: true });
    cy.get("[data-cy=filters-submit]").click({ force: true });
  });
});
