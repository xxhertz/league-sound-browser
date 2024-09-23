import type { Writable } from "svelte/store"
import { writable } from "svelte/store"
import type { EmoteData } from "../../../emote_compiler/shared"

export const history = writable<EmoteData[]>([])
export const selected = writable<EmoteData[]>([])

export function add(store: Writable<EmoteData[]>, value: EmoteData) {
	store.update(prev => {
		if (prev.includes(value))
			return [value, ...prev.filter(v => v !== value)]

		return [value, ...prev]
	})
}

export function toggle(store: Writable<EmoteData[]>, value: EmoteData) {
	store.update(prev => {
		if (prev.includes(value))
			return prev.filter(v => v !== value)

		return [value, ...prev]
	})
}