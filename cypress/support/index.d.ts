declare namespace Cypress {
  interface Chainable {
    /**
     * Login como un usuario específico usando correo y contraseña
     * @example cy.loginAs('admin@admin.cl', '1234')
     */
    loginAs(email: string, password: string): Chainable<void>;
  }
}
