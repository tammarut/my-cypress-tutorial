module.exports = {
	root: true,
	env: { 'cypress/globals': true },
	plugins: ['eslint-plugin-cypress', 'chai-friendly'],
	extends: ['plugin:cypress/recommended', 'plugin:chai-friendly/recommended'],
}
