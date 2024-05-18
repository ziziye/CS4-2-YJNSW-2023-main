describe("Welcome Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("welcome page url test", () => {
    cy.contains("What do you want to do?");
  });

  it("FindRole Page link", function () {
    cy.get(
      '[data-cy="welcome-findrole"] > .nsw-card > .nsw-card__content > .nsw-card__title > .nsw-card__link'
    ).click({ force: true });
    cy.url().should("contain", "/search");
  });

  it("CareerProgression link", function () {
    cy.get(
      '[data-cy="welcome-careerprogression"] > .nsw-card > .nsw-card__content > .nsw-card__title > .nsw-card__link'
    ).click({ force: true });
    cy.url().should("contain", "/roles/1/progression");
  });
});
