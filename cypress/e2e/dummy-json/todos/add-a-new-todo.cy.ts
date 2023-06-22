import { Todo } from './todo'

describe('Add a new todo (RESTful API Testing)', () => {
	it('should add a new todo successfully', () => {
		// Arrange
		const requestBody = {
			todo: 'Watch a YouTube',
			completed: false,
			userId: 48,
		} satisfies Todo

		// Act
		cy.request<Required<Todo>>({
			method: 'POST',
			url: 'https://dummyjson.com/todos/add',
			headers: { 'Content-Type': 'application/json' },
			body: requestBody,
		}).then((response) => {
			// Assert
			expect(response.status).to.equal(200)
			expect(response.headers).to.have.property('content-type')
			expect(response.headers['content-type']).to.contain('application/json')
			expect(response.body).to.be.an('object')
			expect(response.body).not.to.be.empty
			expect(response.body).to.have.property('id')
		})
	})
})
