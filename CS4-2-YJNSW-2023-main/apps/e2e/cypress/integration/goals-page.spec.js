/// <reference types="Cypress" />
describe("capability comparison page test", function () {
  it.skip("OverviewPage URL Test", function () {
    cy.visit("/roles/1/goals");

    cy.contains("Goals");
  });
});
