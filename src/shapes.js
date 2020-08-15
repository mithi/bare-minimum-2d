import React from 'react'

/**************************
 * POINT
 **************************/
const Point = ({ x, y, transforms, size, color, opacity, id, i }) => (
  <circle
    {...{
      opacity,
      id: `${id}-${i}`,
      cx: transforms.tx(x),
      cy: transforms.ty(y),
      r: size,
      fill: color
    }}
  />
)

/**************************
 * LINES
 **************************/
const Lines = ({ size, color, opacity, x0, x1, y0, y1, transforms, id }) => {
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

/**************************
 * POLYGON
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

/**************************
 * ELLIPSE
 **************************/
const Ellipse = ({
  cx,
  cy,
  rx,
  ry,
  theta,
  fillColor,
  fillOpacity,
  borderColor,
  borderOpacity,
  borderSize,
  transforms,
  id
}) => {
  const newCx = transforms.tx(cx)
  const newCy = transforms.ty(cy)

  const props = {
    cx: newCx,
    cy: newCy,
    rx,
    ry,
    fill: fillColor,
    stroke: borderColor,
    strokeWidth: borderSize,
    strokeOpacity: borderOpacity,
    id,
    fillOpacity,
    transform: `rotate(${theta}, ${newCx}, ${newCy})`
  }
  return <ellipse {...props} />
}

export { Point, Lines, Polygon, Ellipse }
