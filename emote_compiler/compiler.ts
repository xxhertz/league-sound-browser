import http from "https"
import fs from "fs"
import { exec } from "node:child_process"
import { spawn } from "child_process"
process.chdir("./emote_compiler")
// locate league of legends directory (or hardcode)
// download https://raw.communitydragon.org/data/hashes/lol/hashes.game.txt to ./bin
// clean up hash list to only contain lines containing "summoneremotes" and "misc_emotes_sfx_audio.bnk" and "misc_emotes_sfx_events.bnk"
// unpack via wad-extract.exe league_dir\Game\DATA\FINAL\Global.wad.client" ./Global
// move summoneremotes.xxxxxxxx.bin to new folder
// delete extracted wad ./Global
// get key 3770906030 (soundOnCreateDefault) from all bin files if it exists
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
	await download("https://raw.communitydragon.org/data/hashes/lol/hashes.game.txt", "./bin/wad-extract/hashes.game.txt")
} else {
	console.log("skipping downloading hashes as we are up to date")
}

// clean up hash list to only contain lines containing "summoneremotes" and "misc_emotes_sfx_audio.bnk" and "misc_emotes_sfx_events.bnk"
const includesOneOf = (string: string, strings: string[]) => strings.reduce((p, c) => p || string.includes(c), false)
if (!up_to_date) {
	console.log("reading hashlist from bin/wad-extract/hashes.game.txt")
	const hashlist = fs.readFileSync("./bin/wad-extract/hashes.game.txt").toString().split("\n")
	console.log("filtering hashlist & overwriting file")
	fs.writeFileSync("./bin/wad-extract/hashes.game.txt", hashlist.filter(v => includesOneOf(v, [" loadouts/summoneremotes", "misc_emotes_sfx_audio.bnk", "misc_emotes_sfx_events.bnk"])).join("\n"))
} else {
	console.log("up to date; skipping hashlist skimming")
}

const spawn_promise = async (process: string, args: string[]) => new Promise(r => spawn(process, args, { "stdio": ["ignore", "ignore", "ignore"] }).on("close", r))

// unpack via wad-extract.exe league_dir\Game\DATA\FINAL\Global.wad.client" ./Global
process.chdir("./bin/wad-extract")
if (up_to_date) {
	console.log("extracting emote WAD contents")
	await spawn_promise("wad-extract.exe", [`${wad_dir}\\Global.wad.client`, "./Global"])
	console.log("extracted, performing cleanup")
	fs.mkdirSync("./exported")
	fs.renameSync("./Global/loadouts", "./exported/loadouts")
	console.log("deleting excess files")
	fs.rmdirSync("./Global")
}

process.chdir("./../..")

// move summoneremotes.xxxxxxxx.bin to new folder
// delete extracted wad ./Global
// get key 3770906030 (soundOnCreateDefault) from all bin files if it exists
// create file with all keys (soundOnCreateDefault) called wwnames.txt
// use wwiser with the following command wwiser.pyz -g misc_emotes_sfx_audio.bnk misc_emotes_sfx_events.bnk
