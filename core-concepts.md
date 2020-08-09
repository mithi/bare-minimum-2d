# Core Concepts in Two Minutes

A `BareMinimum2d` component only has two props: `container` and `data`.
`container` is a small hash-like type object with exactly four elements.
`data` is an array containing hash-like objects.

Example:

```jsx
    const container = {
        color: '#0000FF',
        opacity: 0.2,
        xRange: 300,
        yRange: 500
    }
    const data = []

    <div style={{width: 500, height: 600}}>
        <BareMinimum2d data={data} container={container} />
    </div>

```

`container.color` and `container.opacity` are specifies the canvas color of `BareMinimum2d`.

The cartesian coordinate system of `BareMinimum` will follow the
diagram below given `container.xRange` and `container.yRange`.
Position (0, 0) will always be at the center of the rendered component.
See diagram below.

```js
                  yRange/2
                     |
                     |
  -xRange/2 -------(0,0)--------- xRange/2
                     |
                     |
                   -yRange/2
```

Here's an [Example data prop](./example/src/demo1/demoProps.js).

Each element of the array `data` should be a hash-like object
with a `type` key which should have a value that is one of
the following

- "lines" (plural)
- "points" (plural)
- "polygon" (singular)
- "ellipse" (singular)

Polygon elements will be rendered first, so it will be at the bottom layer.
Then lines, ellipses, and points. For each type of element, those elements will be stacked based
on the order they are declared. This means that the last element declared of type `points`
in the `data` array will be at the most top layer while the first polygon in the
`data` array will be rendered at the most bottom layer regardless of what is declared first.

All attributes are ALWAYS required, nothing is optional.
The `id` attribute should be unique.

Again, here's an [Example data prop](./example/src/demo1/demoProps.js), in case you missed it,

Go checkout the demos and source codes.
