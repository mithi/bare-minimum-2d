import React from 'react'
import { BareMinimum2d } from 'bare-minimum-2d'
import { ResizeObserver } from '@juggle/resize-observer'

/**************************
 * Full Height Plot
 **************************/

class FullHeightPlot extends React.PureComponent {
  resizeObserver = null
  element = React.createRef()
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
    const { width, data, container } = this.props
    const containerStyle = { height, width }
    const divTextStyle = { position: 'fixed', top: 0, fontSize: 10 }

    return (
      <div ref={this.element} style={containerStyle}>
        <BareMinimum2d data={data} container={container} />
        <div style={divTextStyle}>
          {height}x{this.state.width}
        </div>
      </div>
    )
  }
}

export default FullHeightPlot
