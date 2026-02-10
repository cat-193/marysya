export function getFioShort(name?: string, surname?: string): string {
	if (!name && !surname) {
		return 'NN';
	}

	const nameInitial = name ? name.charAt(0).toUpperCase() : '';
	const surnameInitial = surname ? surname.charAt(0).toUpperCase() : '';

	return `${nameInitial}${surnameInitial}`;
}
