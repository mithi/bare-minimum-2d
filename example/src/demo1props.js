const BODY_COLOR = '#FC427B'
const COG_COLOR = '#32ff7e'
const LEG_COLOR = '#EE5A24'
const PAPER_BG_COLOR = '#17212B'
const GROUND_COLOR = '#0e2845'
const POINT_SIZE = 25
const LINE_SIZE = 20

const container = {
  color: PAPER_BG_COLOR,
  opacity: 1.0,
  xRange: 1000,
  yRange: 1000
}

const jointsFemur = {
  x: [-166, -235, -166, 166, 235, 166],
  y: [161, 0, -161, -161, 0, 161],
  color: LEG_COLOR,
  opacity: 1.0,
  size: POINT_SIZE,
  type: 'points',
  id: 'joint-femur'
}

const centerPoint = {
  x: [0],
  y: [-20],
  color: COG_COLOR,
  opacity: 1.0,
  size: 1.5 * POINT_SIZE,
  type: 'points',
  id: 'center'
}

const headPoint = {
  x: [0],
  y: [-120],
  color: BODY_COLOR,
  opacity: 1.0,
  size: 1.5 * POINT_SIZE,
  type: 'points',
  id: 'head'
}

const jointsTibia = {
  x: [-269, -355, -269, 269, 335, 269],
  y: [224, 0, -224, -224, 0, 224],
  color: LEG_COLOR,
  opacity: 1.0,
  size: POINT_SIZE,
  type: 'points',
  id: 'joint-tibia'
}

const vertices = {
  x: [-90, -145, -90, 90, 145, 90],
  y: [115, -20, -115, -115, -20, 115],
  color: BODY_COLOR,
  opacity: 1.0,
  size: POINT_SIZE,
  type: 'points',
  id: 'body-vertices'
}

const legs = {
  x0: [-90, -145, -90, 90, 145, 90],
  y0: [115, -20, -115, -115, -20, 115],
  x1: [-269, -355, -269, 269, 335, 269],
  y1: [224, 0, -224, -224, 0, 224],
  color: LEG_COLOR,
  opacity: 0.7,
  size: LINE_SIZE,
  type: 'lines',
  id: 'six-legs'
}

const body = {
  x: [-90, -145, -90, 90, 145, 90],
  y: [115, -20, -115, -115, -20, 115],
  fillColor: BODY_COLOR,
  fillOpacity: 0.3,
  borderColor: BODY_COLOR,
  borderOpacity: 1.0,
  borderSize: LINE_SIZE,
  type: 'polygon',
  id: 'body'
}

const hexagon = {
  x: [-228, -230, -99, 229, 230, 99],
  y: [107, -91, -236, -107, 91, 236],
  fillColor: GROUND_COLOR,
  fillOpacity: 0.5,
  borderColor: GROUND_COLOR,
  borderOpacity: 0,
  borderSize: 0,
  type: 'polygon',
  id: 'blue-hexagon'
}

const ellipse1 = {
  cx: -400,
  cy: 150,
  rx: 25,
  ry: 45,
  theta: -45,
  fillColor: COG_COLOR,
  fillOpacity: 0.5,
  borderColor: COG_COLOR,
  borderOpacity: 1,
  borderSize: 5,
  type: 'ellipse',
  id: 'sampleEllipse'
}

const ellipse2 = {
  cx: -360,
  cy: 150,
  rx: 25,
  ry: 45,
  theta: 45,
  fillColor: COG_COLOR,
  fillOpacity: 0.5,
  borderColor: COG_COLOR,
  borderOpacity: 1.0,
  borderSize: 5,
  type: 'ellipse',
  id: 'sampleEllipse2'
}

const props = {
  container,
  data: [
    jointsFemur,
    jointsTibia,
    centerPoint,
    headPoint,
    vertices,
    legs,
    body,
    hexagon,
    ellipse1,
    ellipse2
  ]
}

export default props
