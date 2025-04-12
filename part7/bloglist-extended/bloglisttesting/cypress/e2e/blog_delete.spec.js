describe('Blog app', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3003')
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Test User',
        username: 'testuser',
        password: 'password',
      };
      
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.login({ username: user.username, password: user.password })
    });
  
    describe('When logged in', function() {
      it('A blog can be deleted by the creator', function() {
        const blog = {
          title: 'Test Blog',
          author: 'Test Author',
          url: 'http://test.com',
        };
  
        cy.createBlog(blog)
  
        cy.contains('Test Blog')
          .parent()
          .contains('remove')
          .click()
  
        cy.get('html').should('not.contain', 'Test Blog')
      });
    });
  });
  