import cheerio from 'cheerio'
import _ from 'lodash'

import { makeRequest } from './MakeRequest'
import { config } from './config'
import type { NumberOrNull, StringOrNull } from './const/types'

interface Anime {
  title: string | null
  slug: string | null
  amountEpisodes: string | null
  startedEmision: string | null
  statusEmision: string | null
  type: string | null
  synopsis: string | null
  image: string | null
}

type ReturnType = Promise<Anime[] | null>

async function parseAnimeElement(element: cheerio.Element): Promise<Anime> {
  const $ = cheerio.load(element)

  const title = $('.card-title a').attr('title') ?? null
  const slug = $('.card-title span a').attr('href') ?? null
  const amountEpisodes = $('.card-text.ep').text().trim().split(' ')[0] ?? null
  const startedEmision = $('.card-text.ep small').text().trim() ?? null
  const statusEmision = $('.card-status').text().trim() ?? null
  const type = $('.card-txt').text().trim() ?? null
  const synopsis = $('.card-text.synopsis').text().trim() ?? null
  const image = $('.custom_thumb2 img').attr('src') ?? null

  return {
    title,
    slug,
    amountEpisodes,
    startedEmision,
    statusEmision,
    type,
    synopsis,
    image,
  }
}

async function getAnimeDirectory(paginationNumber?: null): ReturnType {
  const requestOpts: Record<string, any> = {
    path: `${config.baseURL}/directorio/${paginationNumber}`,
    responseType: 'text',
  }
  const response = await makeRequest(requestOpts.path, requestOpts.responseType as never, { method: 'get' })
  if (!response)
    return null

  const $ = cheerio.load(response)

  const animeElements = $('div.row.row-cols-md-3.custom_flex.page_directorio .card.mb-3.custom_item2').toArray()

  const animeData = await Promise.all(animeElements.map(parseAnimeElement))

  return _.filter(animeData, anime => anime.slug !== null)
}

export default getAnimeDirectory
