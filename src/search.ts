import _ from 'lodash'
import { makeRequest } from './MakeRequest'
import { config } from './config'
import { ToolKit } from './utils'

interface Anime {
  id: string
  slug: string
  title: string
  altertitles: { language: string, title: string }[]
  synopsis: string
  status: string
  episodes: string
  image: string
  thumbnail: string
  type: string
  rel_id: { [key: string]: string[] }
  coincidencias: string
}

interface AnimeTypes {
  [key: string]: string
}

interface SearchResults {
  animes: Anime[]
  anime_types: AnimeTypes
}

type SearchReturnType = Promise<SearchResults | null>

export async function search(q: string): SearchReturnType {
  const requestOpts: Record<string, any> = {
    path: `${config.baseURL}ajax/ajax_search/?${ToolKit.buildQuery({ q })}`,
    responseType: 'json',
  }

  const response: SearchReturnType = await makeRequest(requestOpts.path, requestOpts.responseType, { method: 'get' })

  // skip rest of the steps
  if (!response)
    return null

  return response
}
