import React from 'react'
// import styles from './styles.module.css'

const Paper = ({ container }) => (
  <rect
    width='100%'
    height='100%'
    fill={container.color}
    opacity={container.opacity}
  />
)

const svgProps = {
  version: '1.1',
  baseProfile: 'full',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMinYMid slice',
  width: '100%',
  height: '100%'
}

const transformX = (x, xRange) => x + xRange / 2
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

const BareMinimum2d = ({ container }) => {
  const cx = transformX(-50, container.xRange)
  const cy = transformY(50, container.yRange)

  const view = `0 0 ${container.xRange} ${container.yRange}`
  return (
    <svg {...svgProps} viewBox={view}>
      <Paper container={container} />
      <circle
        cx={cx}
        cy={cy}
        r='10'
        stroke='black'
        strokeWidth='3'
        fill='red'
      />
    </svg>
  )
}

export { BareMinimum2d }
