import React from 'react'

import { BareMinimum2d } from 'bare-minimum-2d'
import 'bare-minimum-2d/dist/index.css'

const container = {
  color: '#0000FF',
  opacity: 0.2,
  xRange: 300,
  yRange: 300
}

const points1 = {
  x: [0, -50, -50, 50, 50],
  y: [0, -50, 50, 50, -50],
  color: 'red',
  size: 5,
  opacity: 0.75,
  type: 'points',
  id: 'redColor5'
}

const points2 = {
  x: [0, 0, 0, 0],
  y: [-20, -10, 10, 20],
  color: 'purple',
  size: 3,
  opacity: 0.75,
  type: 'points',
  id: 'purple3'
}

const App = () => {
  const props = { container, data: [points1, points2] }
  return (
    <div style={{ height: '300px', width: '700px' }}>
      <BareMinimum2d {...props} />
    </div>
  )
}

export default App
