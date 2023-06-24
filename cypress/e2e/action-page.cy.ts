describe('template spec', () => {
	it('should link to the actions page correctly', () => {
		cy.visit('https://example.cypress.io')

		cy.scrollTo(0, 1000, { duration: 200 })
		cy.findAllByText('Actions').last().click()

		cy.url().should('include', 'commands/actions')
	})

	it('fill in an input field', () => {
		cy.visit('/commands/actions')

		cy.findByPlaceholderText('Email').type('alice@gmail.com')
		cy.findByPlaceholderText('Email').should('have.value', 'alice@gmail.com')
	})

	it('clear an input field', () => {
		cy.visit('/commands/actions')

		cy.findByLabelText('Describe:').scrollIntoView({ easing: 'linear', duration: 200 })
		cy.findByLabelText('Describe:').should('be.visible').type('Test alice')

		cy.findByLabelText('Describe:').should('have.value', 'Test alice').clear()
		cy.findByLabelText('Describe:').should('have.value', '')
	})

	it.only('check a checkbox', () => {
		cy.visit('/commands/actions')

		cy.findByRole('heading', { name: /\.check\(\)/i }).scrollIntoView({ offset: { top: -100, left: 0 }, duration: 100 })
		cy.findByRole('heading', { name: /\.check\(\)/i }).should('be.visible')

		cy.get('.action-checkboxes [type="checkbox"]').should('have.length', 3).first().check()
		cy.get('.action-checkboxes [type="checkbox"]').should('be.checked')

		cy.get('.action-checkboxes [type="checkbox"]').eq(1).should('be.disabled')
		cy.get('.action-checkboxes [type="checkbox"]').eq(2).should('not.be.checked')
	})
})
