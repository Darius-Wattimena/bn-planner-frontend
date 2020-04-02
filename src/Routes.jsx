import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home/Home";
import Beatmaps from "./components/beatmaps/Beatmaps";
import Nav from "./components/nav/Nav";
import {Container} from "semantic-ui-react";

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <div className={"base-container"}>
        <Container fluid>
          <Route exact path="/" component={Home}/>
          <Route exact path="/beatmaps" component={Beatmaps}/>
        </Container>
      </div>
    </BrowserRouter>
  )
};

export default Routes