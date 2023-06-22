declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command to set a value in localStorage.
			 * @example cy.setLocalStorage('key', 'value')
			 */
			setLocalStorage(key: string, value: string): Chainable

			/**
			 * Custom command to get a value from localStorage.
			 * @example cy.getALocalStorage('key')
			 */
			getALocalStorage(key: string): Chainable<string>
		}
	}
}

export {}
