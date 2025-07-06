describe('Mis Compras', () => {
  beforeEach(() => {
    cy.loginAs('admin@admin.cl', '1234'); 
    cy.visit('/home');
    cy.get('.btn-add-to-cart').first().click(); // botón de agregar producto
  });

  it('debe mostrar productos en el carrito', () => {
    cy.visit('/mis-compras');
    cy.contains('Mis Compras');
    cy.get('.compra-item').should('have.length.greaterThan', 0);
  });
});
