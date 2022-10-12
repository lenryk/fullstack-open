describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', { username: 'mike2', name:'mike', password: 'testing' })
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Logins', function() {
    it('succeeds with correct credentials', function() {
      cy.get('[data-testid="username"]').type('mike2')
      cy.get('[data-testid="password"]').type('testing')
      cy.get('[data-testid="login"]').click()

      cy.contains('Logged in as mike')
    })

    it('fails with wrong credentials', function() {
      cy.get('[data-testid="username"]').type('jeff')
      cy.get('[data-testid="password"]').type('testing')
      cy.get('[data-testid="login"]').click()

      cy.get('h2').should('have.attr', 'style', 'color: red;')
    })
  })
})
