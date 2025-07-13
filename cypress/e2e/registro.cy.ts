describe('Registro de usuario', () => {
  it('debe registrar un nuevo usuario exitosamente', () => {

    cy.visit('/registro');
    //datos registro
    cy.get("input[placeholder=\"nombre\"]").type("Denisse");
    cy.get("input[placeholder=\"apellidos\"]").type("Diaz");
    cy.get("input[placeholder=\"correo\"]").type("denissedz@gmail.com");
    cy.get("input[placeholder=\"contrasena\"]").type("1234");
    cy.get("input[placeholder=\"repetir_contrasena\"]").type("1234");
    cy.get("input[placeholder=\"fecha_nacimiento\"]").type("17-12-1986");
    cy.get("input[placeholder=\"direccion\"]").type("Calle 445");
    cy.get("input[placeholder=\"telefono\"]").type("123459876");
    cy.get("input[placeholder=\"comuna\"]").type("Santiago");
    cy.get("input[placeholder=\"ciudad\"]").type("Santiago");

    cy.contains('Registrarse').click();

    cy.contains('¡Felicidades!').should('be.visible');
    cy.url().should('include', '/login');
  });


});
