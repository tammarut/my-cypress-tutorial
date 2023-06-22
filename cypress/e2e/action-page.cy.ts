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
		const describeField = cy.findByLabelText('Describe:')
		describeField.scrollIntoView({ easing: 'linear', duration: 200 }).should('be.visible')
		describeField.type('Test alice')

		describeField.should('have.value', 'Test alice')
		describeField.clear()
		describeField.should('have.value', '')
	})

	it.only('check a checkbox', () => {
		cy.visit('/commands/actions')

		const checkHeader = cy.findByRole('heading', { name: /\.check\(\)/i })
		checkHeader.scrollIntoView({ offset: { top: -100, left: 0 }, duration: 100 }).should('be.visible')

		const allCheckboxes = cy.get('.action-checkboxes [type="checkbox"]')
		allCheckboxes.should('have.length', 3)
		allCheckboxes.first().check().should('be.checked')

		cy.get('.action-checkboxes [type="checkbox"]').eq(1).should('be.disabled')
		cy.get('.action-checkboxes [type="checkbox"]').eq(2).should('not.be.checked')
	})
})
