import type { Writable } from "svelte/store"
import { writable } from "svelte/store"

export const history = writable<number[]>([])
export const selected = writable<number[]>([])

export function add(store: Writable<number[]>, value: number) {
	store.update(prev => {
		if (prev.includes(value))
			return [value, ...prev.filter(v => v !== value)]

		return [value, ...prev]
	})
}

export function toggle(store: Writable<number[]>, value: number) {
	store.update(prev => {
		if (prev.includes(value))
			return prev.filter(v => v !== value)

		return [value, ...prev]
	})
}