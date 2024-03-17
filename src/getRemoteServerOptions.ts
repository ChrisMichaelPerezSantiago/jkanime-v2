import _ from 'lodash'
import { makeRequest } from './MakeRequest'

interface ServerOptions {
  remote: string
  slug: string
  server: string
  lang: number
}

function transformURL(serverOption: ServerOptions) {
  const remote = serverOption.remote
  const server = _.toLower(serverOption.server)
  const url = `https://jkanime.net/c4.php?u=${remote}&s=${server}`
  return url
}

async function getRemoteServerOptions(url: string) {
  const requestOpts: Record<string, any> = {
    path: url,
    responseType: 'text',
  }
  const response = await makeRequest(requestOpts.path, requestOpts.responseType, { method: 'get' })

  if (!response)
    return null

  const jsonString = _.replace(response, 'var servers =', '')
  const servers = JSON.parse(jsonString)
  const URLs = _.map(servers, transformURL)

  return URLs
}

export default getRemoteServerOptions
