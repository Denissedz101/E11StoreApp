describe('Navegación del menú lateral', () => {
  beforeEach(() => {
    cy.login();
  });

  it('debe navegar a Mi Perfil desde el menú', () => {
    cy.get('ion-menu-button').click();
    cy.contains('Mi Perfil').click();
    cy.url().should('include', '/mi-perfil');
    cy.contains('Modificar Datos').should('be.visible');
  });

  it('debe navegar a Contacto desde el menú', () => {
    cy.get('ion-menu-button').click();
    cy.contains('Contacto').click();
    cy.url().should('include', '/contacto');
    cy.contains('Formulario de Contacto').should('be.visible');
  });
});
