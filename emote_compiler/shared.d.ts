export type ApiEmote = {
	id: number
	name: string
	inventoryIcon: string
	description: string
}

export type EmoteData = ApiEmote & {
	hasOgg: boolean
	hasWebp: boolean
}