/// <reference types="cypress" />
// cypress/support/commands.js

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      fillIonInput(selector: string, value: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.visit('/login'); //url login
  cy.get('input[name="username"]').type('admin@admin.cl');
  cy.get('input[name="password"]').type('1234');
  cy.get('button[type="submit"]').click();
});


Cypress.Commands.add('fillIonInput', (selector: string, value: string) => {
  cy.get(selector).then(($el) => {
    const shadowRoot = $el[0].shadowRoot;
    if (!shadowRoot) {
      throw new Error(`No se pudo acceder al shadowRoot del elemento ${selector}`);
    }

    const input = shadowRoot.querySelector('input');
    if (!input) {
      throw new Error(`No se encontró input interno en ${selector}`);
    }

    cy.wrap(input).clear().type(value);
  });
});


export {};
