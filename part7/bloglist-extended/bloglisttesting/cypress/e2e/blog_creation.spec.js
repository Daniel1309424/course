describe('Blog app', function() {
  
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
  
      const user = {
        name: 'Test User',
        username: 'testuser',
        password: 'password'
      }
  
      cy.request('POST', 'http://localhost:3003/api/users', user)
      
      cy.visit('http://localhost:5173')
  
      cy.get('input[name="Username"]').type('testuser')
      cy.get('input[name="Password"]').type('password')
      cy.contains('login').click()
    })
  
    describe('When logged in', function() {
      
      it('A blog can be created', function() {
        cy.contains('Create new blog').click()
        
        cy.get('input[name="title"]').type('Test Blog Title')
        cy.get('input[name="author"]').type('Test Author')
        cy.get('input[name="url"]').type('http://testblog.com')
        
        cy.contains('Create').click()
        
        cy.contains('Test Blog Title')
      })
      
    })
    
  })
  