import _ from 'lodash'
import cheerio from 'cheerio'
import { makeRequest } from './MakeRequest'
import { config } from './config'
import type { StringOrNull } from './const/types'

interface AnimeInfo {
  slug: StringOrNull
  title: StringOrNull
  thumbnail: StringOrNull
  type: StringOrNull
  status: StringOrNull

}

type ReturnType = Promise<AnimeInfo[] | null>

function extractPosterURL($element: cheerio.Cheerio): string {
  const style = $element.attr('style')
  if (style) {
    const matches = style.match(/url\((['"]?)(.*?)\1\)/)
    if (matches && matches[2])
      return matches[2]
  }
  return ''
}

function extractAnimeInfo($: cheerio.Root): AnimeInfo[] {
  const animeItems = $('.row .anime__item')

  const animeInfoList: AnimeInfo[] = []

  animeItems.each((index, element) => {
    const animeInfo: AnimeInfo = {
      slug: _.split($(element).find('a').attr('href'), '/').filter(Boolean).pop() ?? null,
      title: $(element).find('a').text().trim(),
      thumbnail: extractPosterURL($(element).find('.anime__item__pic')),
      type: $(element).find('.anime__item__text .anime').text().trim() ?? null,
      status: $(element).find('.anime__item__text ul li:nth(0)').text().trim() ?? null,
    }

    animeInfoList.push(animeInfo)
  })

  return animeInfoList
}

function extractNextPageLink($: cheerio.Root): string | null {
  const nextPageLink = $('.text.nav-next').attr('href')
  return nextPageLink ?? null
}

async function requestAnimeInfoByAlphabet(letter: string): ReturnType {
  const allAnimeInfo: AnimeInfo[] = []
  let nextPageLink: string | null = `${config.baseURL}letra/${letter}`

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
      console.error('Error fetching data:', error)
      break
    }
  }

  return allAnimeInfo
}

export async function byAlphabet(letter: string): ReturnType {
  return await requestAnimeInfoByAlphabet(letter)
}
