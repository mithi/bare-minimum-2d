import React from 'react'
import { BareMinimum2d } from 'bare-minimum-2d'

const X_RANGE = 1000
const Y_RANGE = 2000
const OFFSET = 20
const BACKGROUND_COLOR = '#2f3542'
const LINE_COLOR = '#ff4757'
const BG_OPACITY = 1.0
const LINE_OPACITY = 0.75
const LINE_SIZE = 2
const ANIMATION_DELAY = 10
const RANDOMNESS = 1000
const IMAGE_SIZE = '400px'
const CONTAINER = {
  color: BACKGROUND_COLOR,
  opacity: BG_OPACITY,
  xRange: X_RANGE,
  yRange: Y_RANGE
}

const STICKY_DIV_STYLE = {
  position: 'fixed',
  top: 0,
  fontSize: 10,
  color: LINE_COLOR
}

class DemoTwo extends React.PureComponent {
  intervalID = null
  t = Math.floor(Math.random() * RANDOMNESS)
  state = {
    data: []
  }

  componentDidMount() {
    this.intervalID = setInterval(this.animate, ANIMATION_DELAY)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  animate = () => {
    this.setState({
      data: [linesInFrame(this.t)]
    })
    this.t++
  }

  render() {
    return (
      <div style={{ width: '100%', height: IMAGE_SIZE }}>
        <BareMinimum2d container={CONTAINER} data={this.state.data} />
        <div style={STICKY_DIV_STYLE}>{this.t}</div>
      </div>
    )
  }
}

const linesInFrame = (t) => {
  let [x0, x1, y0, y1] = [[], [], [], []]

  for (let i = 0; i < 100; i++) {
    x0.push(fx0(t + i))
    y0.push(fy0(t + i))
    x1.push(fx1(t + i) + OFFSET)
    y1.push(fy1(t + i) + OFFSET)
  }

  return {
    x0,
    y0,
    x1,
    y1,
    size: LINE_SIZE,
    color: LINE_COLOR,
    opacity: LINE_OPACITY,
    type: 'lines',
    id: 'animating-lines-with-patterns'
  }
}

const fx0 = (t) =>
  Math.sin(t / 10) * 125 + Math.sin(t / 20) * 125 + Math.sin(t / 30) * 125

const fy0 = (t) =>
  Math.cos(t / 10) * 125 + Math.cos(t / 20) * 125 + Math.cos(t / 30) * 125

const fx1 = (t) =>
  Math.sin(t / 15) * 125 + Math.sin(t / 25) * 125 + Math.sin(t / 35) * 125

const fy1 = (t) =>
  Math.cos(t / 15) * 125 + Math.cos(t / 25) * 125 + Math.cos(t / 35) * 125

export default DemoTwo
