# A Bare Minimum 2D Plotter

> An extremely lightweight React component for plotting points, lines, ellipses, and polygons on an inline SVG

[![NPM](https://img.shields.io/npm/v/bare-minimum-2d.svg)](https://www.npmjs.com/package/bare-minimum-2d)
[![MINIFIED](https://img.shields.io/bundlephobia/min/bare-minimum-2d@0.2.0?color=%2300BCD4&label=minified)](https://bundlephobia.com/result?p=bare-minimum-2d@0.2.0)
[![GZIPPED](https://img.shields.io/bundlephobia/minzip/bare-minimum-2d@0.2.0?color=%2300BCD4&label=minified%20%2B%20gzipped)](https://bundlephobia.com/result?p=bare-minimum-2d@0.2.0)

## Demo Applications

| Responsive Illustrations                                                            | On-The-Fly Animations                                                               | Interactive Applications                                                            |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [<img src="./example/src/demo1/demo.svg" height="300px" width="300px">][demo_link1] | [<img src="./example/src/demo2/demo.svg" height="300px" width="300px">][demo_link2] | [<img src="./example/src/demo3/demo.svg" height="300px" width="300px">][demo_link3] |
| [demo][demo_link1]                                                                  | [demo][demo_link2]                                                                  | [demo][demo_link3]                                                                  |
| [source code][source_link1]                                                         | [source code][source_link2]                                                         | [source code][source_link3]                                                         |

[demo_link1]: https://bare-minimum-2d.netlify.app/demo1
[demo_link2]: https://bare-minimum-2d.netlify.app/demo2
[demo_link3]: https://bare-minimum-2d.netlify.app/demo3
[source_link1]: https://github.com/mithi/bare-minimum-2d/blob/master/example/src/demo1/demo.js
[source_link2]: https://github.com/mithi/bare-minimum-2d/blob/master/example/src/demo2/demo.js
[source_link3]: https://github.com/mithi/bare-minimum-2d/blob/master/example/src/demo3/demo.js

## Install

```bash
npm install --save bare-minimum-2d
```

## Usage

This is [an example](./example/src/demo1/demoProps.js) of what you can pass to a `BareMinimum2d` component.
You pass it like so:

```jsx
import BareMinimum2d from 'bare-minimum-2d'

<div style={{ width: '100%', height: '100vh' }}>
  <BareMinimum2d {...{ data, container }} />
</div>
```

The component takes the dimensions of its parent and is always centered

## Everything you need to know explained in two minutes

A `BareMinimum2d` component only has two props: `container` and `data`.
`container` is a small hash-like type object with exactly four elements. `data` is an array containing hash-like objects.

Example:

```jsx
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
  id: 'center'
}]

<div style={{ width: "100%", height: "100vh" }}>
  <BareMinimum2d {...{ data, container }} />
</div>
```

`container.color` and `container.opacity` specifies the canvas color of `BareMinimum2d`.

The cartesian coordinate system of `BareMinimum` will follow the
diagram below given `container.xRange` and `container.yRange`.
Position (0, 0) will always be at the center of the rendered component.

```js
                  yRange/2
                     |
                     |
  -xRange/2 -------(0,0)--------- xRange/2
                     |
                     |
                   -yRange/2
```

Please take a look at more [complex example data prop](./example/src/demo1/demoProps.js) to get the idea.

Each element of the array `data` should be a hash-like object
with a `type` key which should have a value that is one of
the following:

| points | ellipse  | lines  | polygons |
| ------ | -------- | ------ | -------- |
| plural | singular | plural | singular |

Elements of the `data` array will be stacked based on the order they are declared.
The first element will be at the most bottom layer while the last element of the array will be at the top.

All attributes are ALWAYS required, nothing is optional because there are no default values. The `id` attribute must be unique for each element of the `data` array.

END

## License

MIT © [Mithi](https://github.com/mithi)
