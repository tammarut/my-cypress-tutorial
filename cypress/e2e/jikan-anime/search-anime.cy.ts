describe('Searching an anime (UI)', () => {
	it('When search anime name "devilman", it should return anime correctly', () => {
		// Arrange
		const targetAnimeName = 'devilman'
		// Load "https://jikan.moe/"
		cy.visit('https://jikan.moe/')

		// Act
		// Search input box
		cy.findByPlaceholderText('search for an anime, e.g Naruto')
			.should('be.visible')
			.click()
			.type(targetAnimeName)
			.type('{Enter}')

		// Assert
		// Click on <img> [alt="Devilman: Crybaby"]
		cy.findByAltText('Devilman: Crybaby').should('be.visible')

		cy.get('#search_results')
			.find('.card__name > span')
			.each((animeName) => {
				expect(animeName.text().toLowerCase()).to.contain(targetAnimeName)
			})
	})
})
