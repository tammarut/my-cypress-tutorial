import { CURAHealthcarePage, FACILITY, HEALTHCARE_PROGRAM } from './cura-healthcare.page'

describe('CURA Healthcare Service', () => {
	const USERNAME = Cypress.env('CURA_HEALTHCARE_USERNAME')
	const PASSWORD = Cypress.env('CURA_HEALTHCARE_PASSWORD')

	it('should landing page successfully', () => {
		// Arrange
		const curaHealthcarePage = new CURAHealthcarePage()
		// Act
		curaHealthcarePage.goToHomePage()

		// Assert
		curaHealthcarePage.tabTitle.should('equal', 'CURA Healthcare Service')
		cy.findByRole('banner').within(() => {
			cy.findByRole('heading', { name: /cura healthcare service/i }).should('be.visible')
			cy.findByRole('link', { name: 'Make Appointment' })
				.should('be.visible')
				.and('have.attr', 'href')
				.and('include', './profile.php#login')
		})
		curaHealthcarePage.hamburgerMenu.should('be.visible')
		curaHealthcarePage.sidebarNavigation.should('not.be.visible')
	})

	it('When click Make Appointment button, it should go to login page', () => {
		// Arrange
		const curaHealthcarePage = new CURAHealthcarePage()

		// Act
		curaHealthcarePage.goToHomePage()
		curaHealthcarePage.clickMakeAppointmentButton()

		// Assert
		cy.location('pathname').should('equal', '/profile.php')
		cy.location('hash').should('equal', '#login')

		cy.findByRole('heading', { name: 'Login', level: 2 }).should('be.visible')
		cy.get('.form-horizontal').within(() => {
			cy.findByRole('textbox', { name: /username/i }).should('be.visible')
			cy.findByLabelText(/password/i).should('be.visible')
			cy.findByRole('button', { name: 'Login' }).should('be.visible')
		})
	})

	it('should login as Username=John Doe successfully', () => {
		// Arrange
		const curaHealthcarePage = new CURAHealthcarePage()
		curaHealthcarePage.goToLoginPage()

		// Act
		curaHealthcarePage.fillInUsername(USERNAME)
		curaHealthcarePage.fillInPassword(PASSWORD)
		curaHealthcarePage.clickLoginButton()

		// Assert
		cy.location('hash').should('equal', '#appointment')
	})

	it('should make a appointment successfully', () => {
		// Arrange
		const facility = FACILITY.SEOUL_CURA
		const healthcareProgram = HEALTHCARE_PROGRAM.NONE

		const visitDate = '10/06/2023'
		const comment = 'Yoyo alice in borderland'

		const curaHealthcarePage = new CURAHealthcarePage()
		curaHealthcarePage.goToLoginPage()
		curaHealthcarePage.fillInUsername(USERNAME)
		curaHealthcarePage.fillInPassword(PASSWORD)
		curaHealthcarePage.clickLoginButton()

		// Resize window to 2111 x 1105
		cy.viewport(2000, 1105)

		// Act
		curaHealthcarePage.selectFacility(facility)
		curaHealthcarePage.checkApplyHospitalReadmission()
		curaHealthcarePage.chooseHealthcareProgram(healthcareProgram)
		curaHealthcarePage.selectVisitDateOnCalendar(visitDate)
		curaHealthcarePage.fillInComment(comment)
		curaHealthcarePage.submitBookAppointment()

		// Assert
		curaHealthcarePage.appointmentConfirmation(facility, healthcareProgram, visitDate, comment)
	})

	it('Hamburger menu after logged in should be correct', () => {
		// Arrange
		const curaHealthcarePage = new CURAHealthcarePage()
		curaHealthcarePage.goToLoginPage()
		curaHealthcarePage.fillInUsername(USERNAME)
		curaHealthcarePage.fillInPassword(PASSWORD)
		curaHealthcarePage.clickLoginButton()

		// Act
		curaHealthcarePage.hamburgerMenu.should('be.visible').click()

		// Assert
		curaHealthcarePage.sidebarNavigation.should('be.visible')
		curaHealthcarePage.sidebarNavigation.within(() => {
			cy.findAllByRole('listitem').should('exist').should('have.length.at.least', 4)

			cy.findByRole('link', { name: 'Home' }).should('be.visible').and('have.attr', 'href').and('equal', './')
			cy.findByRole('link', { name: 'History' })
				.should('be.visible')
				.and('have.attr', 'href')
				.and('equal', 'history.php#history')
			cy.findByRole('link', { name: 'Profile' })
				.should('be.visible')
				.and('have.attr', 'href')
				.and('equal', 'profile.php#profile')
			cy.findByRole('link', { name: 'Logout' })
				.should('be.visible')
				.and('have.attr', 'href')
				.and('equal', 'authenticate.php?logout')
		})
	})

	it('After I submit a book appointment, it should append history record', () => {
		// Arrange
		const curaHealthcarePage = new CURAHealthcarePage()
		curaHealthcarePage.goToLoginPage()
		curaHealthcarePage.fillInUsername(USERNAME)
		curaHealthcarePage.fillInPassword(PASSWORD)
		curaHealthcarePage.clickLoginButton()

		const facility = FACILITY.SEOUL_CURA
		const healthcareProgram = HEALTHCARE_PROGRAM.NONE

		const visitDate = '10/06/2023'
		const comment = 'Yoyo alice in borderland'

		// Act
		cy.viewport(2000, 1105)
		curaHealthcarePage.selectFacility(facility)
		curaHealthcarePage.checkApplyHospitalReadmission()
		curaHealthcarePage.chooseHealthcareProgram(healthcareProgram)
		curaHealthcarePage.selectVisitDateOnCalendar(visitDate)
		curaHealthcarePage.fillInComment(comment)
		curaHealthcarePage.submitBookAppointment()

		curaHealthcarePage.hamburgerMenu.should('be.visible').click()
		curaHealthcarePage.sidebarNavigation.within(() => {
			cy.findByRole('link', { name: 'History' }).should('be.visible').click()
		})
		// Assert
		cy.location('pathname').should('equal', '/history.php')
		cy.location('hash').should('equal', '#history')

		cy.findByRole('heading', { name: /history/i, level: 2 }).should('be.visible')

		cy.get('.panel')
			.should('be.visible')
			.within(() => {
				cy.get('.panel-heading').should('be.visible').should('have.text', visitDate)

				cy.get('.panel-body').should('be.visible')
				cy.findByText(facility).should('be.visible')
				cy.findByText('Yes').should('be.visible')
				cy.findByText(healthcareProgram).should('be.visible')
				cy.findByText(comment).should('be.visible')
			})
		cy.findByRole('link', { name: /go to homepage/i })
			.should('be.visible')
			.and('have.attr', 'href')
			.and('equal', CURAHealthcarePage.URL + '/')
	})

	it('When go to profile page, it should navigate to profile page correctly', () => {
		// Arrange
		const curaHealthcarePage = new CURAHealthcarePage()
		curaHealthcarePage.goToLoginPage()
		curaHealthcarePage.fillInUsername(USERNAME)
		curaHealthcarePage.fillInPassword(PASSWORD)
		curaHealthcarePage.clickLoginButton()

		// Act
		curaHealthcarePage.hamburgerMenu.should('be.visible').click()
		curaHealthcarePage.sidebarNavigation.within(() => {
			cy.findByRole('link', { name: 'Profile' }).should('be.visible').click()
		})

		// Assert
		cy.location('pathname').should('equal', '/profile.php')
		cy.location('hash').should('equal', '#profile')
		cy.findByRole('heading', { name: 'Profile', level: 2 }).should('be.visible')
	})

	it('When I logout, it should go to home page and I need to login again', () => {
		// Arrange
		const curaHealthcarePage = new CURAHealthcarePage()
		curaHealthcarePage.goToLoginPage()
		curaHealthcarePage.fillInUsername(USERNAME)
		curaHealthcarePage.fillInPassword(PASSWORD)
		curaHealthcarePage.clickLoginButton()

		// Act
		curaHealthcarePage.hamburgerMenu.should('be.visible').click()
		curaHealthcarePage.sidebarNavigation.within(() => {
			cy.findByRole('link', { name: 'Logout' }).should('be.visible').click()
		})

		// Assert
		cy.url().should('equal', `${CURAHealthcarePage.URL}/`)
		cy.findByRole('banner').within(() => {
			cy.findByRole('heading', { name: /cura healthcare service/i }).should('be.visible')
			cy.findByRole('link', { name: 'Make Appointment' }).should('be.visible').click()
		})

		cy.location('pathname').should('equal', '/profile.php')
		cy.location('hash').should('equal', '#login')
	})
})
