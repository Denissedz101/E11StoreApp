describe('Contacto', () => {
  it('debe enviar mensaje correctamente', () => {
    cy.visit('/contacto');

    cy.get('input[name="nombre"]').type('Denisse');
    cy.get('input[name="email"]').type('denisse@correo.com');
    cy.get('textarea[name="mensaje"]').type('Hola, necesito ayuda.');

    cy.get('button[type="submit"]').click();
    cy.contains('Mensaje enviado').should('exist');
  });

  it('debe validar campos requeridos', () => {
    cy.visit('/contacto');
    cy.get('button[type="submit"]').click();
    cy.contains('Campo requerido').should('exist');
  });
});
