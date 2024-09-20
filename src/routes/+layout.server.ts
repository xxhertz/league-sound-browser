import type { LayoutServerLoad } from './$types'
import type { ApiEmote } from "./../../emote_compiler/shared"
import fs from 'fs'
import path from 'path'
export const load: LayoutServerLoad = async () => {
  const filePath = path.resolve('static/finalized/api.json')
  const data: ApiEmote[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  return {
    api: data
  }
}
