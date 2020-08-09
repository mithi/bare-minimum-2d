import React from 'react'
import Demo3 from './demo3/demo'
import Demo2 from './demo2/demo'
import Demo1 from './demo1/demo'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/'>
            <Link to='/demo1'>Demo1</Link>
            <br />
            <Link to='/demo2'>Demo2</Link>
            <br />
            <Link to='/demo3'>Demo3</Link>
            <br />
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
        </Switch>
      </div>
    </Router>
  )
}

export default App
