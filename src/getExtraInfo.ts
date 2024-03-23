import cheerio from 'cheerio'
import { makeRequest } from './MakeRequest'
import { config } from './config'
import type { StringArrayOrNull, StringOrNull } from './const/types'
import { ToolKit } from './utils'

interface AnimeInfo {
  type: StringOrNull
  genre: StringArrayOrNull
  studios: StringArrayOrNull
  demography: StringArrayOrNull
  languages: StringOrNull
  episodes: StringOrNull
  duration: StringOrNull
  aired: StringOrNull
  status: StringOrNull
  quality: StringOrNull
}

interface RootAnime {
  extra: AnimeInfo | null
}

type ReturnType = Promise<RootAnime | null>

// Spanish to English lookup table
const propsToEnglish: Record<string, string> = {
  tipo: 'type',
  genero: 'genre',
  studios: 'studios',
  demografia: 'demography',
  idiomas: 'languages',
  episodios: 'episodes',
  episodeList: '',
  duracion: 'duration',
  emitido: 'aired',
  estado: 'status',
  calidad: 'quality',
  promo: 'promo',
}

function buildPromoURL($: cheerio.Root) {
  const id = $('.animeTrailer').attr('data-yt')
  if (!id)
    return null

  return `https://youtube.com/watch?${ToolKit.buildQuery({ v: id })}`
}

async function getExtraInfo(animeSlug: string): ReturnType {
  const requestOpts = {
    path: `${config.baseURL}${animeSlug}`,
    responseType: 'text',
  }

  const response = await makeRequest(requestOpts.path, requestOpts.responseType as never, { method: 'get' })
  if (!response)
    return { extra: null }

  const $ = cheerio.load(response)

  const ul = $('.aninfo ul')

  const extra: Record<string, any> = {}

  ul.find('li').each((_, element) => {
    const span = $(element).find('span').first()
    const key = span.text().trim().replace(':', '').toLowerCase()
    // Use English equivalent if available, else use original key
    const englishKey = propsToEnglish[key] || key

    if (key === 'genero' || key === 'studios' || key === 'demografia') {
      const valueList: any = []
      $(element).find('a').each((_, anchor) => {
        valueList.push($(anchor).text().trim())
      })
      extra[englishKey] = valueList
    }
    else {
      let value: any = $(element).text().replace(span.text(), '').trim() ?? null

      // Convert to number if the entire string is numeric
      if (/^\d+$/.test(value)) {
        value = Number.parseInt(value, 10)
        extra.episodeList = Array.from({ length: value }, (v, k) => ({
          key: animeSlug,
          value: k + 1,
        }))
      }

      extra[englishKey] = value
    }

    // Handle the case when key is "Estado" and there are no anchor tags
    if (key === 'estado' && !extra[englishKey])
      extra[englishKey] = span.next().text().trim()

    // Set propsToEnglish key to null if not found in HTML text
    if (!extra[englishKey])
      extra[englishKey] = null
  })

  // Inject promo URL into details
  const promoURL = buildPromoURL($)
  extra.promo = promoURL

  const result = {
    extra,
  }

  return result as RootAnime
}

export default getExtraInfo
