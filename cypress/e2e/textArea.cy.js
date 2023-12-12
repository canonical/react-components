context("TextArea", () => {
  beforeEach(() => {
    cy.visitPage("TextArea", "Dynamic-Height");
  });

  it("should adjust height automatically with text content change", () => {
    let initialHeight = 0;
    cy.findByRole("textbox").then(($element) => {
      initialHeight = $element.height();
    });
    cy.findByRole("textbox").focus();
    cy.findByRole("textbox").type("{Enter}{Enter}{Enter}");
    cy.findByRole("textbox").then(($element) => {
      const finalHeight = $element.height();
      expect(finalHeight).to.be.greaterThan(initialHeight);
      initialHeight = finalHeight;
    });
    cy.findByRole("textbox").clear();
    cy.findByRole("textbox").then(($element) => {
      const finalHeight = $element.height();
      expect(finalHeight).to.be.lessThan(initialHeight);
    });
  });
});
