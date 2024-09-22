// place files you want to import through the `$lib` alias in this folder.
export function download(href: string, name: string) {
	const link = document.createElement("a")
	link.download = name
	link.href = href
	link.click()
}