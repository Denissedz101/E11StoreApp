describe('Contacto', () => {
  it('debe enviar mensaje correctamente', () => {
    cy.visit('/contacto');
    cy.get('[placeholder="Nombre"]').type('Denisse');
    cy.get('[placeholder="Correo"]').type('denisse@correo.com');
    cy.get('[placeholder="Mensaje"]').type('Hola, necesito ayuda.');
    cy.contains('Enviar').click();
    cy.contains('Mensaje enviado').should('be.visible');
  });

  it('debe validar campos requeridos', () => {
    cy.visit('/contacto');
    cy.contains('Enviar').click();
    cy.contains('Campo requerido').should('be.visible');
  });
});
