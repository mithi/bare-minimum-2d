# Bare Minimum 2D Plotter (WIP)

> A low-level and lightweight react component to render points, lines, ellipses and polygons on svgs

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

- Read this [two minute introduction](./quick-start.md)
- Check this example props.

```jsx
<div style={{ width: 500, height: 600 }}>
  <BareMinimum2d {...{ data, container }} />
</div>
```

### Demo 1 Static and Responsive (WIP)

Here is a plot where simple points, lines, ellipses and polygons are drawn.
Here are the props passed to result this page and `<BareMinimum2d />` is wrapped by this component which takes full window.

### Demo 2 Animation (WIP)

In this example, lines are generated every `100` milliseconds generating an interesting pattern. Here's is the component wrapper.
https://p5js.org/examples/math-parametric-equations.html

### Demo 3 Interactive (WIP)

In this example, the circles move depending on where your cursor is located.
Here's the component wrapper.
https://p5js.org/examples/math-arctangent.html

## License

Checkout [future feature ideas](./future-features-ideas.md) if you're interested

MIT © [Mithi](https://github.com/mithi)
