import http from "https"
import fs from "fs"
import { spawn } from "child_process"
process.chdir("./emote_compiler")
// locate league of legends directory (or hardcode)
// download https://raw.communitydragon.org/data/hashes/lol/hashes.game.txt to ./bin
// clean up hash list to only contain lines containing "summoneremotes" and "misc_emotes_sfx_audio.bnk" and "misc_emotes_sfx_events.bnk"
// unpack via wad-extract.exe league_dir\Game\DATA\FINAL\Global.wad.client" ./Global
// move summoneremotes.xxxxxxxx.bin to new folder
// delete extracted wad ./Global
// extract summoneremotes as json
// get item with key 719095870 and type "hash" and get value (converts to bin filename)
// get key 3770906030 ("soundOnCreateDefault") from each bin file if it exists
// create file with all keys (soundOnCreateDefault) called wwnames.txt
// use wwiser with the following command wwiser.pyz -g misc_emotes_sfx_audio.bnk misc_emotes_sfx_events.bnk

// Common.en_US.wad.client/assets/sounds/wwise2016/vo/en_us/shared/misc_emotes_vo_audio.wpk
// Common.wad.client/assets/sounds/wwise2016/sfx/shared/misc_emotes_sfx_audio.wpk

// Common.en_US.wad.client/assets/sounds/wwise2016/vo/en_us/shared/misc_emotes_vo_audio.bnk
// Common.en_US.wad.client/assets/sounds/wwise2016/vo/en_us/shared/misc_emotes_vo_events.bnk

// Common.wad.client/assets/sounds/wwise2016/sfx/shared/misc_emotes_sfx_audio.bnk
// Common.wad.client/assets/sounds/wwise2016/sfx/shared/misc_emotes_sfx_events.bnk




// locate league of legends (hardcoded cba)
const wad_dir = "C:\\Riot Games\\League of Legends\\Game\\DATA\\FINAL"

// download https://raw.communitydragon.org/data/hashes/lol/hashes.game.txt to ./bin
const download = async (url: string, filename: string) => new Promise(r => http.get(url, res => res.pipe(fs.createWriteStream(filename).on("close", r))))
const get = async (url: string) => fetch(url).then(res => res.text())

// check version to prevent the 30 second download time
console.log("checking patch version")
const latest_ver = (await get("https://raw.communitydragon.org/status.live.txt")).substring(0, 10)
if (!fs.existsSync("patch_version.txt"))
	fs.writeFileSync("patch_version.txt", latest_ver)
console.log(latest_ver)
const up_to_date = latest_ver === fs.readFileSync("patch_version.txt").toString()
if (!up_to_date) {
	console.log("not up to date; downloading necessary files")
	console.log("downloading hashes from https://raw.communitydragon.org/data/hashes/lol/hashes.game.txt")
	await download("https://raw.communitydragon.org/data/hashes/lol/hashes.game.txt", ".\\bin\\wad-extract\\hashes.game.txt")
} else {
	console.log("up to date; skipping downloading hashlist")
}

// clean up hash list to only contain lines containing "summoneremotes" and "misc_emotes_sfx_audio.bnk" and "misc_emotes_sfx_events.bnk"
const includesOneOf = (string: string, strings: string[]) => strings.reduce((p, c) => p || string.includes(c), false)
if (!up_to_date) {
	console.log("reading hashlist from bin/wad-extract/hashes.game.txt")
	const hashlist = fs.readFileSync(".\\bin\\wad-extract\\hashes.game.txt", { encoding: "ascii" }).split("\n")
	console.log("filtering hashlist & overwriting file") // the space in " loadouts/summoneremotes" is INTENTIONAL
	fs.writeFileSync(".\\bin\\wad-extract\\hashes.game.txt", hashlist.filter(v => includesOneOf(v, [" loadouts/summoneremotes", "misc_emotes_sfx_audio.bnk", "misc_emotes_sfx_events.bnk"])).join("\n"))
} else {
	console.log("up to date; skipping hashlist skimming")
}

const spawn_promise = async (process: string, args: string[]) => new Promise(r => spawn(process, args, { "stdio": ["ignore", "ignore", "ignore"] }).on("close", r))

// unpack via wad-extract.exe league_dir\Game\DATA\FINAL\Global.wad.client" ./Global
if (!up_to_date) {
	process.chdir("./bin/wad-extract")
	console.log("extracting emote WAD contents")
	await spawn_promise("wad-extract.exe", [`${wad_dir}\\Global.wad.client`, "./Global"])
	console.log("extracted, performing cleanup")
	// move summoneremotes.xxxxxxxx.bin to new folder
	fs.mkdirSync("./exported")
	fs.renameSync("./Global/loadouts", "./exported/loadouts")
	// delete extracted wad ./Global
	console.log("deleting excess files")
	fs.rmSync("./Global", { "recursive": true, "force": true })
	process.chdir("./../..")
} else {
	console.log("up to date; skipping wad extraction")
}

type TV<T, DT> = {
	type: T,
	value: DT
}

type KV<DT> = {
	key: number,
	value: DT
}

type SEItems = KV<{
	"items": [
		{
			"key": 2956205910, // SummonerEmoteId
			"type": "u32",
			"value": number // 3741
		},
		{
			"key": 719095870, // VfxSystem
			"type": "hash",
			"value": number // 360986944
		},
		{
			"key": 1415849216, // SelectionIcon
			"type": "string",
			"value": string // "ASSETS/Loadouts/SummonerEmotes/Rewards/Ranked/2020/TFT/1/EM_Rewards_Ranked_TFT_gRANDMaster2020_Selector.dds"
		},
		{
			"key": 1923074361, // RenderScale
			"type": "f32",
			"value": number // 0.800000011920929
		},
		{
			"key": 2994461618, // VisibleSelectionName
			"type": "string",
			"value": string // "game_summoner_emote_name_3471"
		}
	],
	"name": number // SummonerEmote // 1950165531
}>

type SummonerEmotesUnhashed = {
	entries: TV<"map", {
		items: SEItems[],
		keyType: "hash",
		valueType: "embed"
	}>,
	linked: TV<"list", { items: [], valueType: string }>,
	type: TV<"string", "PROP">,
	version: TV<"u32", 3>
}

if (!up_to_date) {
	// extract summoneremotes as json
	process.chdir(".\\bin\\ritobin")
	const loadouts = "..\\wad-extract\\exported\\loadouts"
	const summoneremoteslocation = loadouts + "\\summoneremotes"
	console.log("converting summoneremotes to JSON readable format")
	await spawn_promise("ritobin_cli.exe", [summoneremoteslocation, ".\\summoneremotes.json", "-k"])
	const summoneremotes: SummonerEmotesUnhashed = JSON.parse(fs.readFileSync(".\\summoneremotes.json", { encoding: "ascii" }))
	// get item with key 719095870 and type "hash" and get value (converts to bin filename)
	const hashlist = summoneremotes.entries.value.items.map(item => {
		const hash = item.value.items.reduce((p, c) => {
			// messy but it satisfies typescript and works as intended idc
			if (p.key === 719095870 && p.type == "hash")
				return p

			if (c.key === 719095870 && c.type == "hash")
				p = c

			return p
		}).value

		return hash.toString(16).padStart(8, "0")
	})
	console.log(hashlist)
	console.log("moving summoneremote bin files to ./bin/ritobin/summoneremotes/xxxxxxxx.bin")
	if (!fs.existsSync(".\\summoneremotes"))
		fs.mkdirSync(".\\summoneremotes")

	hashlist.map(hash => {
		if (fs.existsSync(`${loadouts}\\summoneremotes.${hash}.bin`)) {
			console.log(`relocating ${hash}`)
			fs.renameSync(`${loadouts}\\summoneremotes.${hash}.bin`, `.\\summoneremotes\\${hash}.bin`)
		}
	})

	console.log("deleting unused exported files")

	fs.rmSync(loadouts, { "recursive": true, "force": true })

	process.chdir("./../..")
} else {
	console.log("up to date; no need to extract summoneremote bin files")
}

// get key 3770906030 ("soundOnCreateDefault") from each bin file if it exists

if (up_to_date) {

}

// create file with all keys (soundOnCreateDefault or SoundPersistentDefault) called wwnames.txt
// use wwiser with the following command wwiser.pyz -g misc_emotes_sfx_audio.bnk misc_emotes_sfx_events.bnk