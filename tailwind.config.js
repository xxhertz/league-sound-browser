/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: { // https://coolors.co/564787-b4adea-080c0b-faf3dd-c1292e
				ultraviolet: "#564787", // maybe an outline on periwinkle elements
				periwinkle: "#B4ADEA", // play button, maybe interactables
				night: "#080C0B", // background
				eggshell: "#FAF3DD", // text color
				enginered: "#C1292E" // clear search button? patreon button? idk
			}
		}
	},
	plugins: [],
}

