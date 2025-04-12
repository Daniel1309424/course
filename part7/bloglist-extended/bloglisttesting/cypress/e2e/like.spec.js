describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        username: 'root',
        password: 'password',
        name: 'Root User'
      };
      
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:5173')
    });
  
    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('root')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
      });
  
      it('A blog can be liked', function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('Test Blog')
        cy.get('#author').type('Author')
        cy.get('#url').type('http://test.com')
        cy.get('#create-blog').click()
        cy.contains('Test Blog Author').parent().contains('like').click()
        cy.contains('Test Blog Author').parent().contains('likes 1')
      });
    });
  });
  