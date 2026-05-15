/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'alpha-value-notation': null,
		'color-function-notation': 'modern',

		'selector-max-id': 1,
		'selector-class-pattern': [
			'^[a-z]([a-z0-9-]+)?(__[a-z0-9-]+)?(--[a-z0-9-]+)?$',
			{
				message: 'Используйте BEM: block__element--modifier',
			},
		],

		'unit-allowed-list': ['%', 'deg', 'rem', 'ms', 'dvh', 'px', 's'],

		'scss/dollar-variable-pattern': '^[a-z]+(-[a-z0-9]+)*$',
		'scss/at-extend-no-missing-placeholder': true,
		'function-name-case': [
			'lower',
			{
				ignoreFunctions: ['/^[a-z]+[A-Z][a-z]+/'],
			},
		],
	},

	defaultSeverity: 'warning',
};
