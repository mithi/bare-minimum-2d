import React from 'react'
import { BareMinimum2d } from 'bare-minimum-2d'

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]

const skewedRandom = (list, element) =>
  Math.random() > 0.95 ? pickRandom(list) : element

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

const THREE_SIZES = [35, 70, 105]

const STICKY_DIV_STYLE = {
  position: 'fixed',
  top: 0,
  margin: '10px',
  fontSize: 10,
  color: pickRandom(NINETEEN_COLORS)
}

const CONTAINER = {
  color: pickRandom(NINETEEN_COLORS),
  opacity: 1.0,
  xRange: 1000,
  yRange: 1000
}

const R = 200
const L1 = {
  x0: -R,
  y0: 0,
  x1: R,
  y1: 0
}

const L2 = {
  x0: 0,
  y0: -R,
  x1: 0,
  y1: R
}

const rotatedLine = (line, theta) => {
  const x0 = line.x0 * Math.cos(theta) - line.y0 * Math.sin(theta)
  const y0 = line.x0 * Math.sin(theta) + line.y0 * Math.cos(theta)
  const x1 = line.x1 * Math.cos(theta) - line.y1 * Math.sin(theta)
  const y1 = line.x1 * Math.sin(theta) + line.y1 * Math.cos(theta)
  return { x0, y0, x1, y1 }
}

class PinWheelShapesManager {
  oldPointColor = NINETEEN_COLORS[1]
  oldPointSize = THREE_SIZES[1]
  oldPlusColor = NINETEEN_COLORS[2]
  oldPlusSize = THREE_SIZES[1]

  update(theta) {
    const line1 = rotatedLine(L1, -theta)
    const line2 = rotatedLine(L2, -theta)
    const lines = {
      x0: [line1.x0, line2.x0],
      y0: [line1.y0, line2.y0],
      x1: [line1.x1, line2.x1],
      y1: [line1.y1, line2.y1],
      color: skewedRandom(NINETEEN_COLORS, this.oldPlusColor),
      opacity: 1.0,
      size: skewedRandom(THREE_SIZES, this.oldPlusSize),
      type: 'lines',
      id: 'two-lines-center-cross'
    }

    const points = {
      x: [line1.x0, line1.x1, line2.x0, line2.x1],
      y: [line1.y0, line1.y1, line2.y0, line2.y1],
      color: skewedRandom(NINETEEN_COLORS, this.oldPointColor),
      opacity: 1.0,
      size: skewedRandom(THREE_SIZES, this.oldPointSize),
      type: 'points',
      id: 'heads'
    }
    this.oldPointColor = points.color
    this.oldPointSize = points.size
    this.oldPlusColor = lines.color
    this.oldPlusSize = points.size

    return [points, lines]
  }
}

const DemoSticky = ({ x, y, theta }) => (
  <div style={STICKY_DIV_STYLE}>
    [Go back]
    <br />
    Move your cursor to spin the pinwheel
    <br />
    x:{x}
    <br />
    y: {y}
    <br />
    a:{((theta * 180) / Math.PI).toFixed(2)}
    <br />
  </div>
)

class DemoThree extends React.Component {
  h = window.innerHeight
  theta = 0
  data = []
  shapesManager = new PinWheelShapesManager()
  state = {
    x: 0,
    y: 0
  }

  _onMouseMove(e) {
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY
    const w = window.innerWidth
    const h = window.innerHeight

    const currentX = w / 2 - x
    const currentY = h / 2 - y
    const theta = Math.atan2(currentY, currentX)

    this.h = h
    this.data = this.shapesManager.update(theta)

    this.setState({
      x: currentX,
      y: currentY,
      theta
    })
  }

  render() {
    const { x, y, theta } = this.state
    const divDimensionsStyle = { width: '100%', height: this.h }

    return (
      <div
        style={divDimensionsStyle}
        onMouseMove={this._onMouseMove.bind(this)}
      >
        <BareMinimum2d container={CONTAINER} data={this.data} />
        <DemoSticky {...{ x, y, theta }} />
      </div>
    )
  }
}

export default DemoThree
