describe('Navegación del menú lateral', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="correo"]').type('admin@admin.cl');
    cy.get('input[name="contrasena"]').type('1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });

  it('debe navegar a Mi Perfil desde el menú', () => {
    cy.get('ion-menu-button').click();
    cy.contains('Mi Perfil').click();
    cy.url().should('include', '/mi-perfil');
    cy.contains('Modificar Datos').should('exist');
  });

  it('debe navegar a Contacto desde el menú', () => {
    cy.get('ion-menu-button').click();
    cy.contains('Contacto').click();
    cy.url().should('include', '/contacto');
    cy.contains('Formulario de Contacto').should('exist');
  });
});
