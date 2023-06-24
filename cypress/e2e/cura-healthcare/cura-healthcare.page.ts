type ValueOf<T> = T[keyof T]

export const FACILITY = {
	TOKYO_CURA: 'Tokyo CURA Healthcare Center',
	HONGKONG_CURA: 'Hongkong CURA Healthcare Center',
	SEOUL_CURA: 'Seoul CURA Healthcare Center',
} as const
type Facility = ValueOf<typeof FACILITY>

export const HEALTHCARE_PROGRAM = {
	MEDICARE: 'Medicare',
	MEDICAID: 'Medicaid',
	NONE: 'None',
} as const
type HealthcareProgram = ValueOf<typeof HEALTHCARE_PROGRAM>

export class CURAHealthcarePage {
	public static readonly URL = 'https://katalon-demo-cura.herokuapp.com'

	get tabTitle() {
		return cy.title()
	}

	get hamburgerMenu() {
		return cy.get('#menu-toggle')
	}

	get sidebarNavigation() {
		return cy.findByRole('navigation')
	}

	goToHomePage() {
		cy.visit(CURAHealthcarePage.URL)
	}

	clickMakeAppointmentButton() {
		cy.findByRole('banner').within(() => {
			cy.findByRole('link', { name: 'Make Appointment' }).should('be.visible').click()
		})
	}

	// ════════════════════════
	// Login page
	// ════════════════════════
	goToLoginPage() {
		cy.visit(CURAHealthcarePage.URL + '/profile.php#login')
	}

	fillInUsername(username: string) {
		cy.findByRole('textbox', { name: /username/i })
			.should('be.visible')
			.type(username)
	}

	fillInPassword(password: string) {
		cy.findByLabelText(/password/i)
			.should('be.visible')
			.type(password)
	}

	clickLoginButton() {
		cy.findByRole('button', { name: 'Login' }).should('be.visible').click()
	}

	// ════════════════════════
	// Make Appointment page
	// ════════════════════════
	selectFacility(option: Facility) {
		cy.findByRole('combobox', { name: /facility/i })
			.should('be.visible')
			.select(option)
	}

	checkApplyHospitalReadmission() {
		cy.findByRole('checkbox', { name: /apply for hospital readmission/i })
			.should('be.visible')
			.click()
	}

	chooseHealthcareProgram(program: HealthcareProgram) {
		cy.findByRole('radio', { name: program, exact: true }).should('be.visible').click()
	}

	selectVisitDateOnCalendar(visitDate: string) {
		cy.findByRole('textbox', { name: /visit date \(required\)/i }).click()
		cy.findByRole('textbox', { name: /visit date \(required\)/i }).type(visitDate)

		// Select on the Date picker
		// Click on <td> "10"
		// cy.findByRole('cell', { name: /10/i }).click()
	}

	fillInComment(comment: string) {
		cy.findByRole('textbox', { name: /comment/i })
			.should('be.visible')
			.type(comment)
	}

	submitBookAppointment() {
		cy.findByRole('button', { name: /book appointment/i })
			.should('be.visible')
			.and('be.enabled')
			.click()
	}

	// ════════════════════════
	// Appointment Confirmation page
	// ════════════════════════
	appointmentConfirmation(facility: Facility, healthcareProgram: HealthcareProgram, visitDate: string, comment: string) {
		cy.location('pathname').should('equal', '/appointment.php')
		cy.location('hash').should('equal', '#summary')

		cy.findByRole('heading', { name: 'Appointment Confirmation' }).should('be.visible')

		cy.get('#facility').should('have.text', facility)
		cy.get('#hospital_readmission').should('have.text', 'Yes')
		cy.get('#program').should('have.text', healthcareProgram)
		cy.get('#visit_date').should('have.text', visitDate)
		cy.get('#comment').should('have.text', comment)

		cy.findByRole('link', { name: /go to homepage/i })
			.should('be.visible')
			.and('have.attr', 'href')
			.and('equal', CURAHealthcarePage.URL + '/')
	}
}
