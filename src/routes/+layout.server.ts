import type { LayoutServerLoad } from './$types'
import type { EmoteData } from "./../../emote_compiler/shared"
import fs from 'fs'
import path from 'path'

export const load: LayoutServerLoad = async () => {
	const data: EmoteData[] = JSON.parse(fs.readFileSync(path.resolve('static/finalized/api.json'), 'utf-8'))

	return {
		api: data//.slice(0, 128), // remove slice after adding virtualization
	}
}
