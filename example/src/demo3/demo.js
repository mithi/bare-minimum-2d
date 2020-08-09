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
 *****/

const CONTAINER = {
  color: pickRandom(NINETEEN_COLORS),
  opacity: 1.0,
  xRange: 1000,
  yRange: 1000
}

const R = 200

class PinWheelShapesManager {
  oldPointColor = NINETEEN_COLORS[1]
  oldPointSize = THREE_SIZES[1]
  oldPoint2Color = NINETEEN_COLORS[0]
  oldPoint2Size = THREE_SIZES[0]
  oldPlusColor = NINETEEN_COLORS[2]
  oldPlusSize = THREE_SIZES[2]

  L1 = { x0: -R, y0: 0, x1: R, y1: 0 }
  L2 = { x0: 0, y0: -R, x1: 0, y1: R }

  update(theta) {
    const line1 = rotatedLine(this.L1, -theta)
    const line2 = rotatedLine(this.L2, -theta)
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
      id: 'points-1'
    }

    const points2 = {
      x: [line1.x0, line1.x1, line2.x0, line2.x1],
      y: [line1.y0, line1.y1, line2.y0, line2.y1],
      color: skewedRandom(NINETEEN_COLORS, this.oldPoint2Color),
      opacity: 1.0,
      size: skewedRandom(THREE_SIZES, this.oldPoint2Size),
      type: 'points',
      id: 'points-2'
    }

    this.oldPointColor = points.color
    this.oldPointSize = points.size
    this.oldPoint2Color = points2.color
    this.oldPoint2Size = points2.size

    this.oldPlusColor = lines.color
    this.oldPlusSize = points.size

    return [points, points2, lines]
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
