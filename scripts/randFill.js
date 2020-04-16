#!/bin/node

const randSel = arr => arr[Math.floor(Math.random() * arr.length)]

const V = 'aiueo'
const I = 'ptsk'
const J = 'bdzgq'
const K = Array.from('mwnryh').concat('')
const G = [...J, ...K]
const H = [...I, ...K]
const C = [...I, ...J, ...K]

const randFill = str => str
  .replace(/W1/g, 'VCV')
  .replace(/W2/g, 'VCVHV')
  .replace(/X1/g, 'GV')
  .replace(/X2/g, 'GVKV')
  .replace(/V/g, () => randSel(V))
  .replace(/I/g, () => randSel(I))
  .replace(/J/g, () => randSel(J))
  .replace(/K/g, () => randSel(K))
  .replace(/G/g, () => randSel(G))
  .replace(/H/g, () => randSel(H))
  .replace(/C/g, () => randSel(C))

console.log(randFill(process.argv[2]))
