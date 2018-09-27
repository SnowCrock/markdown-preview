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

const menus = [
  { name: '首页', path: '/home' },
  { name: '组件', path: '/components' },
  { name: '模块1', path: '/module1' },
  { name: '模块2', path: '/module2' },
  { name: '模块3', path: '/module3' },
]

export default (props) => (
  <Layout>
    <div className="li-layout-header">
      <ul className="li-layout-header-container">
        {menus.map(item => (
          <li key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
        {components.map(key => (
          <li key={key} >
            <Link to={`/home/components/${key}`}>{key}</Link>
          </li>
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
