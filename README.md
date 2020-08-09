# Bare Minimum 2D Plotter (WIP)

> A low-level and lightweight react component to declare and render points, lines, ellipses and polygons

[![NPM](https://img.shields.io/npm/v/bare-minimum-2d.svg)](https://www.npmjs.com/package/bare-minimum-2d)

## Features

- No dependencies, the only peer dependency is react
- Less than `3kB` gzipped, I think

```bash
$ npm run build
Build "bareMinimum2D" to dist:
       2.1 kB: index.js.gz
      1.82 kB: index.js.br
      2.04 kB: index.modern.js.gz
      1.76 kB: index.modern.js.br
```

## Install

```bash
npm install --save bare-minimum-2d
```

## Usage

- Read this BareMinimum2d [Core concepts on two minutes](./core-concepts.md)
- These is an example of [props](./example/src/demo1/demoProps.js) you
  can pass to a `BareMinimum2d` component.
- You pass it like so:

```jsx
<div style={{ width: 500, height: 600 }}>
  <BareMinimum2d {...{ data, container }} />
</div>
```

## Demo Applications

| Responsive Illustrations                                                                                                              | Generate On-the-fly Animations                                                                                                    | Interactive Applications                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <a href="https://mithi.github.io/bare-minimum-2d/demo1"><img src="./example/src/demo1/demo.svg" height="300px" width="270px"></a>     | <a href="https://mithi.github.io/bare-minimum-2d/demo2"><img src="./example/src/demo2/demo.svg" height="300px" width="270px"></a> | <a href="https://mithi.github.io/bare-minimum-2d/demo3"><img src="./example/src/demo3/demo.svg" height="300px" width="270px"></a> |
| In this demo, the plot is always centered no matter how you resize the window, the figure takes the dimension of its parent container | In this demo, 100 lines are generated every 15 milliseconds resulting a smooth screen saver effect                                | In this demo, the pinwheel's orientation, size, and colors changes everytime you move your cursor                                 |

## License

Checkout [future feature ideas](./future-features-ideas.md) if you're interested

MIT © [Mithi](https://github.com/mithi)
