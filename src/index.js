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

/**************************
 * POINTS
 **************************/
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

/**************************
 * LINES
 **************************/
const Lines = ({ size, color, opacity, x0, x1, y0, y1, id }) => {
  const d = x0.reduce((currentD, rawX0, i) => {
    const [currentX0, currentX1, currentY0, currentY1] = [
      transformX(rawX0, XRANGE),
      transformX(x1[i], XRANGE),
      transformY(y0[i], YRANGE),
      transformY(y1[i], YRANGE)
    ]
    return `${currentD} M ${currentX0},${currentY0} L ${currentX1},${currentY1} `
  }, '')

  console.log('path', d)
  return (
    <path d={d} stroke={color} strokeWidth={size} opacity={opacity} id={id} />
  )
}

const BareMinimum2d = ({ container, data }) => {
  XRANGE = container.xRange
  YRANGE = container.yRange
  const view = `0 0 ${container.xRange} ${container.yRange}`

  const pointSets = data.filter((elementSet) => elementSet.type === 'points')
  const lineSets = data.filter((elementSet) => elementSet.type === 'lines')
  const props = lineSets[0]
  return (
    <svg {...svgProps} viewBox={view}>
      <Paper container={container} />
      <PointDefinitions pointSets={pointSets} />
      <Points pointSets={pointSets} />
      <Lines {...props} />
    </svg>
  )
}

export { BareMinimum2d }
