import React from 'react'
import { Layout, Menu } from 'antd'
import { Switch } from 'react-router-dom'
import './index.less'

const { Header, Sider, Content } = Layout

export default () => (
  <Layout>
    <Header />
    <Layout>
      <Sider>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={false}
        >
          {menuData}
        </Menu>
      </Sider>
      <Content>
        <Switch>
          {/* {getRouters()} */}
        </Switch>
      </Content>
    </Layout>
  </Layout>
)
