describe('My first type', () => {
	beforeEach(() => {
		cy.visit('/commands/actions')
	})

	it.skip('should have an H1 on the page', () => {
		cy.get('h1').should('exist')
	})

	it.skip('should render the correct H1 text', () => {
		cy.get('h1').should('contain.text', 'Actions')
	})

	it.skip('should render a paragraph under the H1', () => {
		cy.get('.container').eq(1).find('p').should('exist')
	})

	it.skip('should render a section with the correct elements', () => {
		cy.get('.container')
			.eq(2)
			.within(() => {
				cy.get('h4').should('exist')
				cy.get('p').should('exist')
			})
	})

	it.skip('should render the Cypress website link', () => {
		cy.findByText('cypress.io').should('exist')
	})

	it('should fill an email into email text box', () => {
		cy.findByPlaceholderText('Email').should('have.value', '').type('jojo@gmail.com')

		cy.findByPlaceholderText('Email').should('have.value', 'jojo@gmail.com')

		cy.get('textarea').should('exist').and('be.disabled')

		cy.wait(1500).then(() => {
			console.log('Test is finished! 2')
		})
		console.log('Test is finished! 1')
	})
})
