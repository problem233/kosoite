#!/bin/node

/**
 * 梯形逆累积分布函数
 * 
 * ```
 * pdf = (2 - 2 * a) * x + a
 * cdf = ((1 - a) * x + a) * x
 * 0 <= a <= 2
 * 0 <= x <= 1
 * ```
 */
const icdf = a => x => (a - Math.sqrt(a * a + 4 * (1 - a) * x)) / (2 * (a - 1))
const randSel = arr => arr[Math.floor(icdf(2)(Math.random()) * arr.length)]

const V = 'aiueo'
const C = [
  '', ...'kstnhmyrw',
  ...[...'hsrkzbptdgnm'].map(s => s + 'y'),
  ...'gzdbp'
]

const randFill = str => str
  .replace(/W1/g, 'CVCi')
  .replace(/W2/g, 'CVCVCi')
  .replace(/V/g, () => randSel(V))
  .replace(/C/g, () => randSel(C))
  .replace(/^.*y[ie].*$/, () => randFill(str))
  .replace(/^.*w[iue].*$/, () => randFill(str))
  .replace(/^.*d[iy].*$/, () => randFill(str))
  .replace(/^.*(ga|wo|ni|no|te).*$/, () => randFill(str))

console.log(randFill(process.argv[2]))
