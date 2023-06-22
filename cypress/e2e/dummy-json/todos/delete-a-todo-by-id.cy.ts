describe('Delete a todo by ID (RESTful API Testing)', () => {
	it('should delete a todo successfully', () => {
		// Arrange
		const id = 5

		// Act
		cy.request({
			method: 'DELETE',
			url: `https://dummyjson.com/todos/${id}`,
		}).then((response) => {
			// Assert
			expect(response.status).to.equal(200)
			expect(response.headers).to.have.property('content-type')
			expect(response.headers['content-type']).to.contain('application/json')
			expect(response.body).to.be.an('object')
			expect(response.body).not.to.be.empty
			expect(response.body).to.have.property('id', id)
			expect(response.body).to.have.property('isDeleted', true)
			expect(response.body).to.have.property('deletedOn')
		})
	})
})
