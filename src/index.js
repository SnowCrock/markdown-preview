import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'
import Routers from './routers'
import './styles/markdown/prism.css'
import './styles/index.less'



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
        <Routers />
        {/* {Object.keys(data.component).map(key => data.component[key].react)} */}
        {/* {data.map(item => <div dangerouslySetInnerHTML={{__html: item.result}}></div>)} */}
        {/* <div dangerouslySetInnerHTML={{__html: gisReadMe.result}}></div> */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
