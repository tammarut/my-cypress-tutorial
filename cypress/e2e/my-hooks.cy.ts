describe('template spec', () => {
	before(() => {
		cy.request('https://api.spacexdata.com/v3/missions').its('body').should('have.length.at.least', 10)
	})

	beforeEach(() => {
		cy.visit('/')
	})

	afterEach(() => {
		console.log('after each hook here!')
	})

	after(() => {
		console.log('after all run once!')
	})

	it('should render the correct H1 text', () => {
		cy.findByRole('heading', { name: 'Kitchen Sink' }).should('be.visible')
	})
})
