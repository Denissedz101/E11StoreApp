describe('Agregar al carrito desde Home con data-testid', () => {
  beforeEach(() => {
    cy.visit('/home', {
      onBeforeLoad(win) {
        const usuarioPrueba = {
          id: 1,
          nombre: 'Admin',
          correo: 'admin@admin.cl',
          direccion: 'Calle 123',
          telefono: '123456789'
        };
        win.localStorage.setItem('usuario-activo', JSON.stringify(usuarioPrueba));
        win.localStorage.setItem('carrito', JSON.stringify([]));
      }
    });
  });

  it('debe agregar dos juegos al carrito y reflejarlos en Mis Compras', () => {
    // Espera que los juegos se carguen
    cy.get('ion-card', { timeout: 10000 }).should('have.length.at.least', 2);

    // Agregar dos juegos diferentes (los dos primeros)
    cy.get('[data-testid="btn-agregar-al-carrito"]').eq(0).click();
    cy.get('[data-testid="btn-agregar-al-carrito"]').eq(1).click();

    // Ir a Mis Compras
    cy.visit('/mis-compras');

    // Verificar que haya al menos dos items en la lista
    cy.get('ion-list ion-item').should('have.length.at.least', 2);

    // Verificar que los datos del usuario están visibles
    cy.get('ion-label').should('contain.text', 'Correo: admin@admin.cl');
    cy.get('ion-label').should('contain.text', 'Dirección:');

    // Verifica que el total sea mayor a cero
    cy.get('ion-note').invoke('text').then((text) => {
      const total = parseInt(text.replace('$', '').trim(), 10);
      expect(total).to.be.greaterThan(0);
    });
  });
});
