describe('Location', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should have title Swag Labs', () => {
		cy.title().should('equal', 'Cypress.io: Kitchen Sink')
	})

	it('URL should be https://example.cypress.io', () => {
		cy.url().should('equal', 'https://example.cypress.io/')
	})

	it('should be HTTPS', () => {
		cy.location('protocol').should('equal', 'https:')
	})

	it('the hostname should be example.cypress.io', () => {
		cy.location('hostname').should('equal', 'example.cypress.io')
	})

	it('commands/querying and cy.contains()', () => {
		// Click on <a> "get"
		cy.get('.home-list > li li:nth-child(1) > [href="/commands/querying"]').click()

		cy.location('pathname').should('equal', '/commands/querying')

		cy.findByRole('heading', { name: /cy\.contains\(\)/i }).scrollIntoView({ offset: { top: -100, left: 0 }, duration: 100 })

		// Click on <ul> "apples oranges bananas mo..."
		cy.get('.query-list > li').should('have.length', 4)

		// Click on <button> "Save Form"
		cy.findByRole('button', { name: 'Save Form' }).should('exist')
		cy.findByRole('button', { name: 'Save Form' }).click()
	})

	it('commands/querying and cy.within()', () => {
		// Click on <a> "get"
		cy.get('.home-list > li li:nth-child(1) > [href="/commands/querying"]').click()

		cy.location('pathname').should('equal', '/commands/querying')

		cy.findByRole('heading', { name: /\.within\(\)/i }).scrollIntoView({ offset: { top: -100, left: 0 }, duration: 100 })

		cy.findByPlaceholderText('Name').should('be.visible').and('have.value', '')

		// Form Email/Password
		cy.get('.query-form').within(() => {
			cy.findByPlaceholderText('Email').should('exist')
			cy.findByPlaceholderText('Email').click()
			cy.findByPlaceholderText('Email').type('mugen@gmail.com')
			cy.findByPlaceholderText('Email').should('have.value', 'mugen@gmail.com')

			cy.findByPlaceholderText('Password').should('exist')
			cy.findByPlaceholderText('Password').click()
			cy.findByPlaceholderText('Password').type('super_secret')
			cy.findByPlaceholderText('Password').should('have.value', 'super_secret')
		})
	})
})
