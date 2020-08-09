import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import Demo3 from './demo3/demo'
import Demo2 from './demo2/demo'
import Demo1 from './demo1/demo'
import { URL_REPO } from './links'

const stickyHome = {
  position: 'fixed',
  top: 0,
  margin: '10px',
  color: '#32ff7e'
}

const LandingPage = () => (
  <div style={{ marginTop: '30px', marginLeft: '10px' }}>
    <Link to='/demo1'>Demo1. </Link>
    <br />
    <Link to='/demo2'>Demo2. </Link>
    <br />
    <Link to='/demo3'>Demo3. </Link>
    <br />
    <a href={URL_REPO} target='_blank' rel='noopener noreferrer'>
      Code Repository.
    </a>
    <h1>{'<BareMinimum2d />'}</h1>
    <p>
      BareMinimum2d is a low-level and lightweight React component you can use
      <br />
      to render points, lines, ellipses, and polygons on the screen.
      <br />
    </p>
    <p>
      Go check out the three demos lined above and if you're interested in using
      it,
      <br />
      you can checkout the repository (also linked above).
    </p>
  </div>
)

const App = () => {
  return (
    <Router>
      <div>
        <div style={stickyHome}>
          <Link to='/'>Home</Link>
        </div>

        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/demo1'>
            <Demo1 />
          </Route>
          <Route exact path='/demo2'>
            <Demo2 />
          </Route>
          <Route exact path='/demo3'>
            <Demo3 />
          </Route>
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
