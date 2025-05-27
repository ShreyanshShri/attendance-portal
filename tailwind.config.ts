/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}", // ✅ App Router
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}", // optional, if using Pages Router too
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
