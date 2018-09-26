import React from 'react'


const Basic = (props) => {

}

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { children } = this.props
    return <div className="li-layout">{children}</div>
  }
}

export default Layout