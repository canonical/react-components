context("Tooltip", () => {
  beforeEach(() => {
    cy.visitPage("Tooltip");
  });

  it("clicking the child button element opens the tooltip", () => {
    cy.findByRole("tooltip").should("not.be.visible");
    cy.findByRole("button", { name: /Hover over me!/ }).click();
    cy.findByRole("tooltip").should("be.visible");
  });
});
