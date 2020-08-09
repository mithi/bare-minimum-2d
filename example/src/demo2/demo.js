import React from 'react'
import { BareMinimum2d } from 'bare-minimum-2d'
import * as p from './params'
/*****
 DEMO #2
 This demo shows that BareMinimum2d can be used
 for on-the-fly animations.

 Lines are updated every 15 milliseconds generating an interesting pattern

 demo.svg in this directory is is a snapshot of
 of one of the animation frames generated

 *****/

const DemoSticky = ({ t }) => (
  <div style={{ position: 'fixed', color: '#ffffff' }} className='sticky-div'>
    Source code.
    <br />
    BareMinimum2d can be used for on-the-fly animations
    <br />
    {t}
  </div>
)

class Demo extends React.PureComponent {
  intervalID = null
  t = Math.floor(Math.random() * p.RANDOMNESS)
  state = {
    data: []
  }

  componentDidMount() {
    this.intervalID = setInterval(this.animate, p.ANIMATION_DELAY)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  animate = () => {
    this.setState({
      data: [linesInFrame(this.t)]
    })
    this.t = (this.t + 1) % p.MAX_T
  }

  render() {
    return (
      <div style={{ width: '100%', height: p.IMAGE_SIZE }}>
        <BareMinimum2d container={p.CONTAINER} data={this.state.data} />
        <DemoSticky t={this.t} />
      </div>
    )
  }
}

const linesInFrame = (t) => {
  let [x0, x1, y0, y1] = [[], [], [], []]

  for (let i = 0; i < 100; i++) {
    x0.push(fx0(t + i))
    y0.push(fy0(t + i))
    x1.push(fx1(t + i) + p.OFFSET)
    y1.push(fy1(t + i) + p.OFFSET)
  }

  return {
    x0,
    y0,
    x1,
    y1,
    size: p.LINE_SIZE,
    color: p.LINE_COLOR,
    opacity: p.LINE_OPACITY,
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

export default Demo
