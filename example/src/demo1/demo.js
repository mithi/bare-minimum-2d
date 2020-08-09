import React from 'react'
import { ResizeObserver } from '@juggle/resize-observer'
import { BareMinimum2d } from 'bare-minimum-2d'
import DEMO_PROPS from './demoProps'

const STICKY_DIV_STYLE = {
  position: 'fixed',
  top: 0,
  fontSize: 10,
  color: '#32ff7e'
}
class DemoOne extends React.PureComponent {
  resizeObserver = null
  element = React.createRef()
  width = '100%'

  state = {
    height: window.innerHeight
  }

  componentDidMount() {
    this.resizeObserver = new ResizeObserver((entries, _) => {
      for (let entry of entries) {
        const { inlineSize } = entry.contentBoxSize
        const { width } = entry.contentRect
        this.setState({
          width: inlineSize || width,
          height: window.innerHeight
        })
      }
    })
    this.resizeObserver.observe(this.element.current)
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect()
  }

  render() {
    const height = this.state.height
    const containerStyle = { height, width: this.width }

    return (
      <div ref={this.element} style={containerStyle}>
        <BareMinimum2d
          data={DEMO_PROPS.data}
          container={DEMO_PROPS.container}
        />
        <div style={STICKY_DIV_STYLE}>
          {height}x{this.state.width}
        </div>
      </div>
    )
  }
}

export default DemoOne
