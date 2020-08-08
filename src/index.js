import React from 'react'

const svgProps = {
  version: '1.1',
  baseProfile: 'full',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid slice',
  width: '100%',
  height: '100%'
}
/***
                  yRange/2
                     |
                     |
  -xRange/2 -------(0,0)--------- xRange/2
                     |
                     |
                   -yRange/2
  ***/
const Paper = ({ container }) => (
  <rect
    width='100%'
    height='100%'
    fill={container.color}
    opacity={container.opacity}
  />
)

/**************************
 * POINTS
 **************************/

const PointDefinitions = ({ sets }) => {
  const pointDefinitions = sets.map(({ size, color, opacity, id }) => {
    const props = { opacity, id, cx: 0, cy: 0, r: size, fill: color }
    return <circle {...props} key={id} />
  })
  return <defs>{pointDefinitions}</defs>
}

const createPointInstances = (points, transforms) => {
  return points.x.map((x, i) => {
    return (
      <use
        x={transforms.tx(x)}
        y={transforms.ty(points.y[i])}
        href={`#${points.id}`}
        key={points.id + i}
      />
    )
  })
}

const Points = ({ sets, transforms }) =>
  sets.reduce(
    (points, pointSet) => [
      ...points,
      createPointInstances(pointSet, transforms)
    ],
    []
  )

/**************************
 * LINES
 **************************/
const LineSet = ({ size, color, opacity, x0, x1, y0, y1, transforms, id }) => {
  const d = x0.reduce((currentD, rawX0, i) => {
    const [currentX0, currentX1, currentY0, currentY1] = [
      transforms.tx(rawX0),
      transforms.tx(x1[i]),
      transforms.ty(y0[i]),
      transforms.ty(y1[i])
    ]
    return `${currentD} M ${currentX0},${currentY0} L ${currentX1},${currentY1} `
  }, '')

  return <path d={d} stroke={color} strokeWidth={size} {...{ opacity, id }} />
}

const Lines = ({ sets, transforms }) =>
  sets.map((lineSet) => (
    <LineSet {...lineSet} {...{ transforms }} key={lineSet.id} />
  ))

/**************************
 * Polygon
 **************************/

const Polygon = ({
  x,
  y,
  fillColor,
  fillOpacity,
  borderColor,
  borderOpacity,
  borderSize,
  transforms,
  id
}) => {
  const pointString = x.reduce((pointString, rawX, i) => {
    const currentX = transforms.tx(rawX)
    const currentY = transforms.ty(y[i])
    return `${pointString}${currentX},${currentY} `
  }, '')

  const props = {
    points: pointString,
    fill: fillColor,
    stroke: borderColor,
    strokeWidth: borderSize,
    strokeOpacity: borderOpacity,
    id,
    fillOpacity
  }
  return <polygon {...props} />
}
const Polygons = ({ sets, transforms }) =>
  sets.map((polygon) => (
    <Polygon {...polygon} {...{ transforms }} key={polygon.id} />
  ))

/**************************
 * Minimal Plot
 **************************/

const filterSet = (data, type) =>
  data.filter((dataSet) => dataSet.type === type)

class BareMinimum2d extends React.PureComponent {
  container = null

  transformX = (x) => x + this.container.xRange / 2
  transformY = (y) => this.container.yRange / 2 - y

  render() {
    const { container, data } = this.props
    this.container = container

    const viewBox = `0 0 ${container.xRange} ${container.yRange}`
    const pointSets = filterSet(data, 'points')
    const lineSets = filterSet(data, 'lines')
    const polygonSets = filterSet(data, 'polygon')

    const transforms = {
      tx: this.transformX,
      ty: this.transformY
    }

    return (
      <svg {...svgProps} {...{ viewBox }}>
        <Paper {...{ container }} />
        <PointDefinitions sets={pointSets} />
        <Polygons sets={polygonSets} {...{ transforms }} />
        <Lines sets={lineSets} {...{ transforms }} />
        <Points sets={pointSets} {...{ transforms }} />
      </svg>
    )
  }
}
export { BareMinimum2d }
