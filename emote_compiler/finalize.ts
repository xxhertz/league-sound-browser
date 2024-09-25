import { ApiEmote } from "./shared"
import emoteMap from "./emotehashmap.json"
import eventMap from "./eventhashmap.json"
import { copyFileSync, cpSync, existsSync, mkdirSync, writeFileSync } from "fs"
import { spawn } from "child_process"
const mkDirSyncIfNotExist = (foldername: string) => !existsSync(foldername) && mkdirSync(foldername)

process.chdir("./emote_compiler")


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

	if (iconURL === "/lol-game-data/assets/")
		return

	if (iconURL)
		return `${baseURL}/${fragment}`
	/// assets/loadouts/summoneremotes/flairs/em_bee_angry_inventory.png

}

// downloaded / extracted
mkDirSyncIfNotExist("png")
mkDirSyncIfNotExist("wav")
// converted by ffmpeg
mkDirSyncIfNotExist("finalized")

const final_api = api.map(emote => {
	if (emote.name === "")
		return

	const png = pngFromID(emote.id)
	if (png === undefined || png === "https://raw.communitydragon.org/latest/game/")
		return

	const wav = wavFromID(emote.id)

	if (wav && !existsSync(`./finalized/${emote.id}.ogg`)) {
		copyFileSync(wav, `./wav/${emote.id}.wav`)
		spawn("./bin/ffmpeg.exe", ["-i", `./wav/${emote.id}.wav`, `./finalized/${emote.id}.ogg`])
	}

	return {
		...emote,
		hasOgg: wav !== undefined,
		// hasIcon: hasIcon,
		png
	}
}).filter(v => v !== undefined)

writeFileSync("./finalized/api.json", JSON.stringify(final_api))

mkDirSyncIfNotExist("../static/finalized")
cpSync("./finalized", "../static/finalized", { recursive: true, force: true })