import React, {Suspense} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Routes from "./Routes";
import {SpinnerCircular} from 'spinners-react';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <div className="App">
      <ReactNotification />
      <Suspense fallback={SpinnerCircular}>
        <Routes />
      </Suspense>
    </div>
  );
}

export default App;
