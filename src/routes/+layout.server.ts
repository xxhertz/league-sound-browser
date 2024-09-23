import type { LayoutServerLoad } from './$types'
import type { ApiEmote, EmoteData } from "./../../emote_compiler/shared"
import fs from 'fs'
import path from 'path'
export const load: LayoutServerLoad = async () => {
	const data: ApiEmote[] = JSON.parse(fs.readFileSync(path.resolve('static/finalized/api.json'), 'utf-8'))
	const emoteData: EmoteData[] = data.map(emote => {
		const ogg = path.resolve("static/finalized", `${emote.id.toString()}.ogg`)
		const webp = path.resolve("static/finalized", `${emote.id.toString()}.webp`)
		return {
			...emote,
			ogg,
			webp,
			hasOgg: fs.existsSync(ogg),
			hasWebp: fs.existsSync(webp)
		}
	}).filter(emote => {
		return emote.hasWebp && emote.name !== "" && emote.inventoryIcon !== "/lol-game-data/assets/" && fs.statSync(emote.webp).size > 0
	})

	return {
		api: emoteData//.slice(0, 128), // remove slice after adding virtualization
	}
}
