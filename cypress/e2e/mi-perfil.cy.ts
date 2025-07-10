describe('Mi Perfil', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/mi-perfil');
  });

  it('debe mostrar datos actuales del usuario', () => {
    cy.get('[placeholder="Nombre"]').should('have.value', 'Administrador');
  });

  it('debe permitir modificar y guardar datos', () => {
    cy.get('[placeholder="Nombre"]').clear().type('Nuevo Nombre');
    cy.contains('Guardar').click();
    cy.contains('Datos actualizados').should('be.visible');
  });
});
