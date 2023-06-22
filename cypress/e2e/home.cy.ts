describe('home page', () => {
	it('Visits the Kitchen Sink and find the content type', () => {
		// Arrange
		cy.visit('/')

		// Act
		cy.contains('type').click()

		// Assert
		// URL should include '/commands/actions'
		cy.url().should('include', '/commands/actions')

		// Get an input and type email
		cy.get('.action-email').type('fake@email.com')

		// Verify the email has been filled
		cy.get('.action-email').should('have.value', 'fake@email.com')
	})
})
