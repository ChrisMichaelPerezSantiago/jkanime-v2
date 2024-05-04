import cheerio from 'cheerio'
import _ from 'lodash'

import { makeRequest } from './MakeRequest'
import { config } from './config'
import type { NumberOrNull, StringOrNull } from './const/types'

interface Anime {
  slug: StringOrNull
  title: StringOrNull
  synopsis: StringOrNull
  episodes: NumberOrNull
  image: StringOrNull
  type: StringOrNull
  status: StringOrNull
}

type ReturnType = Promise<Anime[] | null>

async function parseAnimeElement(element: cheerio.Element): Promise<Anime> {
  const $ = cheerio.load(element)

  const title = $('.anime__item .anime__item__text h5 a').text().trim() ?? null
  const slug = _.split($('.anime__item a:nth(0)').attr('href'), '/').filter(Boolean).pop() ?? null
  const image = $('.anime__item .anime__item__pic').attr('data-setbg') ?? null
  const synopsis = null
  const episodes = null
  const type = $('.anime__item__text ul li.anime').text().trim() ?? null
  const status = $('.anime__item__text ul li').first().text().trim() ?? null

  return {
    slug,
    title,
    synopsis,
    episodes,
    image,
    type,
    status,
  }
}

async function latestAnimeAdded(): ReturnType {
  const requestOpts: Record<string, any> = {
    path: config.baseURL,
    responseType: 'text',
  }
  const response = await makeRequest(requestOpts.path, requestOpts.responseType as never, { method: 'get' })
  if (!response)
    return null

  const $ = cheerio.load(response)

  const animeElements = $('div.trending__anime div:nth-child(1)').toArray()

  const animeData = _.chain(animeElements)
    .filter((_, index) => index % 2 !== 0)
    .map(parseAnimeElement)
    .thru(promises => Promise.all(promises))
    .value()
    .then(response => _.filter(response, (anime: Anime) => anime.slug !== null))

  return animeData
}

export default latestAnimeAdded
