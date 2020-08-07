import React from 'react'

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
const PointDefinition = ({ size, color, opacity, id }) => (
  <circle cx={0} cy={0} r={size} fill={color} opacity={opacity} id={id} />
)
const PointDefinitions = ({ sets }) => {
  const pointDefinitions = sets.map((elementSet) => (
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

const Points = ({ sets }) =>
  sets.reduce(
    (points, pointSet) => [...points, createPointInstances(pointSet)],
    []
  )

/**************************
 * LINES
 **************************/
const LineSet = ({ size, color, opacity, x0, x1, y0, y1, id }) => {
  const d = x0.reduce((currentD, rawX0, i) => {
    const [currentX0, currentX1, currentY0, currentY1] = [
      transformX(rawX0, XRANGE),
      transformX(x1[i], XRANGE),
      transformY(y0[i], YRANGE),
      transformY(y1[i], YRANGE)
    ]
    return `${currentD} M ${currentX0},${currentY0} L ${currentX1},${currentY1} `
  }, '')

  return (
    <path d={d} stroke={color} strokeWidth={size} opacity={opacity} id={id} />
  )
}

const Lines = ({ sets }) =>
  sets.map((lineSet) => <LineSet {...lineSet} key={lineSet.id} />)

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
  id
}) => {
  const pointString = x.reduce((pointString, rawX, i) => {
    const currentX = transformX(rawX, XRANGE)
    const currentY = transformY(y[i], YRANGE)
    return `${pointString}${currentX},${currentY} `
  }, '')

  return (
    <polygon
      points={pointString}
      fill={fillColor}
      fillOpacity={fillOpacity}
      stroke={borderColor}
      strokeWidth={borderSize}
      strokeOpacity={borderOpacity}
      id={id}
    />
  )
}
const Polygons = ({ sets }) =>
  sets.map((polygon) => <Polygon {...polygon} key={polygon.id} />)

/**************************
 * Minimal Plot
 **************************/

const filterSet = (data, type) =>
  data.filter((dataSet) => dataSet.type === type)

const BareMinimum2d = ({ container, data }) => {
  XRANGE = container.xRange
  YRANGE = container.yRange
  const view = `0 0 ${container.xRange} ${container.yRange}`

  const pointSets = filterSet(data, 'points')
  const lineSets = filterSet(data, 'lines')
  const polygonSets = filterSet(data, 'polygon')

  return (
    <svg {...svgProps} viewBox={view}>
      <Paper container={container} />
      <PointDefinitions sets={pointSets} />
      <Polygons sets={polygonSets} />
      <Lines sets={lineSets} />
      <Points sets={pointSets} />
    </svg>
  )
}

/**************************
 * Full Height Plot
 **************************/

const FullHeightPlot = ({ container, data, width }) => {
  const [height, setHeight] = React.useState(window.innerHeight)
  const [widthText, setWidthText] = React.useState('?')

  const myRef = React.useRef(null)

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setHeight(window.innerHeight)
      setWidthText(myRef.current ? myRef.current.offsetWidth : `?`)
    }, 200)

    window.addEventListener('resize', debouncedHandleResize)

    return (_) => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [setHeight, setWidthText])

  return (
    <div ref={myRef} style={{ height, width }}>
      <BareMinimum2d data={data} container={container} />
      <div style={{ position: 'fixed', top: 0, fontSize: 10 }}>
        {height}x{widthText}
      </div>
    </div>
  )
}

function debounce(fn, ms) {
  let timer
  return (_) => {
    clearTimeout(timer)
    timer = setTimeout((_) => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  }
}

export { BareMinimum2d, FullHeightPlot }
