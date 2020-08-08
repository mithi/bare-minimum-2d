import React from 'react'
import { BareMinimum2d } from 'bare-minimum-2d'

const R = 150
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

const STICKY_DIV_STYLE = {
  position: 'fixed',
  top: 0,
  fontSize: 10,
  color: '#32ff7e'
}

const CONTAINER = {
  color: '#000000',
  opacity: 1.0,
  xRange: 1000,
  yRange: 1000
}

const rotatedLine = (line, theta) => {
  const x0 = line.x0 * Math.cos(theta) - line.y0 * Math.sin(theta)
  const y0 = line.x0 * Math.sin(theta) + line.y0 * Math.cos(theta)
  const x1 = line.x1 * Math.cos(theta) - line.y1 * Math.sin(theta)
  const y1 = line.x1 * Math.sin(theta) + line.y1 * Math.cos(theta)
  return { x0, y0, x1, y1 }
}

class DemoThree extends React.Component {
  state = {
    x: 0,
    y: 0,
    h: window.innerHeight,
    w: window.innerWidth,
    theta: 0,
    data: []
  }
  element = React.createRef()
  _onMouseMove(e) {
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY
    const w = window.innerWidth
    const h = window.innerHeight
    const currentX = w / 2 - x
    const currentY = h / 2 - y
    const theta = Math.atan2(currentY, currentX)
    const line1 = rotatedLine(L1, -theta)
    const line2 = rotatedLine(L2, -theta)
    const lines = {
      x0: [line1.x0, line2.x0],
      y0: [line1.y0, line2.y0],
      x1: [line1.x1, line2.x1],
      y1: [line1.y1, line2.y1],
      color: '#ffff00',
      opacity: 0.7,
      size: 15,
      type: 'lines',
      id: 'two-lines'
    }
    this.setState({ x: currentX, y: currentY, w, h, theta, data: [lines] })
  }

  render() {
    const { x, y, theta } = this.state
    return (
      <div
        style={{ width: '100%', height: this.state.h }}
        onMouseMove={this._onMouseMove.bind(this)}
      >
        <BareMinimum2d container={CONTAINER} data={this.state.data} />
        <div style={STICKY_DIV_STYLE}>
          x={x}
          <br />
          y={y}
          <br />
          a={((theta * 180) / Math.PI).toFixed(2)}
        </div>
      </div>
    )
  }
}

export default DemoThree
