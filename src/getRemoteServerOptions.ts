import _ from 'lodash'
import { ToolKit } from './utils'

interface ServerOptions {
  remote: string
  slug: string
  server: string
  lang: number
}

function transformURL(servers: ServerOptions[]) {
  const options = _.map(servers, serverOption =>
     `https://jkanime.net/c1.php?${ToolKit.buildQuery({ u: serverOption.remote, s: _.toLower(serverOption.server) })}`)
  return options
}

async function getRemoteServerOptions(servers: ServerOptions[]) {
  return transformURL(servers)
}

export default getRemoteServerOptions
