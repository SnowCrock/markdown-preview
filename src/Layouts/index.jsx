import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Layout from './Layout'
import './index.less'

const data = require('../utils/data.js')

const { Header, Sider, Content } = Layout

const components = Object.keys(data.component)
const routes = components.map(key => (
  <Route
    key={key}
    path={`/home/components/${key}`}
    component={() => data.component[key].react}
  />
))

export default (props) => (
  <Layout>
    <div className="li-layout-header">
      <ul>
        {components.map(key => (
          <Link key={key} to={`/home/components/${key}`}>
            <li>{key}</li>
          </Link>
        ))}
      </ul>
    </div>
    <div className="li-layout-content">
      <Switch>
        {routes}
      </Switch>
    </div>
  </Layout>
)
