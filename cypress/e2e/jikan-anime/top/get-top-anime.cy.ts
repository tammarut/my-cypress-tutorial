describe('Top Anime (RESTful API Testing)', () => {
	it('Get top anime with default query params', () => {
		cy.request({ method: 'GET', url: 'https://api.jikan.moe/v4/top/anime' }).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.headers).to.have.property('content-type', 'application/json')
			expect(response.body).to.be.an('object')

			expect(response.body).to.have.property('pagination')
			expect(response.body.pagination).to.be.an('object')

			expect(response.body).to.have.property('data')
			expect(response.body.data).to.be.an('array')
			expect(response.body.data).not.to.be.empty
		})
	})

	it('Get top anime with query params limit = 5', () => {
		// Arrange
		const limit = 5

		// Act
		cy.request({ method: 'GET', url: 'https://api.jikan.moe/v4/top/anime', qs: { limit: limit } }).then((response) => {
			// Assert
			expect(response.status).to.equal(200)
			expect(response.headers).to.have.property('content-type', 'application/json')

			expect(response.body).to.be.an('object')
			expect(response.body).to.have.property('pagination')
			expect(response.body.pagination).to.be.an('object')
			expect(response.body.pagination.current_page).to.equal(1)

			expect(response.body).to.have.property('data')
			expect(response.body.data).to.be.an('array')
			expect(response.body.data).not.to.be.empty
			expect(response.body.data).have.length(limit)
		})
	})

	it('Get top anime with query params type = tv', () => {
		// Arrange
		const page = 1
		const limit = 5
		const animeType = 'tv'

		// Act
		cy.request({
			method: 'GET',
			url: 'https://api.jikan.moe/v4/top/anime',
			qs: { page: page, limit: limit, type: animeType },
		}).then((response) => {
			// Assert
			expect(response.status).to.equal(200)
			expect(response.headers).to.have.property('content-type', 'application/json')

			expect(response.body.data).not.to.be.empty
			expect(response.body.data).have.length(limit)

			// Assert all anime are type = "TV"
			response.body.data.forEach((anime) => {
				expect(anime.type).to.equal('TV')
			})
		})
	})

	it('Get top anime with query params filter = airing', () => {
		// Arrange
		const page = 1
		const limit = 5
		const filter = 'airing'

		// Act
		cy.request({
			method: 'GET',
			url: 'https://api.jikan.moe/v4/top/anime',
			qs: { page: page, limit: limit, filter: filter },
		}).then((response) => {
			// Assert
			expect(response.status).to.equal(200)
			expect(response.headers).to.have.property('content-type', 'application/json')

			expect(response.body.data).not.to.be.empty
			expect(response.body.data).have.length(limit)

			// Assert all anime are airing = true
			response.body.data.forEach((anime) => {
				expect(anime.airing).to.be.true
			})
		})
	})
})
