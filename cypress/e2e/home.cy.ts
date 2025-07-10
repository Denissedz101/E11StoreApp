describe('Página Home', () => {
  beforeEach(() => {
  
    cy.visit('/home', {
      onBeforeLoad(win) {
        
        const usuarioPrueba = {
          id: 1,
          nombre: 'Admin',
          correo: 'admin@admin.cl',
        };
        win.localStorage.setItem('usuario-activo', JSON.stringify(usuarioPrueba));
      }
    });
  });

  it('debe mostrar tarjetas de juegos', () => {
    cy.get('ion-card', { timeout: 10000 })
      .should('have.length.at.least', 1)
      .as('tarjetasDeJuegos');
    
    cy.get('@tarjetasDeJuegos').first().screenshot('primer-juego');  
  });

  it('el botón de carrito debe existir y mostrarse', () => {

    cy.contains('Bienvenido', { timeout: 10000 }).should('exist');

  
    cy.get('[data-testid="btn-carrito"]', { timeout: 10000 })
      .should('exist')
      .and('be.visible');
  });
});
