
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Leijona Kuningas',
      username: 'leijona',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('leijona')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Leijona Kuningas logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('leijona')
      cy.get('#password').type('badsalasana')
      cy.get('#login-button').click()

      //cy.get('.error').contains('Wrong credentials!')
      //cy.contains('Wrong credentials!')
      cy.get('.error').should('contain', 'Wrong credentials!')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'leijona', password: 'salasana' })
    })

    it('A new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a title')
      cy.get('#author').type('an author')
      cy.get('#url').type('urlHere')
      cy.get('#create-button').click()

      cy.get('.success').should('contain', 'A new blog "a title" added by Leijona Kuningas')

      cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.success').should('have.css', 'border-style', 'solid')

      cy.get('#bloglist').should('contain', 'a title')

    })
    describe('when logged in and blogs in the list', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'a title', author: 'author', url: 'url' })
      })
      it('a blog can be liked', function () {
        cy.contains('view').click()

        cy.contains('like').click()
      })

      it('user can delete their selfcreated blog', function() {

        cy.get('.blog-whole').should('contain', 'a title')
        cy.contains('view').click()
        cy.contains('remove blog').click()

        cy.get('.blog-whole').should('not.exist')
      })
    })
  })
})