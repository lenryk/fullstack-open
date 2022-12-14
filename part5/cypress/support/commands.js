// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-testid="username"]').type(username)
  cy.get('[data-testid="password"]').type(password)
  cy.get('[data-testid="login"]').click()

})

Cypress.Commands.add('createBlog', (title, author, url) => {
  cy.get('[data-testid="createNote"]').click()

  cy.get('[data-testid="title"]').type(title)
  cy.get('[data-testid="author"]').type(author)
  cy.get('[data-testid="url"]').type(url)

  cy.get('[data-testid="submitBlog"]').click()

  cy.contains('Added blog successfully!')
})
