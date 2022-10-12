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

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login('mike2', 'testing')
      })

      it('A blog can be created', function() {
        cy.get('[data-testid="createNote"]').click()

        cy.get('[data-testid="title"]').type('my test blog post')
        cy.get('[data-testid="author"]').type('mike')
        cy.get('[data-testid="url"]').type('google.com')

        cy.get('[data-testid="submitBlog"]').click()

        cy.contains('Added blog successfully!')


      })

      describe('Interacting with blog posts', function() {
        beforeEach(function() {
          cy.createBlog('my new blog post', 'charles', 'facebook.com')
        })


        it('A blog can be liked', function () {
          cy.get('[data-testid="viewToggle"]').click()
          cy.contains('0')
          cy.get('[data-testid="like"]').click()
          cy.contains('1')
        })

        it('A blog by the same user can be deleted', function () {
          cy.get('[data-testid="viewToggle"]').click()
          cy.contains('delete blog')
          cy.get('[data-testid="deleteBlog"]').click()
          cy.contains('Deleted blog my new blog post')
        })

        it('Sorts blog posts by the most likes', function() {
          cy.get('[data-testid="title"]').type('my second blog')
          cy.get('[data-testid="author"]').type('mike2')
          cy.get('[data-testid="url"]').type('google.com')

          cy.get('[data-testid="submitBlog"]').click()

          cy.contains('Added blog successfully!')

          cy.get('[data-testid="viewToggle"]').click({ multiple: true })

          // like first blog
          cy.get('[data-testid="blogs"]').get('[data-testid="blog"]').first().get('[data-testid="likes"]').contains(0)
          cy.get('[data-testid="like"]').first().click()
          cy.wait(200)
          cy.get('[data-testid="blogs"]').get('[data-testid="blog"]').first().get('[data-testid="likes"]').contains(1)

          cy.get('[data-testid="viewToggle"]').last().click({ multiple: true })

          // like second blog
          cy.get('[data-testid="blogs"]').get('[data-testid="blog"]').last().get('[data-testid="likes"]').contains(0)
          cy.get('[data-testid="like"]').last().click()
          cy.wait(200)
          cy.get('[data-testid="blogs"]').get('[data-testid="blog"]').last().get('[data-testid="likes"]').contains(1)

          // like first blog
          cy.get('[data-testid="blogs"]').get('[data-testid="blog"]').first().get('[data-testid="likes"]').contains(1)
          cy.get('[data-testid="like"]').first().click()
          cy.wait(200)
          cy.get('[data-testid="blogs"]').get('[data-testid="blog"]').first().get('[data-testid="likes"]').contains(2)
        })
      })
    })
  })
})
