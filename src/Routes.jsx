import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home/Home";
import Beatmaps from "./components/beatmaps/Beatmaps";
import Nav from "./components/nav/Nav";
import {Container} from "semantic-ui-react";
import {NetworkErrorBoundary} from "rest-hooks";

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <div className={"container"}>
        <Route exact path="/" component={Home}/>
        <Route exact path="/beatmaps" component={Beatmaps}/>
      </div>
    </BrowserRouter>
  )
};

export default Routes