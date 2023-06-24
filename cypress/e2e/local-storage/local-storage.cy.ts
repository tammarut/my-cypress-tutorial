describe('LocalStorage', () => {
	it('should seedLocalStorage successfully', () => {
		cy.visit('https://example.cypress.io/commands/storage')

		cy.findByRole('button', { name: /populate localstorage and sessionstorage/i })
			.should('be.visible')
			.and('be.enabled')
			.click()

		cy.seedLocalStorage('city', 'Tokyo')

		cy.window().then((window) => {
			const city = window.localStorage.getItem('city')
			expect(city).to.equal('Tokyo')
		})

		// clearAllLocalStorage() yields null
		cy.clearAllLocalStorage().should(() => {
			expect(sessionStorage.getItem('prop1')).to.be.null
			expect(sessionStorage.getItem('prop2')).to.be.null
			expect(sessionStorage.getItem('prop3')).to.be.null
			expect(sessionStorage.getItem('city')).to.be.null
		})
	})
})
