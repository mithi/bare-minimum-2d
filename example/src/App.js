import React from 'react'
import FullHeightPlot from './Example1'
import example1Props from './example1Props'

const App = () => {
  const props = example1Props
  return (
    <div>
      <FullHeightPlot {...props} width='50%' />
    </div>
  )
}

export default App
