import React, { Suspense } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {NetworkErrorBoundary} from "rest-hooks";
import Routes from "./Routes";
import { SpinnerCircular } from 'spinners-react';
import {Container} from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <Suspense fallback={SpinnerCircular}>
        <NetworkErrorBoundary>
          <Container>
            <Routes />
          </Container>
        </NetworkErrorBoundary>
      </Suspense>
    </div>
  );
}

export default App;
