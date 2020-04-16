import rx from 'rxjs'
import { filter, flatMap, groupBy } from 'rxjs/operators'

import { Event, Action, Resource } from './event'

/**
 * A pipeline to turn all source into asset
 */
export const pipeline: rx.MonoTypeOperatorFunction<Event> =
  source => source
    .pipe(groupBy(e => e.action))
    .pipe(flatMap(g => {
      switch (g.key) {
        case Action.remove:
          return g
        case Action.change:
          return g
            .pipe(groupBy(e => e.resource))
            .pipe(flatMap(g => {
              switch (g.key) {
                case Resource.page:
                  return g
                default:
                  return g
              }
            }))
        case Action.rerender:
          return g
      }
    }))
    .pipe() // TODO rerender rerender actions
    .pipe(filter(e => e.resource === Resource.asset))
