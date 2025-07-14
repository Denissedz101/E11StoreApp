describe('Mis Compras', () => {
  beforeEach(() => {
    cy.visit('/mis-compras');
  });

  it('debe eliminar un producto del carrito', () => {
    cy.get('[data-testid="btn-eliminar-item"]').first().click();
    cy.get('.compra-item').should('have.length', 0);
  });

  it('debe finalizar la compra y vaciar el carrito', () => {
    cy.get('[data-testid="btn-finalizar-compra"]').click();

    cy.get('ion-toast')
      .shadow()
      .find('.toast-message')
      .should('contain.text', '¡Felicidades por tu compra!');

    cy.wait(3500);
    cy.url().should('include', '/home');
  });
});
