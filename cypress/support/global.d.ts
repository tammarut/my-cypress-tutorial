import { ConfigEnvironmentSchema } from '../../cypress.config'

declare global {
	namespace Cypress {
		interface Cypress {
			env<T extends keyof ConfigEnvironmentSchema>(key: T): ConfigEnvironmentSchema[T]
		}

		interface Chainable {
			/**
			 * Custom command that seeds local storage with the following params:
			 * @param key
			 * @param value
			 */
			seedLocalStorage(key: string, value: string): Chainable

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
