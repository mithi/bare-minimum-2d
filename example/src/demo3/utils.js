const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]

const skewedRandom = (list, element) =>
  Math.random() > 0.99 ? pickRandom(list) : element

const rotatedLine = (line, theta) => {
  const x0 = line.x0 * Math.cos(theta) - line.y0 * Math.sin(theta)
  const y0 = line.x0 * Math.sin(theta) + line.y0 * Math.cos(theta)
  const x1 = line.x1 * Math.cos(theta) - line.y1 * Math.sin(theta)
  const y1 = line.x1 * Math.sin(theta) + line.y1 * Math.cos(theta)
  return { x0, y0, x1, y1 }
}

const NINETEEN_COLORS = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#12CBC4',
  '#9980FA',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#A3CB38',
  '#B53471',
  '#D980FA',
  '#1289A7',
  '#32ff7e'
]

const SIX_COLORS = [
  '#4b4b4b',
  '#e317d5',
  '#0652DD',
  '#006266',
  '#EA2027',
  '#132914'
]

const THREE_SIZES = [40, 60, 95]
export {
  pickRandom,
  skewedRandom,
  rotatedLine,
  NINETEEN_COLORS,
  THREE_SIZES,
  SIX_COLORS
}
