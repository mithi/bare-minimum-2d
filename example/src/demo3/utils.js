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
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B'
]

const STICKY_DIV_STYLE = {
  position: 'fixed',
  top: 0,
  margin: '10px',
  fontSize: 10,
  color: pickRandom(NINETEEN_COLORS)
}

const THREE_SIZES = [40, 60, 95]
export {
  pickRandom,
  skewedRandom,
  rotatedLine,
  NINETEEN_COLORS,
  THREE_SIZES,
  STICKY_DIV_STYLE
}
