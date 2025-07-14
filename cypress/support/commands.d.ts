
declare namespace Cypress {
  interface Chainable {
    login(): Chainable;  // Define el tipo del comando 'login' 
  }
}

declare namespace Cypress {
  interface Chainable {
    fillIonInput(selector: string, value: string): Chainable;
  }
}
