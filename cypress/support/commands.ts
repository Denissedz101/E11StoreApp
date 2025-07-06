/// <reference types="cypress" />

import './commands';

Cypress.Commands.add('loginAs', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="correo"]').type(email);
  cy.get('input[name="contrasena"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/home');
});
