import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Beatmaps from "./components/beatmaps/Beatmaps";
import Nav from "./components/nav/Nav";
import Users from "./components/user/Users";
import NotFound from "./components/notFound/NotFound";
import LoginModal from "./components/login/LoginModal";

const Routes = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <BrowserRouter>
      <Nav setLoginOpen={setLoginOpen} />
      <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      <Switch>
        <Route exact path={"/beatmaps"} component={Beatmaps} />
        <Route exact path={"/users"} component={Users} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes