describe('Mis Compras', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.get('.btn-add-to-cart').first().click(); // Asegúrate de que este botón tenga ese selector
    cy.visit('/mis-compras');
  });

  it('debe mostrar productos en el carrito', () => {
    cy.contains('Mis Compras').should('be.visible');
    cy.get('.compra-item').should('have.length.greaterThan', 0);
  });
});
