import { Todo } from './todo'

describe('Update a todo by ID (RESTful API Testing)', () => {
	const dummyjsonUrl = Cypress.env('DUMMYJSON_URL')

	it('should update a todo completed=true successfully', () => {
		// Arrange
		const id = 2
		const requestBody = {
			completed: true,
		} satisfies Partial<Todo>

		// Act
		cy.request<Required<Todo>>({
			method: 'PUT',
			url: dummyjsonUrl + `/todos/${id}`,
			headers: { 'Content-Type': 'application/json' },
			body: requestBody,
		}).then((response) => {
			// Assert
			expect(response.status).to.equal(200)
			expect(response.headers).to.have.property('content-type')
			expect(response.headers['content-type']).to.contain('application/json')
			expect(response.body).to.be.an('object')
			expect(response.body).not.to.be.empty
			expect(response.body).to.have.property('id', id)
			expect(response.body.completed).to.equal(requestBody.completed)
		})
	})
})
