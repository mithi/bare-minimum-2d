import React from 'react'
import { PointDefinitions, Points, Lines, Polygons } from './shapes'

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

/**************************
 * Minimal Plot
 **************************/

const filterSet = (data, type) =>
  data.filter((dataSet) => dataSet.type === type)

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
    const { container, data } = this.props
    this.xRange = container.xRange
    this.yRange = container.yRange

    const pointSets = filterSet(data, 'points')
    const lineSets = filterSet(data, 'lines')
    const polygonSets = filterSet(data, 'polygon')

    const transforms = {
      tx: this.transformX,
      ty: this.transformY
    }

    const viewBox = `0 0 ${container.xRange} ${container.yRange}`
    const { color, opacity } = container

    return (
      <svg {...svgProps} {...{ viewBox }}>
        <Paper {...{ color, opacity }} />
        <PointDefinitions sets={pointSets} />
        <Polygons sets={polygonSets} {...{ transforms }} />
        <Lines sets={lineSets} {...{ transforms }} />
        <Points sets={pointSets} {...{ transforms }} />
      </svg>
    )
  }
}
export { BareMinimum2d }
