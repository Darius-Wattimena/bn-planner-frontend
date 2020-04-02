import React, { Suspense } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {NetworkErrorBoundary} from "rest-hooks";
import Routes from "./Routes";
import { SpinnerCircular } from 'spinners-react';

function App() {
  return (
    <div className="App">
      <Suspense fallback={SpinnerCircular}>
        <NetworkErrorBoundary>
          <Routes />
        </NetworkErrorBoundary>
      </Suspense>
    </div>
  );
}

export default App;
