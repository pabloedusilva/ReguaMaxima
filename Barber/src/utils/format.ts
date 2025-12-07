// Format utilities

/**
 * Format a Brazilian phone number to (DDD) 00000-0000
 * Accepts inputs with or without non-digit chars and 10 or 11 digits.
 * - 11 digits: (xx) xxxxx-xxxx
 * - 10 digits: (xx) xxxx-xxxx
 * Fallback: returns the original input if cannot format.
 */
export function formatPhone(input: string): string {
	if (!input) return ''
	const digits = input.replace(/\D/g, '')
	if (digits.length < 10) return input

	const ddd = digits.slice(0, 2)
	if (digits.length >= 11) {
		const part1 = digits.slice(2, 7)
		const part2 = digits.slice(7, 11)
		return `(${ddd}) ${part1}-${part2}`
	} else {
		const part1 = digits.slice(2, 6)
		const part2 = digits.slice(6, 10)
		return `(${ddd}) ${part1}-${part2}`
	}
}
