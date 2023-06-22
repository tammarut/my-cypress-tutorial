describe('Paginate todos with limit and skip (RESTful API Testing)', () => {
	it('should paginate todos limit=5 skip=0 successfully', () => {
		// Arrange
		const limit = 5
		const skip = 0
		const queryParams = new URLSearchParams({ limit: String(limit), skip: String(skip) })
		const url = 'https://dummyjson.com/todos' + '?' + queryParams.toString()
		// Act
		cy.request({
			method: 'GET',
			url: url,
		}).then((response) => {
			// Assert
			expect(response.status).to.equal(200)

			expect(response.headers).to.have.property('content-type')
			expect(response.headers['content-type']).to.contain('application/json')

			expect(response.body).to.be.an('object')
			expect(response.body).not.to.be.empty

			expect(response.body).to.have.property('total')
			expect(response.body).to.have.property('skip', skip)
			expect(response.body).to.have.property('limit', limit)
			expect(response.body).to.have.property('todos')
			expect(response.body.todos).to.be.an('array')
			expect(response.body.todos).to.have.length(limit)
		})
	})

	it('should paginate todos limit=5 skip=5 successfully', () => {
		// Arrange
		const limit = 5
		const skip = 5
		const queryParams = new URLSearchParams({ limit: String(limit), skip: String(skip) })
		const url = 'https://dummyjson.com/todos' + '?' + queryParams.toString()
		// Act
		cy.request({
			method: 'GET',
			url: url,
		}).then((response) => {
			// Assert
			expect(response.status).to.equal(200)

			expect(response.headers).to.have.property('content-type')
			expect(response.headers['content-type']).to.contain('application/json')

			expect(response.body).to.be.an('object')
			expect(response.body).not.to.be.empty

			expect(response.body).to.have.property('total')
			expect(response.body).to.have.property('skip', skip)
			expect(response.body).to.have.property('limit', limit)
			expect(response.body).to.have.property('todos')
			expect(response.body.todos).to.be.an('array')
			expect(response.body.todos).to.have.length(limit)
		})
	})
})
