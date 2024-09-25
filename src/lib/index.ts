// place files you want to import through the `$lib` alias in this folder.
async function hrefToBase64(href: string): Promise<string | undefined> {
	const data = await fetch(href).then(res => res.blob())
	return new Promise((resolve) => {
		const reader = new FileReader()
		reader.onload = () => resolve(reader.result?.toString())
		reader.readAsDataURL(data)
	})
}

export async function download(href: string, name: string) {
	const link = document.createElement("a")
	link.download = name
	const data = await hrefToBase64(href)
	if (!data)
		return

	link.href = data
	link.target = "_blank"
	link.title = name
	link.click()
}