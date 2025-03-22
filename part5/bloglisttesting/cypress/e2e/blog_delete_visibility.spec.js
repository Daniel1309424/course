describe('Blog app', function() {

    beforeEach(function() {
      cy.visit('http://localhost:3003');
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      
      const user = {
        name: 'Test User',
        username: 'testuser',
        password: 'password',
      };
      
      cy.request('POST', 'http://localhost:3003/api/users', user)
      
      const anotherUser = {
        name: 'Another User',
        username: 'anotheruser',
        password: 'password',
      };
      
      cy.request('POST', 'http://localhost:3003/api/users', anotherUser)
      
      cy.login({ username: user.username, password: user.password })
    });
  
    describe('When logged in as creator', function() {
      
      it('Creator can see the delete button', function() {
        const blog = {
          title: 'Test Blog',
          author: 'Test Author',
          url: 'http://test.com',
        };
        
        cy.createBlog(blog);
        
        cy.contains('Test Blog')
          .parent()
          .contains('remove');
      });
  
    });
  
    describe('When logged in as a non-creator', function() {
      
      it('Non-creator cannot see the delete button', function() {
        cy.logout();
        cy.login({ username: 'anotheruser', password: 'password' })
        
        cy.contains('Test Blog')
          .parent()
          .should('not.contain', 'remove')
      });
  
    });
  
  });
  