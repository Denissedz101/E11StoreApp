describe('Persistencia de sesión', () => {
  before(() => {
    cy.login();
    cy.url().should('include', '/home');
  });

  it('debe mantener la sesión al recargar', () => {
    cy.reload();
    cy.url().should('include', '/home');
    cy.contains('Bienvenido').should('be.visible');
  });

  it('debe mantener sesión tras cerrar y abrir navegador (localStorage)', () => {
    cy.window().then((win) => {
      const token = win.localStorage.getItem('authToken');
      expect(token).to.not.be.null;
    });
  });
});
