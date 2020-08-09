import React from 'react'
import Demo3 from './demo3/demo'
import Demo2 from './demo2/demo'
import Demo1 from './demo1/demo'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const stickyHome = {
  position: 'fixed',
  top: 0,
  margin: '10px',
  color: '#32ff7e'
}

const LandingPage = () => (
  <div style={{ marginTop: '30px', marginLeft: '10px' }}>
    <Link to='/demo1'>Demo1</Link>
    <br />
    <Link to='/demo2'>Demo2</Link>
    <br />
    <Link to='/demo3'>Demo3</Link>
    <br />
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
