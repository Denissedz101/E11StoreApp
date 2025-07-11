describe('Persistencia de sesión', () => {
  before(() => {
    cy.visit('/home');
    cy.url().should('include', '/home');
  });

  it('debe mantener la sesión al recargar', () => {
    cy.reload();
    cy.url().should('include', '/home');
    cy.contains('Bienvenido, Admin').should('be.visible');
  });

});
