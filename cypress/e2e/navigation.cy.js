context("Navigation", () => {
  beforeEach(() => {
    cy.visitPage("navigation");
  });

  it("displays the navigation items at large sizes", () => {
    cy.viewport("macbook-16");
    cy.findByRole("link", { name: "Products" }).should("be.visible");
    cy.findByRole("button", { name: "Menu" }).should("not.exist");
  });

  it("displays the mobile menu at small sizes", () => {
    cy.viewport("iphone-6");
    cy.findByRole("link", { name: "Products" }).should("not.exist");
    cy.findByRole("button", { name: "Menu" }).should("be.visible");
  });

  it("can open the mobile menu", () => {
    cy.viewport("iphone-6");
    cy.findByRole("link", { name: "Products" }).should("not.exist");
    cy.findByRole("button", { name: "Menu" }).click();
    cy.findByRole("link", { name: "Products" }).should("be.visible");
  });

  it("can open the search at large sizes", () => {
    cy.visitPage("Navigation", "search");
    cy.findByRole("searchbox", { name: "Search" }).should("not.exist");
    cy.findByRole("button", { name: "Search" }).click();
    cy.findByRole("searchbox", { name: "Search" }).should("be.visible");
  });

  it("can open the search at small sizes", () => {
    cy.viewport("iphone-6");
    cy.visitPage("Navigation", "search");
    cy.findByRole("searchbox", { name: "Search" }).should("not.exist");
    cy.findByRole("button", { name: "Search" }).click();
    cy.findByRole("searchbox", { name: "Search" }).should("be.visible");
  });
});
