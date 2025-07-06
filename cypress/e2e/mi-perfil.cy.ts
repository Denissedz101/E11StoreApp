describe('Mi Perfil', () => {
  beforeEach(() => {
    cy.loginAs('admin@admin.cl', '1234');
    cy.visit('/mi-perfil');
  });

  it('debe mostrar datos actuales del usuario', () => {
    cy.get('input[name="nombre"]').should('have.value', 'Administrador');
  });

  it('debe permitir modificar y guardar datos', () => {
    cy.get('input[name="nombre"]').clear().type('Nuevo Nombre');
    cy.get('button[type="submit"]').click();
    cy.contains('Datos actualizados').should('exist');
  });
});
