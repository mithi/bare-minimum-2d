import React from 'react'
import BareMinimum2d from 'bare-minimum-2d'
import DEMO_PROPS from './demoProps'
import { URL_SOURCE_CODE_DEMO1, URL_SOURCE_PROPS_DEMO1 } from '../links'
import { useEffect, useState } from 'react'

// Adapted from: https://usehooks.com/useWindowSize/
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })

    window.addEventListener('resize', handleResize)
    handleResize() // call it right away!

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

/*****
DEMO #1

In this demo, simple points, lines, ellipses and polygons are drawn.

This demo shows that the BareMinimum2d component
takes the dimensions of its parent component
and will always scale and be centered.

Check out the data structure of the props passed
to BareMinimum2d and the resulting svg
which are located at this same directory.
They're named demoProps.js and demo.svg respectively.

This component which wraps < BareMinimum2d /> uses ResizeObserver
to listen for changes in dimensions of its width
(to display it to the user) when changed, whenever this occurs
we take this opportunity to get the document window's height
and sync it to the height of this component.

 *****/

const DemoSticky = ({ height, width }) => (
  <div style={{ position: 'fixed' }} className='sticky-div'>
    <p>
      Resize the window.
      <br />
      {height} x {width}
      <br />
    </p>
    <p>
      BareMinimum2d takes the dimensions of
      <br />
      its parent and it will always be centered.
      <br />
    </p>
    <p>
      Use BareMinimum2d to specify as many polygons,
      <br />
      lines, ellipses and points as you like.
    </p>
    <a href={URL_SOURCE_CODE_DEMO1} target='_blank' rel='noopener noreferrer'>
      Source code
    </a>
    <br />
    <a href={URL_SOURCE_PROPS_DEMO1} target='_blank' rel='noopener noreferrer'>
      Props
    </a>
  </div>
)

const Demo = () => {
  const { width, height } = useWindowSize()

  return (
    <div style={{ height, width }}>
      <BareMinimum2d data={DEMO_PROPS.data} container={DEMO_PROPS.container} />
      <DemoSticky {...{ width, height }} />
    </div>
  )
}

export default Demo
