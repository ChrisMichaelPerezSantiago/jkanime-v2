import cheerio from 'cheerio'
import _ from 'lodash'
import { makeRequest } from './MakeRequest'
import { config } from './config'
import { ToolKit } from './utils'
import type { NumberOrNull, StringOrNull } from './const/types'

interface Anime {
  id: StringOrNull
  slug: StringOrNull
  title: StringOrNull
  synopsis: StringOrNull
  episodes: NumberOrNull
  image: StringOrNull
  type: StringOrNull
}

type SeasonType = 'Primavera' | 'Verano' | 'Otoño' | 'Invierno' | 'Temporada Actual'

type YearType = '2020' | '2021' | '2022' | '2023' | '2024'

type ReturnType = Promise<Anime[] | null>

const DEFAULT_ACTUAL_SEASON: SeasonType = 'Temporada Actual'

async function top(season: SeasonType, year: YearType): ReturnType {
  let requestOpts: Record<string, any> = {}

  if (season === DEFAULT_ACTUAL_SEASON) {
    requestOpts = {
      path: `${config.baseURL}top`,
      responseType: 'text',
    }
  }
  else {
    requestOpts = {
      path: `${config.baseURL}top?${ToolKit.buildQuery({ temporada: season, fecha: year })}`,
      responseType: 'text',
    }
  }

  const response = await makeRequest(requestOpts.path, requestOpts.responseType as never, { method: 'get' })
  if (!response)
    return null

  const $ = cheerio.load(response)

  const animeElements = $('div.list').toArray()

  const animePromises = _.map(animeElements, parseAnimeElement)

  const animeData = await Promise.all(animePromises)

  return animeData
}

async function parseAnimeElement(element: cheerio.Element): Promise<Anime> {
  const $ = cheerio.load(element)

  const id = null
  const title = $('h2.portada-title a').attr('title') ?? null
  const slug = _.split($('h2.portada-title a').attr('href'), '/').filter(Boolean).pop() ?? null
  const image = $('.timg img').attr('src') ?? null
  const synopsis = $('div#animinfo p').text().trim() ?? null
  const type = $('span.title').text() ? _.trim(_.first(_.split($('span.title').text(), '/'))) : null
  const episodes = ToolKit.extractNumberFromString($('span.title').text()) ?? null

  return {
    id,
    slug,
    title,
    synopsis,
    episodes,
    image,
    type,
  }
}

export default top
