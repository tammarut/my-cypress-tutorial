describe('Locators', () => {
	it('Method Get', () => {
		cy.visit('https://demoqa.com/')

		cy.findByRole('banner').should('exist')
		cy.findByRole('banner').within(() => {
			cy.get('a').should('exist').and('have.attr', 'href').and('include', 'https://demoqa.com')
		})

		cy.get('.home-banner').should('exist')
		cy.get('.home-banner').within(() => {
			cy.get('a').should('exist').and('have.attr', 'href').and('include', 'https://www.toolsqa.com/selenium-training/')
		})

		cy.get('.category-cards').should('exist')
		cy.get('.category-cards').find('.card').should('have.length', 6)
		cy.get('.category-cards').within(() => {
			cy.contains('Elements')
			cy.contains('Forms')
			cy.contains('Alerts, Frame & Windows')
			cy.contains('Widgets')
			cy.contains('Interactions')
			cy.contains('Book Store Application')
		})
	})

	it('go to the form page', () => {
		cy.visit('https://demoqa.com/')

		cy.get('.category-cards > .card').eq(1).should('be.visible').click()

		cy.location('pathname').should('equal', '/forms')

		cy.findByRole('listitem').should('exist').click()

		cy.get('h5').should('have.text', 'Student Registration Form')
	})
})
