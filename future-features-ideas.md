# Future features

## Markers

- Add an element type called "markers"
  If an element is of type `markers`, don't forget to specify a`markerType`
  like the following:

- "plus"
- "plus-circle"
- "plus-square"
- "triangle"
- "mouse-pointer"
- "arrow-up-circle"
- "arrow-up"

Which can be declared as:

```js
const markers1 = {
  x: [0, -50, -50, 50, 50],
  y: [0, -50, 50, 50, -50],
  theta: 0,
  color: 'red',
  opacity: 0.75,
  size: 5,
  type: 'markers',
  markerType: 'arrow-up',
  id: 'marker1'
}

const markers2 = {
  x: [0, 0, 0, 0],
  y: [-20, -10, 10, 20],
  theta: -45,
  color: 'purple',
  opacity: 0.75,
  size: 3,
  type: 'markers',
  markerType: 'plus-circle',
  id: 'markers2'
}
```
