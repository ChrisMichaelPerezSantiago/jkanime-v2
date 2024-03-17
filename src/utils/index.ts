import _ from 'lodash'
import qs from 'qs'
import type { NumberOrNull } from '../const/types'

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

  static extractNumberFromString = (inputString: any): NumberOrNull => {
    const match = _.parseInt(_.find(inputString.match(/\d+/), _.identity))
    return _.isFinite(match) ? match : null
  }
}
