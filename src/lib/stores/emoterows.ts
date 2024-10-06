import { writable } from "svelte/store"
import type { EmoteData } from "../../../emote_compiler/shared"

export const emoteRows = writable<EmoteData[][]>()