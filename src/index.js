import React from 'react'
import { Polygon, Ellipse, Lines, Point } from './shapes'

const elementTypeImplementations = {
  lines: (element, transforms) => (
    <Lines {...element} {...{ transforms }} key={element.id} />
  ),
  polygon: (element, transforms) => (
    <Polygon {...element} {...{ transforms }} key={element.id} />
  ),
  ellipse: (element, transforms) => (
    <Ellipse {...element} {...{ transforms }} key={element.id} />
  ),
  point: (element, transforms) => {
    const { size, color, opacity, id } = element
    return element.x.map((x, i) => (
      <Point
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

const svgProps = {
  version: '1.1',
  baseProfile: 'full',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid slice',
  width: '100%',
  height: '100%'
}

const Paper = ({ color, opacity }) => (
  <rect width='100%' height='100%' fill={color} opacity={opacity} />
)

const svgElements = (data, transforms, plugins) => {
  plugins = plugins || []

  const extendedElementTypeImplementations = plugins.reduce(
    (extended, plugin) => {
      return { ...extended, ...plugin }
    },
    elementTypeImplementations
  )

  const elements = data.map((element) => {
    const implementation = extendedElementTypeImplementations[element.type]
    return implementation(element, transforms)
  })
  return elements.flat()
}
/**************************
 * Minimal Plot
 **************************/

class BareMinimum2d extends React.PureComponent {
  xRange = null
  yRange = null

  /***
                  yRange/2
                     |
                     |
  -xRange/2 -------(0,0)--------- xRange/2
                     |
                     |
                   -yRange/2
  ***/

  transformX = (x) => x + this.xRange / 2
  transformY = (y) => this.yRange / 2 - y

  render() {
    const { container, data, plugins } = this.props
    this.xRange = container.xRange
    this.yRange = container.yRange

    const transforms = {
      tx: this.transformX,
      ty: this.transformY
    }

    const viewBox = `0 0 ${container.xRange} ${container.yRange}`
    const { color, opacity } = container

    return (
      <svg {...svgProps} {...{ viewBox }}>
        <Paper {...{ color, opacity }} />
        {svgElements(data, transforms, plugins)}
      </svg>
    )
  }
}

export default BareMinimum2d
