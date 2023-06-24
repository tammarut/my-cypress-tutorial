describe('Mouse Events', () => {
	beforeEach(() => {
		cy.visit('/commands/actions')
	})

	it('should trigger a popover on click', () => {
		cy.get('.action-btn').click()
		cy.findByText('This popover shows up on click').should('be.visible')
		cy.findByRole('tooltip', { name: /popover this popover shows up on click/i }).should('be.visible')
	})

	it('can click on different selections of a canvas', () => {
		cy.get('#action-canvas').click('top')
		cy.get('#action-canvas').click('bottomRight')
		cy.get('#action-canvas').click(80, 100)
	})

	it('can double click to edit', () => {
		cy.get('.action-div').dblclick()
		cy.get('.action-div').should('not.be.visible')
		cy.get('.action-input-hidden').should('be.visible')
	})

	it('can right click to edit', () => {
		cy.get('.rightclick-action-div').rightclick()
		cy.get('.rightclick-action-div').should('not.be.visible')
		cy.get('.rightclick-action-input-hidden').should('be.visible')
	})

	it('shows the nav links on hover', () => {
		cy.findByRole('link', { name: 'Utilities' }).trigger('mouseover')
		cy.get('.dropdown-toggle').trigger('mouseover')
		cy.findByRole('button', { name: 'Commands' }).click()
		cy.findByRole('link', { name: 'Navigation' }).click()

		cy.location('pathname').should('eq', '/commands/navigation')
	})
})
