import React from 'react'
// import styles from './styles.module.css'

let XRANGE = null
let YRANGE = null

// canvasX = x  + xRangeMin
const transformX = (x, xRange) => x + xRange / 2

// canvasY = yRangeMax - y
const transformY = (y, yRange) => yRange / 2 - y

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

const Point = ({ size, color, opacity, id }) => (
  <circle cx={0} cy={0} r={size} fill={color} opacity={opacity} id={id} />
)
const createDefinition = (elementSet) => {
  if (elementSet.type === 'points') {
    return <Point {...elementSet} key={elementSet.id} />
  }
}

const Definitions = ({ data }) => {
  const definitions = data.map((elementSet) => createDefinition(elementSet))
  return <defs>{definitions}</defs>
}

const svgProps = {
  version: '1.1',
  baseProfile: 'full',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMinYMid slice',
  width: '100%',
  height: '100%'
}

const createElementInstances = (elements) => {
  return elements.x.map((x, i) => {
    return (
      <use
        x={transformX(x, XRANGE)}
        y={transformY(elements.y[i], YRANGE)}
        href={`#${elements.id}`}
        key={elements.id + i}
      />
    )
  })
}
const BareMinimum2d = ({ container, data }) => {
  XRANGE = container.xRange
  YRANGE = container.yRange
  const cx = transformX(20, container.xRange)
  const cy = transformY(10, container.yRange)
  const view = `0 0 ${container.xRange} ${container.yRange}`
  const elements = data.reduce((elementsArray, elementSet) => {
    const elementsSubArray = createElementInstances(elementSet)
    return [elementsArray, ...elementsSubArray]
  }, [])

  return (
    <svg {...svgProps} viewBox={view}>
      <Paper container={container} />
      <Definitions data={data} />
      <circle
        cx={cx}
        cy={cy}
        r='3'
        stroke='black'
        strokeWidth='2'
        fill='blue'
      />

      {elements}
    </svg>
  )
}

export { BareMinimum2d }
