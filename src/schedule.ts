import cheerio from 'cheerio'
import _ from 'lodash'
import { makeRequest } from './MakeRequest'
import { config } from './config'

type StringOrNull = string | null

interface Anime {
  id: StringOrNull
  slug: StringOrNull
  title: StringOrNull
  image: StringOrNull
  lastEpisode: StringOrNull
  timestamp: StringOrNull
  type: StringOrNull
}

interface AnimeDay {
  day: string
  animes: Anime[]
}

type ReturnType = Promise<AnimeDay[]>

async function schedule(): ReturnType {
  const requestOpts = {
    path: `${config.baseURL}horario`,
    responseType: 'text',
  }

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const scheduleData: AnimeDay[] = await Promise.all(
    _.map(daysOfWeek, async (day) => {
      const response = await makeRequest(requestOpts.path, requestOpts.responseType as never, { method: 'get' })
      if (!response)
        return { day, animes: [] }

      const $ = cheerio.load(response)
      const dayData: AnimeDay = {
        day,
        animes: $('div.app-layout div.box.semana')
          .eq(daysOfWeek.indexOf(day))
          .find('div.cajas div.box')
          .map((index, element) => {
            const $el = $(element)
            return {
              id: $el.find('#guardar-anime').attr('data-anime') ?? null,
              slug: _.replace($el.find('h3').parent().attr('href') as never, /\//g, '') ?? null,
              title: $el.find('h3').text().trim() ?? null,
              image: $el.find('img').attr('src') ?? null,
              lastEpisode: ($el.find('.last span').text().trim().split(':')[1] ?? '').trim() || null,
              timestamp: $el.find('.last time').text().trim() ?? null,
              type: $el.find('#guardar-anime').attr('data-tipo') ?? null,
            }
          })
          .get(),
      }

      return dayData
    }),
  )

  return scheduleData
}

export default schedule
