describe("Welcome Page", () => {
  beforeEach(() => {
    cy.visit("/error");
  });

  it("welcome page url test", () => {
    cy.contains("We’re sorry about this...");
    cy.contains("homepage").click({ force: true });

    cy.url().should("contain", "/");
    cy.contains("What do you want to do?");
  });
});
