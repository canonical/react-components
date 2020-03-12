describe("Storybook", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:${Cypress.env('port')}`);
  });

  // Accordion
  context("Accordion", () => {
    it("should show items when clicked", () => {
      cy.get('a[title="Default"]').click();

      cy.get("#storybook-preview-iframe").then($iframe => {
        const doc = $iframe.contents();
        iget(doc, "button")
          .contains("Advanced topics")
          .click();
        iget(doc, "#root > aside > ul > li > section > p:first").should('be.visible');
        iget(doc, "#root > aside > ul > li > section > p:first").should(
          "have.text",
          "Charm bundles"
        );
      });
    });

  it("should hide items when clicked again", () => {
      cy.get('a[title="Default"]').click();

      cy.get("#storybook-preview-iframe").then($iframe => {
        const doc = $iframe.contents();
        iget(doc, "button")
          .contains("Advanced topics")
          .click();
      iget(doc, "button")
          .contains("Advanced topics")
          .click();

        iget(doc, "#root > aside > ul > li > section > p:first").should('not.be.visible');
      });
    });
  });
});

function iget(doc, selector) {
  return cy.wrap(doc.find(selector));
}
