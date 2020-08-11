// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Visit a page on Storybook
 * @param { string } storybookUrl
 * @param { string } page
 * @param { string } variant - variant of component, e.g. "Highlighted"
 */
Cypress.Commands.add("visitPage", (storybookUrl, page, variant) => {
  const baseUrl = `${storybookUrl}/iframe.html?id=`;
  if (variant) {
    cy.visit(`${baseUrl}${page.toLowerCase()}--${variant.toLowerCase()}`);
  } else {
    cy.visit(`${baseUrl}${page.toLowerCase()}--default-story`);
  }
});
