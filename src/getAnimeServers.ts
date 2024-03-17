import cheerio from 'cheerio'
import _ from 'lodash'
import { makeRequest } from './MakeRequest'
import { config } from './config'
import getRemoteServerOptions from './getRemoteServerOptions'

export async function getAnimeServers(animeId: string, chapter: number): Promise<string[] | null> {
  const requestOpts: Record<string, any> = {
    path: `${config.baseURL}${animeId}/${chapter}`,
    responseType: 'text',
  }

  // Fetch the HTML content asynchronously
  const responsePromise = await makeRequest(requestOpts.path, requestOpts.responseType, { method: 'get' })

  // skip rest of the steps
  if (!responsePromise)
    return null

  const $ = cheerio.load(responsePromise)

  // Find the script tag containing the dynamic remote server.js URL
  const scriptSrc = $('script').filter((_, elem) => $(elem).text().includes('script.src = remote')).text().trim()

  // Check if there's a match before extracting the dynamic remote server.js URL
  const dynamicSrcMatch = scriptSrc.match(/script.src = remote\s*\+\s*'(.+?)'/)
  if (!dynamicSrcMatch)
    return null // No dynamic server URL found

  // Extract the dynamic server.js URL
  const dynamicSrc = _.get(dynamicSrcMatch, '[1]', null)
  if (!dynamicSrc)
    return null

  // Fetch the remote server options asynchronously
  const remoteServerOptionsPromise = getRemoteServerOptions(`${config.remoteServerURL}${dynamicSrc}`)

  // Wait for both requests to complete
  const [, remoteServerJsURL] = await Promise.all([responsePromise, remoteServerOptionsPromise])

  return remoteServerJsURL
}
