describe('Página Home - E11evenStore', () => {
  it('debería cargar correctamente el título', () => {
    cy.visit('http://localhost:8100'); // cambia puerto si usas otro
    cy.contains('Juegos recién llegados');
  });

  it('debería redirigir al login si no hay sesión', () => {
    cy.get('ion-button').contains('Iniciar sesión').click();
    cy.url().should('include', '/login');
  });
});
