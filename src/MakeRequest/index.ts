import type { Options } from 'ky'
import ky from 'ky'

class CustomHTTPError extends Error {}

type ResponseType = 'text' | 'json'

type RequestOptions = Options

export async function makeRequest(url: string, responseType: ResponseType = 'json', options: RequestOptions = {}): Promise<any> {
  try {
    const response = await ky(url, options)

    if (!response.ok)
      throw new CustomHTTPError(`Fetch error: ${response.statusText}`)

    return await response[`${responseType}`]()
  }
  catch (error) {
    throw new Error(`Error making request to ${url}: ${(error)}`)
  }
}
