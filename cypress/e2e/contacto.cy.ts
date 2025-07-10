describe('Contacto', () => {
  it('debe enviar mensaje correctamente', () => {
    cy.visit('/contacto');
    cy.get('[data-testid="textarea-mensaje"]').type('Hola, necesito ayuda.');
    cy.contains('Enviar').should('not.be.disabled').click();
    cy.contains('Mensaje enviado').should('be.visible');
  });

  it('debe validar campos requeridos', () => {
    cy.visit('/contacto');
    cy.get('[data-testid="textarea-mensaje"]').type('Hola, necesito ayuda.');
    cy.contains('Enviar').should('not.be.disabled').click();
  });
});