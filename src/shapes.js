import React from 'react'

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

export { PointDefinitions, Points, Lines, Polygons }
