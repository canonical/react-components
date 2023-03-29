context("Tooltip", () => {
  beforeEach(() => {
    cy.visitPage("Tooltip");
  });

  it("clicking the child button element opens the tooltip", () => {
    cy.findByRole("tooltip").should("not.exist");
    cy.findByRole("button", { name: /Hover over me!/ }).click();
    cy.findByRole("tooltip").should("be.visible");
  });

  it("hovering the child button element opens the tooltip", () => {
    cy.findByRole("tooltip").should("not.exist");
    cy.findByRole("button", { name: /Hover over me!/ }).trigger("mouseover");
    cy.findByRole("tooltip").should("be.visible");
  });

  it("when activated on click tooltip remains open when the cursor is moved outside", () => {
    cy.findByRole("tooltip").should("not.exist");
    cy.findByRole("button", { name: /Hover over me!/ }).click();
    cy.get("body").trigger("mousemove", { clientX: 0, clientY: 0 });
    cy.findByRole("tooltip").should("be.visible");
    cy.get("body").type("{esc}");
    cy.findByRole("tooltip").should("not.exist");
  });

  it("when activated on click tooltip can be closed with an ESC key", () => {
    cy.findByRole("tooltip").should("not.exist");
    cy.findByRole("button", { name: /Hover over me!/ }).click();
    cy.findByRole("tooltip").should("be.visible");
    cy.get("body").type("{esc}");
    cy.findByRole("tooltip").should("not.exist");
  });

  it("when activated on click tooltip can be closed by clicking outside of it", () => {
    cy.findByRole("tooltip").should("not.exist");
    cy.findByRole("button", { name: /Hover over me!/ }).click();
    cy.findByRole("tooltip").should("be.visible");
    cy.get("body").click(0, 0);
    cy.findByRole("tooltip").should("not.exist");
  });
});
