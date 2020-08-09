import React from 'react'
import { ResizeObserver } from '@juggle/resize-observer'
import { BareMinimum2d } from 'bare-minimum-2d'
import DEMO_PROPS from './demoProps'

/*****
 DEMO #1

 This demo shows that the BareMinimum2d component
 takes the dimensions of its parent component

 It also illustrates the data structure of the passed props
 as props to BareMinimum2d and the resulting svg which is
 be pretty expressive

 Checkout demoProps.js and demo.svg located at this same directory

 This component which wraps < BareMinimum2d /> uses ResizeObserver
 to listen for changes in dimensions of its width
 (to display it to the user) when changed, whenever this occurs
 we take this opportunity to get the document window's height
 and sync it to the height of the component.

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
    [Go back]
    <br />
    Resize the window.
    <br />
    BareMinimum2d takes the dimensions of its parent.
    <br />
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
