describe('Mi Perfil', () => {
  beforeEach(() => {
    cy.visit('/mi-perfil');
  });

  it('debe mostrar datos actuales del usuario', () => {
    cy.get('[name="nombre"]').should('have.value', 'Administrador');
    cy.get('[name="correo"]').should('have.value', 'admin@admin.cl');
  });

  it('debe permitir modificar y guardar datos', () => {
    // Activar edición
    cy.contains('Modificar datos').click();

    // Cambiar algunos valores
    cy.get('ion-input[name="nombre"]')
      .shadow()
      .find('input')
      .clear()
      .type('Nuevo Nombre');
    
    cy.get('ion-input[name="apellidos"]')
      .shadow()
      .find('input')
      .clear()
      .type('Apellidos actualziados');
    
    cy.get('ion-input[name="telefono"]')
      .shadow()
      .find('input')
      .clear()
      .type('123456789');

    cy.get('ion-input[name="direccion"]')
      .shadow()
      .find('input')
      .clear()
      .type('Nuevo Leon 123');

    // Guardar
    cy.contains('Guardar').click();

    // Confirmación
    cy.contains('Datos actualizados').should('be.visible');
  });
});
