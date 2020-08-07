import React from 'react'
// import styles from './styles.module.css'

const Paper = ({ color, opacity }) => (
  <rect width='100%' height='100%' fill={color} opacity={opacity} />
)

const svgProps = {
  version: '1.1',
  baseProfile: 'full',
  xmlns: 'http://www.w3.org/2000/svg'
}

const BareMinimum2d = ({ container }) => {
  return (
    <svg {...svgProps} width='100%' height='100%'>
      <Paper color={container.color} opacity={container.opacity} />
    </svg>
  )
}

export { BareMinimum2d }
