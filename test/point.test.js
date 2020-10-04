import React from 'react'
import renderer from 'react-test-renderer'
import BareMinimum2d from 'bare-minimum-2d'

const container = {
    color: '#0000FF',
    opacity: 0.2,
    xRange: 300,
    yRange: 500
}

const data = [{
    x: [0],
    y: [-20],
    color: "#FFFFFF",
    opacity: 1.0,
    size: 10,
    type: 'points',
    id: 'sample'
}]

it('renders correctly', () => {
    const tree = renderer
        .create(<BareMinimum2d {...{ data, container }} />)
        .toJSON()
    expect(tree).toMatchSnapshot()
})
