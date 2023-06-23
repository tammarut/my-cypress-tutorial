import { Todo } from './todo'

interface Response {
	todos: Todo[]
	total: number
	skip: number
	limit: number
}

describe('Get all todos (RESTful API Testing)', () => {
	const dummyjsonUrl = Cypress.env('DUMMYJSON_URL')

	it('should get all todos successfully', () => {
		// Arrange
		// Act
		cy.request<Response>({
			method: 'GET',
			url: dummyjsonUrl + '/todos',
		}).then((response) => {
			// Assert
			expect(response.status).to.equal(200)

			expect(response.headers).to.have.property('content-type')
			expect(response.headers['content-type']).to.contain('application/json')

			expect(response.body).to.be.an('object')
			expect(response.body).not.to.be.empty

			expect(response.body).to.have.property('total')
			expect(response.body).to.have.property('skip', 0)
			expect(response.body).to.have.property('limit')
			expect(response.body).to.have.property('todos')
			expect(response.body.todos).to.be.an('array')
		})
	})
})
