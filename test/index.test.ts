import { describe, expect, it } from 'vitest'
import { size } from 'lodash'

import api from '../dist'

describe('scraper', () => {
  it('should return the latest added anime', async () => {
    const result = await api.latestAnimeAdded()
    expect(result).toBeDefined()
    expect(size(result)).toBeGreaterThan(0)
  })

  it('should return filtered anime based on criteria', async () => {
    const result = await api.filter({ query: { genre: 'sci-fi', year: '2024' } })
    expect(result).toBeDefined()
    expect(size(result)).toBeGreaterThan(0)
  })

  it('should return anime by alphabet', async () => {
    const result = await api.byAlphabet('A')
    expect(result).toBeDefined()
    expect(size(result)).toBeGreaterThan(0)
  })

  it('should return extra information about a specific anime', async () => {
    const result = await api.getExtraInfo('tokyo-ghoul')
    expect(result).toBeDefined()
    expect(result).toHaveProperty('extra')
  })

  it('should return top anime for a specific season and year', async () => {
    const result = await api.top('Invierno', '2020')
    expect(result).toBeDefined()
    expect(size(result)).toBeGreaterThan(0)
  })

  it('should return the anime schedule', async () => {
    const result = await api.schedule()
    expect(result).toBeDefined()
    expect(size(result)).toBeGreaterThan(0)
  })

  it('should return search results for a query', async () => {
    const result = await api.search('tokyo ghoul')
    expect(result).toBeDefined()
    if (result)
      expect(size(result.animes)).toBeGreaterThan(0)
  })

  it('should return servers for streaming an anime', async () => {
    const result = await api.getAnimeServers('tokyo-ghoulre', 1)
    expect(result).toBeDefined()
    expect(size(result)).toBeGreaterThan(0)
  })
  it('should return the anime directory', async () => {
    const result = await api.getAnimeDirectory(2)
    expect(result).toBeDefined()
    expect(size(result)).toBeGreaterThan(0)

    if (result && Array.isArray(result)) {
      result.forEach((anime) => {
        expect(anime).toHaveProperty('title')
        expect(anime).toHaveProperty('slug')
      })
    }
  })
})
