describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'testuser',
        name: 'Test User',
        password: 'password123',
      })
      cy.visit('http://localhost:5173')
    })
  
    it('Login form is shown', function() {
      cy.contains('Log in')
      cy.get('input[name="username"]')
      cy.get('input[name="password"]')
      cy.get('button[type="submit"]')
    })
  
    describe('Login', function() {
      it('succeeds with correct credentials', function() {
        cy.get('input[name="username"]').type('testuser')
        cy.get('input[name="password"]').type('password123')
        cy.get('button[type="submit"]').click()
        cy.contains('Blogs')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('input[name="username"]').type('testuser')
        cy.get('input[name="password"]').type('wrongpassword')
        cy.get('button[type="submit"]').click()
        cy.contains('Invalid credentials')
        cy.get('.notification')
          .should('have.css', 'background-color', 'rgb(255, 0, 0)')
      })
    })
  })
  