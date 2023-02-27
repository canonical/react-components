context("Modal", () => {
  beforeEach(() => {
    cy.visitPage("Modal");
  });
  it("does not close the modal on drag and drop from the content area", () => {
    cy.findByRole("dialog").should("be.visible");

    cy.findByRole("dialog")
      .trigger("mousedown")
      .trigger("mousemove", { clientX: 0, clientY: 0 })
      .trigger("mouseup");

    cy.findByRole("dialog").should("be.visible");
  });

  it("closes the modal when clicking outside of the modal content area", () => {
    cy.findByRole("dialog").should("be.visible");
    cy.get("body").click(0, 0);
    cy.findByRole("dialog").should("not.exist");
  });
});
