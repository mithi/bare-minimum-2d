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

```
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
- "markers" (plural)
- "polygon" (singular)
- "ellipse" (singular)

Polygon elements will be rendered first, so it will be at the bottom layer.
Then ellipses, lines, points, and finally markers. Elements will be stacked based
on the order they are declared. So the last element declared of type `markers`
in the `data` array will be at the most top layer. While the first polygon in the
`data` array will be rendered at the most bottom layer.

If an element is of type `markers`, don't forget to specify a`markerType`
which should be one of the following:

- "plus"
- "plus-circle"
- "plus-square"
- "triangle"
- "alert-triangle"
- "arrow-up"

These markers are copied from feather icons.

Please checkout `example1`, `example2`, and `example3` to learn how to specify
attributes of each elements. All attributes are required, nothing is optional.
The `id` attribute should be unique.
