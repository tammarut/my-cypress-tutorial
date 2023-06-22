describe('class spec', () => {
	it('shows an active class for the current page', () => {
		cy.visit('/commands/actions')

		cy.get('.navbar-nav').find('li').first().should('have.class', 'active').click()

		cy.get('.dropdown-menu').find('li').eq(2).should('have.class', 'active').should('contain.text', 'Actions')
	})
})
