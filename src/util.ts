import * as rx from 'rxjs'
import { map } from 'rxjs/operators'

export type NonEmptyArray<T> = [T, ...T[]]

export const filterMap = <T extends U, U>(pred: (x: T) => boolean, proj: (x: U) => U):
    rx.OperatorFunction<T, U> =>
  source => source.pipe(map(x => pred(x) ? proj(x) : x))
