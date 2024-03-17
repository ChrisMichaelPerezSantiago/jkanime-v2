import qs from 'qs'

export class ToolKit {
  static buildQuery = (obj: Record<string, any>) => {
    const query: Record<string, any> = {}
    for (const key in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, key)
        && obj[key] !== undefined
        && obj[key] !== null
        && obj[key] !== ''
      )
        query[key] = obj[key]
    }

    return qs.stringify(query, { encode: false })
  }
}
