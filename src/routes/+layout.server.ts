import type { LayoutServerLoad } from './$types'
import fs from 'fs'
import path from 'path'

export const load: LayoutServerLoad = async () => {
	return {
		api: JSON.parse(fs.readFileSync(path.resolve('static/finalized/api.json'), 'utf-8'))
	}
}
