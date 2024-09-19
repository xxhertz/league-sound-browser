import http from "https"
import fs from "fs"
import { spawn } from "child_process"
import hash from "fnv-plus"
process.chdir("./emote_compiler")
const a = (audio: string) => [audio + "_audio.bnk", audio + "_audio.wpk", audio + "_events.bnk"]
const REQUIREDHASHES = [" loadouts/summoneremotes", ...a("misc_emotes_sfx"), ...a("misc_emotes_vo")]
const hashstr = (str: string) => Number(hash.hash(str.toLowerCase()).dec())
const SOUNDONCREATEDEFAULT = hashstr("SoundOnCreateDefault")
const SOUNDPERSISTENTDEFAULT = hashstr("SoundPersistentDefault")
const VFXSYSTEM = hashstr("VfxSystem")

// locate league of legends directory (or hardcode)
// download https://raw.communitydragon.org/data/hashes/lol/hashes.game.txt to ./bin
// clean up hash list to only contain lines containing "summoneremotes" and "misc_emotes_sfx_audio.bnk" and "misc_emotes_sfx_events.bnk"
// unpack via wad-extract.exe league_dir\Game\DATA\FINAL\Global.wad.client" ./Global
// move summoneremotes.xxxxxxxx.bin to new folder
// delete extracted wad ./Global
// extract summoneremotes as json
// get item with key 719095870 and type "hash" and get value (converts to bin filename)
// get key 3770906030 ("soundOnCreateDefault") or key 1516925922 ("SoundPersistentDefault") from each bin file if it exists
// create file with all keys (soundOnCreateDefault) called wwnames.txt
// extract Common.en_US.wad.client
// extract Common.wad.client
// extract misc_emotes_sfx_audio & misc_emotes_sfx_events.bnk
// use wwiser with the following command wwiser.pyz -g misc_emotes_sfx_audio.bnk misc_emotes_sfx_events.bnk


// Common.en_US.wad.client/assets/sounds/wwise2016/vo/en_us/shared/misc_emotes_vo_audio.wpk
// Common.wad.client/assets/sounds/wwise2016/sfx/shared/misc_emotes_sfx_audio.wpk

// Common.en_US.wad.client/assets/sounds/wwise2016/vo/en_us/shared/misc_emotes_vo_audio.bnk
// Common.en_US.wad.client/assets/sounds/wwise2016/vo/en_us/shared/misc_emotes_vo_events.bnk

// Common.wad.client/assets/sounds/wwise2016/sfx/shared/misc_emotes_sfx_audio.bnk
// Common.wad.client/assets/sounds/wwise2016/sfx/shared/misc_emotes_sfx_events.bnk

// C:\Users\classic\Downloads\obsidian\extracted\wwz\assets\sounds\wwise2016\sfx\shared

const test = {
	skip_hash_download: false,
	skip_hash_filter: false,
}

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
if (!up_to_date && !test.skip_hash_download) {
	console.log("not up to date; downloading necessary files")
	console.log("downloading hashes from https://raw.communitydragon.org/data/hashes/lol/hashes.game.txt")
	await download("https://raw.communitydragon.org/data/hashes/lol/hashes.game.txt", ".\\bin\\wad-extract\\hashes.game.txt")
} else {
	console.log("up to date; skipping downloading hashlist")
}

// clean up hash list to only contain lines containing "summoneremotes" and "misc_emotes_sfx_audio.bnk" and "misc_emotes_sfx_events.bnk"
const includesOneOf = (string: string, strings: string[]) => strings.reduce((p, c) => p || string.includes(c), false)
if (!up_to_date && !test.skip_hash_filter) {
	console.log("reading hashlist from bin/wad-extract/hashes.game.txt")
	const hashlist = fs.readFileSync(".\\bin\\wad-extract\\hashes.game.txt", { encoding: "ascii" }).split("\n")
	console.log("filtering hashlist & overwriting file") // the space in " loadouts/summoneremotes" is INTENTIONAL
	fs.writeFileSync(".\\bin\\wad-extract\\hashes.game.txt", hashlist.filter(v => includesOneOf(v, REQUIREDHASHES)).join("\n"))
} else {
	console.log("up to date; skipping hashlist skimming")
}

const spawn_promise = async (process: string, args: string[]) => new Promise(r => spawn(process, args, { "stdio": ["ignore", "ignore", "ignore"] }).on("close", r))

// unpack via wad-extract.exe league_dir\Game\DATA\FINAL\Global.wad.client" ./Global
if (!up_to_date) {
	process.chdir("./bin/wad-extract")
	if (fs.existsSync(".\\Global"))
		fs.rmSync(".\\Global", { recursive: true, force: true })

	if (fs.existsSync(".\\exported"))
		fs.rmSync(".\\exported", { recursive: true, force: true })

	console.log("extracting emote WAD contents")
	await spawn_promise("wad-extract.exe", [`${wad_dir}\\Global.wad.client`, ".\\Global"])
	console.log("extracted, performing cleanup")
	// move summoneremotes.xxxxxxxx.bin to new folder
	if (!fs.existsSync(".\\exported"))
		fs.mkdirSync(".\\exported")

	fs.renameSync(".\\Global\\loadouts", ".\\exported\\loadouts")
	// delete extracted wad ./Global
	console.log("deleting excess files")
	fs.rmSync(".\\Global", { recursive: true, force: true })
	process.chdir(".\\..\\..")
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
	// get item with key 719095870 and type "hash" and get value (gets each referenced bin file's filename component/hash)
	const hashlist = summoneremotes.entries.value.items.map(item => {
		const hash = item.value.items.reduce((p, c) => {
			// messy but it satisfies typescript and works as intended idc
			if (p.key === VFXSYSTEM && p.type == "hash")
				return p

			if (c.key === VFXSYSTEM && c.type == "hash")
				p = c

			return p
		}).value

		return hash.toString(16).padStart(8, "0")
	})
	console.log(`found ${hashlist.length} valid hashes`)

	console.log("moving summoneremote bin files to ./tobedumped/xxxxxxxx.bin")
	if (!fs.existsSync(".\\tobedumped"))
		fs.mkdirSync(".\\tobedumped")

	let relocation_count = 0
	hashlist.map(hash => {
		if (fs.existsSync(`${loadouts}\\summoneremotes.${hash}.bin`)) {
			fs.renameSync(`${loadouts}\\summoneremotes.${hash}.bin`, `.\\tobedumped\\${hash}.bin`)
			relocation_count++
		}
	})
	console.log(`moved ${relocation_count} files`)
	console.log("deleting unused exported files")
	fs.rmSync(`${loadouts}\\..`, { "recursive": true, "force": true })

	console.log(`dumping ${relocation_count} files via ritobin`)
	await spawn_promise("ritobin_cli.exe", [".\\tobedumped", "-r", "-k", "-i bin", "-o json"])
	console.log("dumped all .bin files")

	process.chdir(".\\..\\..")
} else {
	console.log("up to date; no need to extract summoneremote bin files")
}


// get key 3770906030 ("soundOnCreateDefault") or key 1516925922 ("SoundPersistentDefault") from each bin file if it exists
if (!up_to_date) {
	process.chdir(".\\bin\\ritobin")
	console.log("getting json files")
	const jsonfiles = fs.readdirSync(".\\tobedumped").filter(str => str.endsWith(".json"))
	console.log(`got ${jsonfiles.length} converted files`)
	const filesdata = jsonfiles.map(filename => JSON.parse(fs.readFileSync(`.\\tobedumped\\${filename}`, { encoding: "ascii" })))
	console.log(`sifting files to only contain values "soundOnCreateDefault" / "SoundPersistentDefault"`)
	const eventstrings = filesdata.map(file => {
		// not making a type for this i cant be fucked
		const itemlist = file?.entries?.value?.items?.[0]?.value?.items
		if (itemlist instanceof Array) {
			const eventString = itemlist.reduce((p, c) => {
				if (p?.key === SOUNDPERSISTENTDEFAULT) // SoundPersistentDefault
					return p
				if (p?.key === SOUNDONCREATEDEFAULT) // soundOnCreateDefault
					return p

				if (c?.key === SOUNDPERSISTENTDEFAULT) // SoundPersistentDefault
					p = c
				if (c?.key === SOUNDONCREATEDEFAULT) // soundOnCreateDefault
					p = c

				return c
			})?.value

			if (eventString !== 1)
				return eventString
		}
	}).filter(v => v !== undefined)
	// create file with all keys (soundOnCreateDefault / SoundPersistentDefault) called wwnames.txt
	console.log(`writing ${eventstrings.length} event strings to ./bin/wwiser/wwnames.txt`)
	fs.writeFileSync(".\\..\\wwiser\\wwnames.txt", eventstrings.join("\n"))
	process.chdir(".\\..\\..")
} else {
	console.log("up to date; skipping event name extraction")
}

// maybe optional, theory stands that .wem files are named after the event name hashed, i just don't know what seed riot uses rn and i can't understand the repos that do it
// boofsauce
// extract Common.en_US.wad.client
// extract Common.wad.client
if (up_to_date) {
	process.chdir(".\\bin\\wad-extract")
	const commondir = wad_dir + "\\Maps\\Shipping"

	console.log("extracting Common.en_US.wad.client")
	await spawn_promise("wad-extract.exe", [`${commondir}\\Common.en_US.wad.client`, ".\\Common_en_US"])
	console.log("extracted Common.en_US.wad.client")
	console.log("extracting Common.wad.client")
	await spawn_promise("wad-extract.exe", [`${commondir}\\Common.wad.client`, ".\\Common"])
	console.log("extracted Common.wad.client")

	console.log(`moving crucial files to bnk-extract [${REQUIREDHASHES.join(", ")}]`)
	const commonshared = ".\\Common\\assets\\sounds\\wwise2016\\sfx\\shared"
	fs.readdirSync(commonshared).map(file => fs.renameSync(`${commonshared}\\${file}`, `.\\..\\bnk-extract\\${file}`))
	const commonvo = ".\\Common_en_US\\assets\\sounds\\wwise2016\\vo\\en_us\\shared"
	fs.readdirSync(commonvo).map(file => fs.renameSync(`${commonvo}\\${file}`, `.\\..\\bnk-extract\\${file}`))

	console.log("all moved; cleaning up")
	fs.rmSync(".\\Common", { recursive: true, force: true })
	fs.rmSync(".\\Common_en_US", { recursive: true, force: true })

	process.chdir(".\\..\\..")
} else {
	console.log("up to date; skipping extraction of Common.wad")
}


// extract misc_emotes_sfx_audio & misc_emotes_sfx_events.bnk
// use wwiser with the following command wwiser.pyz -g misc_emotes_sfx_audio.bnk misc_emotes_sfx_events.bnk
/**
 * wwiser.pyz -g misc_emotes_sfx_audio.bnk misc_emotes_sfx_events.bnk
 * wad-extract.exe "X:\Riot Games\League of Legends (PBE)\Game\DATA\FINAL\Global.wad.client" ./Global
 * 
 * (1283).toString(16)
 * ritobin_cli.exe "X:\GitHub\league-sound-browser\emote_compiler\bin\ritobin\summoneremotes\0dbb48bf.bin" ./summoneremotes2.json -k
 * wwiser.pyz -g misc_emotes_sfx_audio.bnk misc_emotes_sfx_events.bnk
 * 
 * C:\Users\classic\Downloads\obsidian\extracted\wwz\z\assets\sounds\wwise2016\vo\en_us\shared
 * 
 * https://github.com/Vextil/Wwise-Unpacker
 * https://vgmstream.org/
 * https://github.com/mscdex/node-xxhash
 * https://www.npmjs.com/package/xxhash
 * https://github.com/Cyan4973/xxHash
 */