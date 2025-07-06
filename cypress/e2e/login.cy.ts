describe('Login', () => {
  it('debe iniciar sesión con credenciales válidas', () => {
    cy.visit('/login');

    cy.get('input[name="correo"]').type('admin@admin.cl');
    cy.get('input[name="contrasena"]').type('1234');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/home');
    cy.contains('Bienvenido');
  });

  it('debe mostrar error si las credenciales son incorrectas', () => {
    cy.visit('/login');

    cy.get('input[name="correo"]').type('usuario@mal.com');
    cy.get('input[name="contrasena"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.contains('Error').should('exist');
  });
});
