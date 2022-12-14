/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		screens: {
			md: '1060px',
			medium: '1060px',
			// lg: '1100px',
		},
	},
	plugins: [require('daisyui')],

	daisyui: {
		themes: ['night'],
	},
};
