import React from 'react'
// import styles from './styles.module.css'

let XRANGE = null
let YRANGE = null

// canvasX = x  + xRangeMin
const transformX = (x, xRange) => x + xRange / 2

// canvasY = yRangeMax - y
const transformY = (y, yRange) => yRange / 2 - y

const svgProps = {
  version: '1.1',
  baseProfile: 'full',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMinYMid slice',
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

const PointDefinition = ({ size, color, opacity, id }) => (
  <circle cx={0} cy={0} r={size} fill={color} opacity={opacity} id={id} />
)
const PointDefinitions = ({ pointSets }) => {
  const pointDefinitions = pointSets.map((elementSet) => (
    <PointDefinition {...elementSet} key={elementSet.id} />
  ))
  return <defs>{pointDefinitions}</defs>
}

const createPointInstances = (points) => {
  return points.x.map((x, i) => {
    return (
      <use
        x={transformX(x, XRANGE)}
        y={transformY(points.y[i], YRANGE)}
        href={`#${points.id}`}
        key={points.id + i}
      />
    )
  })
}

const Points = ({ pointSets }) =>
  pointSets.reduce(
    (points, pointSet) => [...points, createPointInstances(pointSet)],
    []
  )

const BareMinimum2d = ({ container, data }) => {
  XRANGE = container.xRange
  YRANGE = container.yRange
  const view = `0 0 ${container.xRange} ${container.yRange}`

  const pointSets = data.filter((elementSet) => elementSet.type === 'points')

  return (
    <svg {...svgProps} viewBox={view}>
      <Paper container={container} />
      <PointDefinitions pointSets={pointSets} />
      <Points pointSets={pointSets} />
    </svg>
  )
}

export { BareMinimum2d }
