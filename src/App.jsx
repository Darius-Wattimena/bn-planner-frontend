import React, {Suspense} from 'react'
import 'semantic-ui-css/semantic.min.css'
import Routes from "./Routes"
import {SpinnerCircular} from 'spinners-react'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import './Colours.scss'
import './App.scss'
import {Sidebar} from "semantic-ui-react";

function App() {
  return (
    <Sidebar.Pushable>
      <div className="App">
        <ReactNotification/>
        <Suspense fallback={SpinnerCircular}>
          <Routes/>
        </Suspense>
      </div>
    </Sidebar.Pushable>
  )
}

export default App
