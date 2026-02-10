/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'alpha-value-notation': null,
		'color-function-notation': 'modern',

		'selector-max-id': 1,
		'selector-class-pattern': '^[a-z]+(-[a-z0-9]+)*$',

		'unit-allowed-list': ['%', 'deg', 'rem', 'ms', 'dvh', 'px', 's'],

		'scss/dollar-variable-pattern': '^[a-z]+(-[a-z0-9]+)*$',
		'scss/at-extend-no-missing-placeholder': true,
	},
	defaultSeverity: 'warning',
};
