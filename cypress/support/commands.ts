/// <reference types="cypress" />
// cypress/support/commands.js

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.visit('/login'); //url login
  cy.get('input[name="username"]').type('admin@admin.cl');
  cy.get('input[name="password"]').type('1234');
  cy.get('button[type="submit"]').click();
});



export {};
