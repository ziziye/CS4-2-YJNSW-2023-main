it("Header and footer test", function () {
  cy.visit("/");
  cy.contains("What do you want to do?");

  cy.contains("My Profile").click({ force: true });
  cy.contains("Logout").click({ force: true });

  cy.viewport(320, 480);
  cy.contains("menu").click({ force: true });
  cy.contains("My Profile").click({ force: true });
  cy.contains("Logout").click({ force: true });
  cy.get(".nsw-icon-buttons > .material-icons").click({ force: true });

  cy.viewport(1000, 660);
  cy.contains("Privacy").click({ force: true });
  cy.contains("Website Accessibility").click({ force: true });
  cy.contains("Copyright and Disclaimer").click({ force: true });

  cy.get(".nsw-header__logo-link").click({ force: true });
  cy.contains("What do you want to do?");
});
