import { Todo } from './todo'

describe('Get a single todo by ID (RESTful API Testing)', () => {
	it('should get a todo by ID successfully', () => {
		// Arrange
		const id = 40
		// Act
		cy.request<Todo>({
			method: 'GET',
			url: `https://dummyjson.com/todos/${id}`,
		}).then((response) => {
			// Assert
			expect(response.status).to.equal(200)
			expect(response.headers).to.have.property('content-type')
			expect(response.headers['content-type']).to.contain('application/json')
			expect(response.body).to.be.an('object')
			expect(response.body).not.to.be.empty
			expect(response.body).to.have.property('id', id)
		})
	})
})
