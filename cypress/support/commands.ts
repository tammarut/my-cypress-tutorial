import '@testing-library/cypress/add-commands'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ───────────── Custom commands ────────────
Cypress.Commands.add('seedLocalStorage', (key: string, value: string) => {
	Cypress.log({
		// $el: jQuery element for the command if it exists
		name: 'seedLocalStorage',
		displayName: 'seedLocalStorage',
		message: `key: ${key}, value: ${value}`,
		consoleProps: () => {
			return {
				Key: key,
				Value: value,
				'Local Storage': window.localStorage,
			}
		},
	})

	localStorage.setItem(key, value)
})

Cypress.Commands.add('setLocalStorage', (key, value) => {
	cy.window().then((window) => {
		window.localStorage.setItem(key, value)
	})
})

Cypress.Commands.add('getALocalStorage', (key) => {
	cy.window().then((window) => window.localStorage.getItem(key))
})

// Cypress.Commands.overwrite('type', (originalFunc, element, text, options) => {
// 	if (options && options.sensitive) {
// 		options.log = false

// 		Cypress.log({ $el: element, name: 'type', message: '*'.repeat(text.length) })
// 	}

// 	return originalFunc(element, text, options)
// })
