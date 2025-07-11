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

  it('debe agregar un juego al carrito y reflejarlo en Mis Compras', () => {
    // Espera que los juegos se carguen
    cy.get('ion-card', { timeout: 10000 }).should('have.length.at.least', 1);

    // Click al botón "Añadir" usando data-testid
    cy.get('[data-testid="btn-agregar-al-carrito"]').first().click();

    // Ir a /mis-compras
    cy.visit('/mis-compras');

    // Verifica presencia del juego
    cy.get('ion-list ion-item').should('contain.text', 'Precio:');

    // Verifica datos del usuario
    cy.get('ion-label').should('contain.text', 'Correo: admin@admin.cl');
    cy.get('ion-label').should('contain.text', 'Dirección:');

    // Verifica que el total sea mayor a cero
    cy.get('ion-note').invoke('text').then((text) => {
      const total = parseInt(text.replace('$', '').trim(), 10);
      expect(total).to.be.greaterThan(0);
    });
  });
});
