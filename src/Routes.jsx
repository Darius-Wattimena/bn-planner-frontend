import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home/Home";
import Beatmaps from "./components/beatmaps/Beatmaps";
import Nav from "./components/nav/Nav";
import Users from "./components/user/Users";

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav/>
        <Route exact path={"/"} component={Home}/>
        <Route exact path={"/beatmaps"} component={Beatmaps}/>
        <Route exact path={"/users"} component={Users}/>
    </BrowserRouter>
  )
};

export default Routes