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
  
    describe('When blogs are ordered by likes', function() {
  
      it('Blogs should be ordered by the number of likes, most liked first', function() {
        const blog1 = {
          title: 'First Blog',
          author: 'Test Author',
          url: 'http://first.com',
        };
  
        const blog2 = {
          title: 'Second Blog',
          author: 'Test Author',
          url: 'http://second.com',
        };
  
        cy.createBlog(blog1)
        cy.createBlog(blog2)
  
        cy.contains('First Blog').parent().find('button').click()
        cy.contains('First Blog').parent().find('button').click()
        cy.contains('Second Blog').parent().find('button').click()
  
        cy.get('.blog').eq(0).should('contain', 'First Blog')
        cy.get('.blog').eq(1).should('contain', 'Second Blog')
      });
    });
  });
  