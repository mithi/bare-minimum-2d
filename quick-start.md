# Quick Start

A `BareMinimum2d` component only has two props `container` and `data`.
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

`container.color` and `container.opacity` are "paper" background properties
of `BareMinimum2d`.

The `BareMinimum2d`'s size is the size of its parent container (responsive).

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

Each element of the array `data` should be a hash-like object
with a `type` key which should have a value that is one of
the following

- "lines" (plural)
- "points" (plural)
- "polygon" (singular)
- "ellipse" (singular)

Polygon elements will be rendered first, so it will be at the bottom layer.
Then lines, ellipses, and points. Elements will be stacked based
on the order they are declared. So the last element declared of type `points`
in the `data` array will be at the most top layer while the first polygon in the
`data` array will be rendered at the most bottom layer regardless of what is declared first.

All attributes are ALWAYS required, nothing is optional.
The `id` attribute should be unique.

Go back to the readme and checkout the demos and their source codes.
