import React, { Suspense } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Routes from './Routes'
import { SpinnerCircular } from 'spinners-react'
import './Colours.scss'
import './App.scss'
import { Sidebar } from 'semantic-ui-react'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App () {
  return (
    <>
      <ReactNotification />
      <Sidebar.Pushable>
        <div className='App'>
          <Suspense fallback={SpinnerCircular}>
            <Routes/>
          </Suspense>
        </div>
      </Sidebar.Pushable>
    </>
  )
}

export default App
