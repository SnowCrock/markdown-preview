import React from 'react'
import '../styles/prism.css'

class Code extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    if (!this.props.children) return null
    return (
      <pre className="language-jsx">
        <code className="language-jsx" dangerouslySetInnerHTML={ { __html: this.props.children} }></code>
      </pre>
    )
  }
}

export default Code