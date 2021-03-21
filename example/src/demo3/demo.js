import React from 'react'
import BareMinimum2d from 'bare-minimum-2d'
import { URL_SOURCE_CODE_DEMO3 } from '../links'

import {
  pickRandom,
  skewedRandom,
  rotatedLine,
  NINETEEN_COLORS,
  SIX_COLORS,
  THREE_SIZES
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

const Triangle = ({ x, y, transforms, size, color, opacity, id, i }) => {
  const cx = transforms.tx(x)
  const cy = transforms.ty(y)
  const ySize = size * 0.8626
  return (
    <polygon
      {...{
        opacity,
        id: `${id}-${i}`,
        fill: color
      }}
      points={[
        `${cx},${cy - ySize}`,
        `${cx + size},${cy + ySize}`,
        `${cx - size},${cy + ySize}`
      ].join(' ')}
    />
  )
}

const trianglesPlugin = {
  triangles: (element, transforms) => {
    const { size, color, opacity, id } = element
    return element.x.map((x, i) => (
      <Triangle
        {...{
          x,
          y: element.y[i],
          size,
          color,
          opacity,
          id,
          i,
          transforms
        }}
        key={`${id}-${i}`}
      />
    ))
  }
}

const DemoSticky = ({ x, y, theta }) => (
  <div style={{ position: 'fixed' }} className='sticky-div'>
    <p>
      Move your cursor to spin the pinwheel.
      <br />
      BareMinimum2d can be used for interactive applications.
      <br />
      You can also add your pass your own shape implementation as a plugin.
    </p>
    <p>
      x: {x}
      <br />
      y: {y}
      <br /> theta:{((theta * 180) / Math.PI).toFixed(2)}
    </p>
    <p>
      <a href={URL_SOURCE_CODE_DEMO3} target='_blank' rel='noopener noreferrer'>
        Source code
      </a>
    </p>
  </div>
)

const CONTAINER = {
  color: '#b71540',
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

  savedColorsPolygon = Array.apply(null, Array(2)).map((_) =>
    pickRandom(SIX_COLORS)
  )
  L1 = { x0: -R, y0: 0, x1: R, y1: 0 }
  L2 = { x0: 0, y0: -R, x1: 0, y1: R }

  update(theta) {
    const newColors = this.savedColors.map((color) =>
      skewedRandom(NINETEEN_COLORS, color)
    )

    const newColorsPolygon = this.savedColorsPolygon.map((color) =>
      skewedRandom(SIX_COLORS, color)
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
      fillColor: newColorsPolygon[1],
      fillOpacity: 1,
      borderColor: newColorsPolygon[0],
      borderOpacity: 1.0,
      borderSize: newSizes[11],
      type: 'polygon',
      id: 'body'
    }

    const lines = {
      x0: [line1.x0, line2.x0],
      y0: [line1.y0, line2.y0],
      x1: [line1.x1, line2.x1],
      y1: [line1.y1, line2.y1],
      color: newColors[10],
      opacity: 1.0,
      size: newSizes[10],
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
      size: newSizes[i],
      color: newColors[i],
      type: i === 0 || i === 5 ? 'triangles' : 'points',
      id: 'points' + i
    }))

    this.savedColors = newColors
    this.savedSizes = newSizes
    this.savedColorsPolygon = newColorsPolygon

    return [polygon, lines, ...newPoints]
  }
}
class Demo extends React.Component {
  h = window.innerHeight
  theta = 0
  pinWheel = new PinWheelShapesManager()
  state = {
    x: 0,
    y: 0,
    data: []
  }

  _onMouseMove(e) {
    const x = e.nativeEvent.offsetX
    const y = e.nativeEvent.offsetY
    const w = window.innerWidth
    const h = window.innerHeight

    const currentX = w / 2 - x
    const currentY = h / 2 - y
    this.theta = Math.atan2(currentY, currentX)

    this.h = h
    const data = this.pinWheel.update(this.theta)

    this.setState({
      x: currentX,
      y: currentY,
      data
    })
  }

  componentDidMount() {
    this.setState({ data: this.pinWheel.update(0) })
  }
  render() {
    const { x, y, data } = this.state
    const divDimensionsStyle = { width: '100%', height: this.h }

    return (
      <div
        style={divDimensionsStyle}
        onMouseMove={this._onMouseMove.bind(this)}
      >
        <BareMinimum2d
          {...{ data, container: CONTAINER }}
          plugins={[trianglesPlugin]}
        />
        <DemoSticky {...{ x, y, theta: this.theta }} />
      </div>
    )
  }
}

export default Demo
