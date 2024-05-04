import _ from 'lodash'
import cheerio from 'cheerio'

import { makeRequest } from './MakeRequest'
import { config } from './config'
import type { StringOrNull } from './const/types'
import { CATEGORY_MAP, DEMOGRAPHY_MAP, GENRE_MAP, ORDERBY_MAP, SEASON_MAP, STATE_MAP, TYPES_MAP, YEAR_MAP } from './const/filterOptions'

const { first, intersection, isEmpty, join, size, split, compact, map, pickBy, identity } = _

interface AnimeInfo {
  slug: StringOrNull
  title: StringOrNull
  synopsis: StringOrNull
  episodes: StringOrNull
  image: StringOrNull
  type: StringOrNull
}

type Genre = typeof GENRE_MAP[number]
type Demography = typeof DEMOGRAPHY_MAP[number]
type Category = typeof CATEGORY_MAP[number]
type Type = typeof TYPES_MAP[number]
type State = typeof STATE_MAP[number]
type Year = typeof YEAR_MAP[number]
type Season = typeof SEASON_MAP[number]
type OrderBy = typeof ORDERBY_MAP[number]

interface Filter {
  genre?: Genre
  demography?: Demography
  category?: Category
  type?: Type
  state?: State
  year?: Year
  season?: Season
  orderBy?: OrderBy
}

interface FilterProps {
  query?: Filter
}

type ReturnType = Promise<AnimeInfo[] | null>

function buildPath(array: any) {
  if (size(array) === 1)
    return join(array)

  return join(array, '/')
}

function getGenre(value: string): any {
  if (!isEmpty(value)) {
    const result = intersection(GENRE_MAP, [value])

    return result
  }

  return []
}

function getDemography(value: string): any {
  if (!isEmpty(value)) {
    const result = intersection(DEMOGRAPHY_MAP, [value])
    return result
  }

  return []
}

function getCategory(value: string): any {
  if (!isEmpty(value)) {
    const result = intersection(CATEGORY_MAP, [value])
    return result
  }

  return []
}

function getType(value: string): any {
  if (!isEmpty(value)) {
    const result = intersection(TYPES_MAP, [value])
    return result
  }

  return []
}

function getState(value: string): any {
  if (!isEmpty(value)) {
    const result = intersection(STATE_MAP, [value])
    return result
  }

  return []
}

function getYear(value: string): any {
  if (!isEmpty(value)) {
    const result = intersection(YEAR_MAP, [value])
    return result
  }

  return []
}

function getSeason(value: string): any {
  if (!isEmpty(value)) {
    const result = intersection(SEASON_MAP, [value])
    return result
  }

  return []
}

function getOrderBy(value: string): any {
  if (!isEmpty(value)) {
    const result = intersection(ORDERBY_MAP, [value])
    return result
  }

  return []
}

function applyFilter(filter: Filter | undefined) {
  const filterFunctions: { [key in keyof Filter]: (value: string) => string[] } = {
    genre: getGenre,
    demography: getDemography,
    category: getCategory,
    type: getType,
    state: getState,
    year: getYear,
    season: getSeason,
    orderBy: getOrderBy,
  }

  const filteredFilter = pickBy(filter, identity)

  const fullPath = map(filteredFilter, (value, key) => {
    const filterFunction = filterFunctions[key as keyof Filter]
    if (filterFunction && value) {
      const result = buildPath(filterFunction(value))
      return result
    }
  })

  return compact(fullPath).join('/')
}

function extractAnimeInfo($: cheerio.Root): AnimeInfo[] {
  const animeItems = $('.row .page_directorio')

  const animeInfoList: AnimeInfo[] = []

  animeItems.find('.card').each((index, element) => {
    const $el = $(element)

    const episodes: StringOrNull = $el.find('.card-body p').text() ? first(split($el.find('.card-body p').text(), ',')) as string : null

    const animeInfo: AnimeInfo = {
      title: $el.find('.card-title a').attr('title') ?? null,
      slug: split($el.find('.card-title a').attr('href'), '/').filter(Boolean).pop() ?? null,
      image: $el.find('.img-fluid').attr('src') ?? null,
      synopsis: $el.find('.synopsis').text().trim() ?? null,
      type: $el.find('p.card-txt').text().trim() ?? null,
      episodes,
    }

    animeInfoList.push(animeInfo)
  })

  return animeInfoList
}

function extractNextPageLink($: cheerio.Root): string | null {
  const nextPageLink = $('.text.nav-next').attr('href')
  return nextPageLink ?? null
}

async function requestFilter({ query }: FilterProps): ReturnType {
  const allAnimeInfo: AnimeInfo[] = []
  const appliedFilter = applyFilter(query)

  let nextPageLink: string | null = `${config.baseURL}directorio/${appliedFilter}`

  while (nextPageLink) {
    try {
      const response = await makeRequest(nextPageLink, 'text', { method: 'get' })
      if (!response)
        return null

      const $ = cheerio.load(response)
      allAnimeInfo.push(...extractAnimeInfo($))

      nextPageLink = extractNextPageLink($)
    }
    catch (error) {
      console.error('[RequestFilter] Error fetching data:', error)
      break
    }
  }

  return allAnimeInfo
}

export async function filter({ query }: FilterProps): ReturnType {
  return await requestFilter({ query })
}
