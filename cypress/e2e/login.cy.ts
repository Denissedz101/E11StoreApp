describe('Login', () => {
  it('debe mostrar campos y redirigir al registro', () => {
    cy.visit('/login');
   cy.get('[data-testid="input-correo"]').should('exist');
    cy.get('[data-testid="input-contrasena"]').should('exist');
    cy.contains('Iniciar sesión').should('exist').and('be.visible');
    cy.contains('¿No tienes cuenta?').click();
    cy.url().should('include', '/registro');
  });
});