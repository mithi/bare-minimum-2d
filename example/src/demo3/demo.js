import React from 'react'
import { BareMinimum2d } from 'bare-minimum-2d'
import {
  pickRandom,
  skewedRandom,
  rotatedLine,
  NINETEEN_COLORS,
  THREE_SIZES,
  STICKY_DIV_STYLE
} from './utils'

/*****
 DEMO #3

 This demo shows that the BareMinimum2d component
 can be used for interactive applications

 The pinwheel's orientation, size and colors
 changes everytime you move your cursor

 A snapshot of an svg given a possible combination is
 also saved in this directory 'demo.svg'
 *****/

const CONTAINER = {
  color: pickRandom(NINETEEN_COLORS),
  opacity: 1.0,
  xRange: 1000,
  yRange: 1000
}

const R = 225
const numberOfColors = 15

class PinWheelShapesManager {
  savedColors = Array.apply(null, Array(numberOfColors)).map((_) =>
    pickRandom(NINETEEN_COLORS)
  )
  savedSizes = Array.apply(null, Array(numberOfColors)).map((_) =>
    pickRandom(THREE_SIZES)
  )
  L1 = { x0: -R, y0: 0, x1: R, y1: 0 }
  L2 = { x0: 0, y0: -R, x1: 0, y1: R }

  update(theta) {
    const newColors = this.savedColors.map((color) =>
      skewedRandom(NINETEEN_COLORS, color)
    )
    const newSizes = this.savedSizes.map((size) =>
      skewedRandom(THREE_SIZES, size)
    )

    const line1 = rotatedLine(this.L1, -theta)
    const line2 = rotatedLine(this.L2, -theta)
    const line3 = rotatedLine(this.L1, theta)
    const line4 = rotatedLine(this.L2, theta)

    const polygon = {
      x: [line3.x0, line4.x0, line3.x1],
      y: [line3.y0, line4.y0, line4.y1],
      fillColor: newColors[2],
      fillOpacity: 1,
      borderColor: newColors[1],
      borderOpacity: 1.0,
      borderSize: newSizes[1],
      type: 'polygon',
      id: 'body'
    }

    const lines = {
      x0: [line1.x0, line2.x0],
      y0: [line1.y0, line2.y0],
      x1: [line1.x1, line2.x1],
      y1: [line1.y1, line2.y1],
      color: newColors[0],
      opacity: 1.0,
      size: newSizes[0],
      type: 'lines',
      id: 'two-lines-center-cross'
    }

    const linePointsX = [line1.x0, line1.x1, line2.x0, line2.x1, 0]
    const linePointsY = [line1.y0, line1.y1, line2.y0, line2.y1, 0]

    const pointsX = [...linePointsX, ...linePointsX]
    const pointsY = [...linePointsY, ...linePointsY]
    const newPoints = pointsX.map((pointX, i) => ({
      x: [pointX],
      y: [pointsY[i]],
      opacity: 1.0,
      size: newSizes[i + 3],
      color: newColors[i + 3],
      type: 'points',
      id: 'points' + i
    }))

    this.savedColors = newColors
    this.savedSizes = newSizes

    return [...newPoints, lines, polygon]
  }
}

const DemoSticky = ({ x, y, theta }) => (
  <div style={STICKY_DIV_STYLE}>
    Go back. Source code.
    <br />
    BareMinimum2d is fast enough for interactive applications
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

class Demo extends React.Component {
  h = window.innerHeight
  theta = 0
  data = []
  pinWheel = new PinWheelShapesManager()
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
    this.data = this.pinWheel.update(theta)

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

export default Demo
