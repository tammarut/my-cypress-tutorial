import example from '../fixtures/example.json'

describe('template spec', () => {
	beforeEach(function () {
		cy.fixture('example').then((exampleFixture) => {
			this.exampleFixture = exampleFixture
		})
	})

	it('should pull data from a fixture', () => {
		cy.fixture('example').then((data) => {
			cy.log('data', data)
			expect(example, 'the same data').to.deep.equal(data)
		})
	})

	it('should return a fixture instead of real', function () {
		cy.visit('/commands/network-requests')

		cy.findByRole('heading', { name: /cy\.intercept\(\)/i }).scrollIntoView({ duration: 200 })

		cy.intercept('GET', '**/comments/*', this.exampleFixture).as('myComment')
		cy.findByRole('button', { name: 'Get Comment' }).should('be.visible').click()

		cy.wait('@myComment').then((response) => {
			cy.log('🚀 ~ file: my-fixtures.cy.js:25 ~ cy.wait ~ response:', response)
		})
	})

	it('should set a token in Local storage and get correctly', () => {
		// Arrange
		const myToken = 'footoken01'
		// Act
		// Assert
		cy.setLocalStorage('my_token', myToken)
		cy.getALocalStorage('my_token').should('eq', myToken)
	})

	it('should overwrite the type command by using sensitive characters', () => {
		cy.visit('/commands/actions')

		cy.findByPlaceholderText('Email').type('alice@gmail.com')
	})
})
