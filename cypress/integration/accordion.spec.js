describe("Storybook", () => {
  const storybookUrl = `http://localhost:${Cypress.env("port")}`;

  beforeEach(() => {
    cy.visitPage(storybookUrl, "Accordion");
  });

  // Accordion
  context("Accordion", () => {
    it("should show items when clicked", () => {
      cy.get("button").contains("Advanced topics").click();
      cy.get("#root > aside > ul > li > section > p:first").should(
        "be.visible"
      );
      cy.get("#root > aside > ul > li > section > p:first").should(
        "have.text",
        "Charm bundles"
      );
    });

    it("should hide items when clicked again", () => {
      cy.get("button").contains("Advanced topics").click();
      cy.get("button").contains("Advanced topics").click();

      cy.get("#root > aside > ul > li > section > p:first").should(
        "not.be.visible"
      );
    });
  });
});
