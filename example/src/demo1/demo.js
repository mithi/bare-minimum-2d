import React from 'react'
import { ResizeObserver } from '@juggle/resize-observer'
import { BareMinimum2d } from 'bare-minimum-2d'
import DEMO_PROPS from './demoProps'

/*****
 DEMO #1

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
const STICKY_DIV_STYLE = {
  position: 'fixed',
  top: 0,
  fontSize: 10,
  color: '#32ff7e',
  paddingLeft: '5px'
}

const DemoSticky = ({ height, width }) => (
  <div style={STICKY_DIV_STYLE}>
    Go back. See Props Used. Source code.
    <p>
      Resize the window. BareMinimum2d
      <br />
      takes the dimensions of its parent
      <br />
      and it will always be centered.
      <br />
      Use it to draw as many polygons, lines,
      <br />
      ellipses and points as you like.
      <br />
    </p>
    {height} x {width}
  </div>
)

class Demo extends React.PureComponent {
  resizeObserver = null
  element = React.createRef()
  width = '100%'

  state = {
    height: window.innerHeight
  }

  componentDidMount() {
    this.resizeObserver = new ResizeObserver((entries, _) => {
      const { inlineSize } = entries[0].contentBoxSize
      const { width } = entries[0].contentRect
      this.setState({
        height: window.innerHeight
      })
      this.width = inlineSize || width
    })
    this.resizeObserver.observe(this.element.current)
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect()
  }

  render() {
    const { height } = this.state

    return (
      <div ref={this.element} style={{ height, width: '100%' }}>
        <BareMinimum2d
          data={DEMO_PROPS.data}
          container={DEMO_PROPS.container}
        />
        <DemoSticky {...{ height, width: this.width }} />
      </div>
    )
  }
}

export default Demo
