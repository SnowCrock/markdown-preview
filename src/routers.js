import React from 'react'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import createHistory from 'history/createHashHistory'

import Layout from './Layouts'

const history = createHistory()

export default () => (
  <Router history={history}>
    <Switch>
      <Route path='/home' render={Layout} />
      <Redirect exact from='/' to='home' />
    </Switch>
  </Router>
)
