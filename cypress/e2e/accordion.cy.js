describe("Storybook", () => {
  beforeEach(() => {
    cy.visitPage("Accordion");
  });

  // Accordion
  context("Accordion", () => {
    it("should show items when clicked", () => {
      cy.get("button").contains("Advanced topics").click();
      cy.findByRole("tabpanel", { name: "Advanced topics" }).within(() => {
        cy.get("p:first")
          .should("have.text", "Charm bundles")
          .should("be.visible");
      });
    });

    it("should hide items when clicked again", () => {
      cy.get("button").contains("Advanced topics").click();

      cy.findByRole("tabpanel", { name: "Advanced topics" }).should(
        "be.visible"
      );
      cy.get("button").contains("Advanced topics").click();

      cy.findByRole("tabpanel", { name: "Advanced topics" }).should(
        "not.exist"
      );
    });
  });
});
