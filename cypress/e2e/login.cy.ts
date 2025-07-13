describe('Login', () => {

  describe('Login', () => {
  it('debe mostrar campos y redirigir al registro', () => {
    cy.visit('/login');
    
    cy.get('[data-testid="input-correo"]').should('exist');
    cy.get('[data-testid="input-contrasena"]').should('exist');

    cy.get('[data-testid="btn-ir-a-registro"]').click();

    cy.wait(500); 
    cy.location('pathname').should('include', '/registro');
  });
});


});