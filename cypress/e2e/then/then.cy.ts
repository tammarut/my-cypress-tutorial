describe('.then command', { baseUrl: 'https://swapi.dev/api' }, () => {
	let peopleName: string

	before(() => {
		cy.request({ method: 'GET', url: '/people' }).then((response) => {
			peopleName = response.body.results[3].name
		})
	})

	it('should utilize the request from the before block and input the name', () => {
		// Arrange
		cy.visit('https://example.cypress.io/commands/actions')

		// Act
		cy.findByRole('textbox', { name: /full name/i }).type(peopleName)
	})

	it('should chain .then to a DOM element and manipulate it', () => {
		cy.visit('https://example.cypress.io/commands/actions')

		cy.findByRole('heading', { level: 1 }).then((h1) => {
			cy.log(h1.text().toLocaleLowerCase())
		})
	})
})
