import React from 'react'
import { ResizeObserver } from '@juggle/resize-observer'
import { BareMinimum2d } from 'bare-minimum-2d'
import DEMO_PROPS from './demo1props'

/**************************
 * DEMO1: FullWindow Plot
 **************************/

class DemoOne extends React.PureComponent {
  resizeObserver = null
  element = React.createRef()
  width = '100%'

  state = {
    height: window.innerHeight
  }

  componentDidMount() {
    this.resizeObserver = new ResizeObserver((entries, observer) => {
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
    const divTextStyle = {
      position: 'fixed',
      top: 0,
      fontSize: 10,
      color: '#32ff7e'
    }

    return (
      <div ref={this.element} style={containerStyle}>
        <BareMinimum2d
          data={DEMO_PROPS.data}
          container={DEMO_PROPS.container}
        />
        <div style={divTextStyle}>
          {height}x{this.state.width}
        </div>
      </div>
    )
  }
}

export default DemoOne
