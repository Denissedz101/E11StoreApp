describe('Registro de usuario', () => {
  it('debe registrar un nuevo usuario exitosamente', () => {
    cy.visit('/registro');

    cy.get('input[name="nombre"]').type('Denisse');
    cy.get('input[name="correo"]').type('denisse' + Date.now() + '@mail.com');
    cy.get('input[name="contrasena"]').type('123456');
    cy.get('input[name="repetirContrasena"]').type('123456');

    cy.get('button[type="submit"]').click();
    cy.contains('Usuario registrado').should('exist');
    cy.url().should('include', '/login');
  });

  it('debe validar que las contraseñas coincidan', () => {
    cy.visit('/registro');

    cy.get('input[name="contrasena"]').type('123456');
    cy.get('input[name="repetirContrasena"]').type('654321');
    cy.get('button[type="submit"]').click();

    cy.contains('Las contraseñas no coinciden').should('exist');
  });
});
