describe('Navegación del menú superior', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('debe navegar a Mi Perfil desde el menú superior', () => {
    cy.get('ion-segment-button')
      .find('ion-icon[name="person-circle-outline"]')
      .click({ force: true });

    cy.url().should('include', '/mi-perfil');
    cy.contains('Mi Perfil').should('be.visible');
  });

  it('debe navegar a Contacto desde el menú superior', () => {
    cy.get('ion-segment-button')
      .find('ion-icon[name="chatbox-outline"]')
      .click({ force: true });

    cy.url().should('include', '/contacto');
    cy.contains('¡Contáctanos!').should('be.visible');
  });

  it('debe navegar a Geolocalización desde el menú superior', () => {
    cy.get('ion-segment-button')
      .find('ion-icon[name="location-outline"]')
      .click({ force: true });

    cy.url().should('include', '/geolocalizacion');
  });
});