import { existsSync } from "fs"
import emoteMap from "./emotehashmap.json"
import eventMap from "./eventhashmap.json"
process.chdir("./emote_compiler")

type ApiEmote = {
	id: number,
	name: string,
	inventoryIcon: string,
	description: string
}

const api: ApiEmote[] = await fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-emotes.json").then(r => r.json())

function emoteFromID(emoteID: string | number) {
	emoteID = Number(emoteID)
	return api.find(v => v.id === emoteID)
}

function wavFromID(emoteID: string | number) {
	const hash = emoteMap[emoteID.toString()]?.hash
	const event = eventMap[hash]
	const dir = `.\\bin\\wwiser\\txtp\\${event}.txtp.wav`
	if (existsSync(dir))
		return dir
}

function pngFromID(emoteID: string | number) {
	// https://raw.communitydragon.org/latest/game
	const baseURL = "https://raw.communitydragon.org/latest/game"
	const iconURL = emoteFromID(emoteID)?.inventoryIcon.toLowerCase() // "/lol-game-data/assets/ASSETS/Loadouts/SummonerEmotes/Flairs/MCat_Sad_Tear_Inventory.png"
	const fragment = iconURL?.startsWith("/lol-game-data/assets/") && iconURL.substring("/lol-game-data/assets/".length)
	if (iconURL)
		return `${baseURL}/${fragment}`
	/// assets/loadouts/summoneremotes/flairs/em_bee_angry_inventory.png

}

const emotes_to_statically_generate = api.map(emote => {
	const png = pngFromID(emote.id)
	const wav = wavFromID(emote.id)

	return {
		hasSFX: wav !== undefined,
		// sfx:
	}
})

console.log(pngFromID(4668))
console.log(wavFromID(4668))
console.log(emotes_to_statically_generate)