import { existsSync } from "fs"
import emoteMap from "./emotehashmap.json"
import eventMap from "./eventhashmap.json"
process.chdir("./emote_compiler")

function emoteFromID(emoteID: string | number) {
	const hash = emoteMap[emoteID.toString()].hash
	const event = eventMap[hash]
	const dir = `.\\bin\\wwiser\\txtp\\${event}.txtp.wav`
	if (existsSync(dir))
		return dir
}

console.log(emoteFromID(1457))