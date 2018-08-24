import React from 'react'
import Header from './Header'

const Layouts = (props) => {
  return (
    <React.Fragment>
      <Header></Header>
      {props.children}
    </React.Fragment>
  )
}

export default Layouts