import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {ClientContextProvider} from "react-fetching-library"
import {Client} from "./resources/Client"
import {CookiesProvider} from "react-cookie"

ReactDOM.render(
  <React.StrictMode>
    <ClientContextProvider client={Client}>
      <CookiesProvider>
        <App/>
      </CookiesProvider>
    </ClientContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
