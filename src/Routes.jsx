import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home/Home";
import Beatmaps from "./components/beatmaps/Beatmaps";
import Nav from "./components/nav/Nav";

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Route exact path="/" component={Home}/>
      <Route exact path="/beatmaps" component={Beatmaps}/>
    </BrowserRouter>
  )
};

export default Routes