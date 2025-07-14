
import './commands'

Cypress.on('uncaught:exception', (err) => {

  if (err.message.includes("elm[aelFn] is not a function")) {
    return false; // evita que falle el test
  }
  return true; // para otros errores, permite que falle el test
});
