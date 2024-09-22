// https://www.youtube.com/watch?v=lrzHaTcpRh8
import { writable } from "svelte/store"
import type { EmoteData } from "../../../emote_compiler/shared"

type SearchData = { data: EmoteData[], filtered: EmoteData[], search: string }

export const searchStore = writable<SearchData>({
	data: [],
	filtered: [],
	search: ""
})

export const searchHandler = (model: SearchData) => {
	const searchTerm = model.search.toLowerCase() || ""
	model.filtered = model.data.filter(item => item.name.toLowerCase().includes(searchTerm))
}