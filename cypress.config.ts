import { defineConfig } from 'cypress'
import dotenv from 'dotenv'

export interface ConfigEnvironmentSchema {
	readonly DUMMYJSON_URL: string
	readonly CURA_HEALTHCARE_USERNAME: string
	readonly CURA_HEALTHCARE_PASSWORD: string
}

dotenv.config()

export default defineConfig({
	env: {
		...process.env,
	},
	e2e: {
		baseUrl: 'https://example.cypress.io',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
})
