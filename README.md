# Bare Minimum 2D Plotter

> A low-level and lightweight react component to declare and render points, lines, ellipses and polygons

[![NPM](https://img.shields.io/npm/v/bare-minimum-2d.svg)](https://www.npmjs.com/package/bare-minimum-2d)

## Features

- No dependencies, the only peer dependency is React
- Less than `3kB` gzipped, I think

```bash
$ npm run build
Build "bareMinimum2D" to dist:
       2.1 kB: index.js.gz
      1.82 kB: index.js.br
      2.04 kB: index.modern.js.gz
      1.76 kB: index.modern.js.br
```

## Demo Applications

| Responsive Illustrations                                                            | Generate On-the-fly Animations                                                      | Interactive Applications                                                            |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [<img src="./example/src/demo1/demo.svg" height="300px" width="270px">][demo_link1] | [<img src="./example/src/demo2/demo.svg" height="300px" width="270px">][demo_link2] | [<img src="./example/src/demo3/demo.svg" height="300px" width="270px">][demo_link3] |
| [demo][demo_link1]                                                                  | [demo][demo_link2]                                                                  | [demo][demo_link3]                                                                  |

[demo_link1]: https://bare-minimum-2d.netlify.app/demo1
[demo_link2]: https://bare-minimum-2d.netlify.app/demo2
[demo_link3]: https://bare-minimum-2d.netlify.app/demo3

## Install

```bash
npm install --save bare-minimum-2d
```

## Usage

- Read this: [Core Concepts on Two Minutes](./core-concepts.md)
- This is [an example](./example/src/demo1/demoProps.js) of what you can
  can pass to a `BareMinimum2d` component.
- You pass it like so:

```jsx
<div style={{ width: 500, height: 600 }}>
  <BareMinimum2d {...{ data, container }} />
</div>
```

Checkout the [features](./to-do.md) that might be implemented in the future.

## License

MIT © [Mithi](https://github.com/mithi)
