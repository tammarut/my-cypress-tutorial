describe('Cookies', () => {
	it('should retrieve a specific cookie', () => {
		// Arrange
		cy.setCookie('titan', 'Eren', { httpOnly: true })

		// Act
		cy.getCookie('titan')
			.should('not.be.null')
			.should((cookie) => {
				// Assert
				expect(cookie?.name).to.equal('titan')
				expect(cookie?.value).to.equal('Eren')
			})
	})

	it('should retrieve all cookies', () => {
		// Arrange
		cy.setCookie('titan', 'Eren', { httpOnly: true })

		cy.visit('https://example.cypress.io/commands/cookies')

		// Act
		cy.findAllByRole('button', { name: /set cookie/i })
			.first()
			.should('be.visible')
			.click()

		// Assert
		cy.getAllCookies()
			.should('have.length', 2)
			.should((cookies) => {
				expect(cookies[0]).to.have.property('name', 'titan')
				expect(cookies[0]).to.have.property('value', 'Eren')

				expect(cookies[1]).to.have.property('name', 'token')
				expect(cookies[1]).to.have.property('value', '123ABC')
			})
	})

	it('should remove a specific cookie', () => {
		// Arrange
		cy.setCookie('titan', 'Reiner', { httpOnly: true })

		cy.getCookie('titan')
			.should('not.be.null')
			.then((cookie) => {
				expect(cookie?.value).to.equal('Reiner')
			})

		// Act
		cy.clearCookie('titan')

		// Assert
		cy.getCookie('titan').should('be.null')
	})

	it('should clear all cookies', () => {
		// Arrange
		cy.setCookie('titan', 'Reiner', { httpOnly: true })
		cy.setCookie('token', 'Solo', { httpOnly: true })

		cy.getAllCookies().should('have.length', 2)

		// Act
		cy.clearAllCookies()

		// Assert
		cy.getAllCookies().should('be.empty')
	})
})
