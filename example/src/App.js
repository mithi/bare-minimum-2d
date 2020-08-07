import React from 'react'

import { BareMinimum2d } from 'bare-minimum-2d'
import 'bare-minimum-2d/dist/index.css'

const container = {
  color: '#ff00ff',
  opacity: 0.5,
}

const App = () => {
  const props = { container }
  return <div style={{height: "300px", width: "500px"}}><BareMinimum2d {...props} /></div>
}

export default App
