import React from 'react'
import ReactDOM from 'react-dom'
// import Layout from './Layouts'
import './styles/prism.css'

const data = require('./utils/data.js')


// const demo = require('./markdown/demo.md')
// const gisReadMe = require('./markdown/gisreadme.md')
// const markdown = require('./components/Test/demo.md')
// console.log(markdown)
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    // const app = new Function('', markdown.code)()
    return (
      <div>
        {data.component.gisreadmemd.react}
        {/* {data.map(item => <div dangerouslySetInnerHTML={{__html: item.result}}></div>)} */}
        {/* <div dangerouslySetInnerHTML={{__html: gisReadMe.result}}></div> */}
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))