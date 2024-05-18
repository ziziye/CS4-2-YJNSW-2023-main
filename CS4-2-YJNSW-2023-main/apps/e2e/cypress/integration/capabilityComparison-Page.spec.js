/// <reference types="Cypress" />
describe("capability comparison page test", function () {
  it("OverviewPage URL Test", function () {
    cy.visit("/roles/1/comparison/0");

    cy.contains("Capability Comparison Table");
  });
});
