describe('Persistencia de sesión', () => {
  before(() => {
    cy.visit('/login');
    cy.get('input[name="correo"]').type('admin@admin.cl');
    cy.get('input[name="contrasena"]').type('1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });

  it('debe mantener la sesión al recargar', () => {
    cy.reload();
    cy.url().should('include', '/home');
    cy.contains('Bienvenido').should('exist');
  });

  it('debe mantener sesión tras cerrar y abrir navegador (localStorage)', () => {
    // Simulamos persistencia de sesión con localStorage
    cy.visit('/');
    cy.window().then((win) => {
      const token = win.localStorage.getItem('authToken');
      expect(token).to.exist;
    });
  });
});
