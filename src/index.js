import React from 'react'
// import styles from './styles.module.css'

const BareMinimum2d = (props) => {
  return (
    <svg
      version='1.1'
      baseProfile='full'
      width={1000}
      height={500}
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='100%' height='100%' fill={props.color} opacity={0.6} />
      <circle cx={150} cy={100} r='80' fill='#00ffff' />
      <text x={150} y={125} fontSize='50' textAnchor='middle' fill='#ff00ff'>
        Hello World!
      </text>
    </svg>
  )
}

export { BareMinimum2d }
