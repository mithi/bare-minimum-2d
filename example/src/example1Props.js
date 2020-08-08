const container = {
  color: '#0000FF',
  opacity: 0.2,
  xRange: 300,
  yRange: 300
}

const points1 = {
  x: [0, -50, -50, 50, 50],
  y: [0, -50, 50, 50, -50],
  color: 'red',
  opacity: 0.75,
  size: 5,
  type: 'points',
  id: 'redColor5'
}

const points2 = {
  x: [0, 0, 0, 0],
  y: [-20, -10, 10, 20],
  color: 'purple',
  opacity: 0.75,
  size: 3,
  type: 'points',
  id: 'purple3'
}

const lines1 = {
  x0: [10, -10],
  y0: [10, 10],
  x1: [30, -30],
  y1: [20, -50],
  color: '#000000',
  opacity: 0.5,
  size: 5,
  type: 'lines',
  id: 'samplelines'
}

const lines2 = {
  x0: [40, 20, 60],
  y0: [50, 20, -60],
  x1: [20, -60, -70],
  y1: [20, -30, 10],
  color: '#00ff00',
  opacity: 0.5,
  size: 10,
  type: 'lines',
  id: 'samplelines2'
}

const [f, m, s] = [40, 70, 30]
const hexagon = {
  x: [-f, f, m, f, -f, -m],
  y: [s, s, 0, -s, -s, 0],
  fillColor: '#ff00ff',
  fillOpacity: 0.3,
  borderColor: '#ff00ff',
  borderOpacity: 1.0,
  borderSize: 5,
  type: 'polygon',
  id: 'sampleHexagon'
}

const [h, w] = [15, 20]
const square = {
  x: [-w, w, w, -w],
  y: [-h, -h, h, h],
  fillColor: '#ffff00',
  fillOpacity: 0.3,
  borderColor: '#ffff00',
  borderOpacity: 1.0,
  borderSize: 1,
  type: 'polygon',
  id: 'sampleSquare'
}

const props = {
  container,
  data: [points1, points2, lines1, lines2, hexagon, square]
}

export default props
