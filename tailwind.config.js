/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	content: ['./src/**/*.{html,svelte,js,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
