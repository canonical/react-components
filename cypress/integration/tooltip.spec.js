import { variant } from "../../src/components/Tooltip";

Object.values(variant).forEach((variant) => {
  context(`Tooltip - ${variant}`, () => {
    beforeEach(() => {
      cy.visitPage("Tooltip", variant);
    });

    it("clicking the child button element opens the tooltip", () => {
      cy.findByRole("tooltip").should("not.exist");
      cy.findByRole("button", { name: /Hover over me!/ }).click();
      cy.findByRole("tooltip").should("exist");
    });
  });
});
