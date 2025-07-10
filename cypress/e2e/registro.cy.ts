describe('Registro de usuario', () => {
  it('debe registrar un nuevo usuario exitosamente', () => {
    const correo = `denisse${Date.now()}@mail.com`;
    cy.visit('/registro');
    cy.get('[placeholder="Nombre"]').type('Denisse');
    cy.get('[placeholder="Correo"]').type(correo);
    cy.get('[placeholder="Contraseña"]').type('123456');
    cy.get('[placeholder="Repetir contraseña"]').type('123456');
    cy.contains('Registrarse').click();
    cy.contains('Usuario registrado').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('debe validar que las contraseñas coincidan', () => {
    cy.visit('/registro');
    cy.get('[placeholder="Contraseña"]').type('123456');
    cy.get('[placeholder="Repetir contraseña"]').type('654321');
    cy.contains('Registrarse').click();
    cy.contains('Las contraseñas no coinciden').should('be.visible');
  });
});