describe('Mis Compras', () => {
  beforeEach(() => {
    cy.login();
    cy.get('.btn-add-to-cart').first().click();
    cy.visit('/mis-compras');
  });

  it('debe mostrar productos en el carrito', () => {
    cy.contains('Mis Compras').should('be.visible');
    cy.get('.compra-item').should('have.length.greaterThan', 0);
  });
});
