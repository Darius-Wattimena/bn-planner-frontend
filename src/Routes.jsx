import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Beatmaps from "./components/beatmaps/Beatmaps";
import Nav from "./components/nav/Nav";
import Users from "./components/user/Users";
import NotFound from "./components/notFound/NotFound";
import LoginModal from "./components/authentication/LoginModal";
import RegisterModal from "./components/authentication/RegisterModal";
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode"

export const basePermissions = {
  empty: true
};

const Routes = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [cookies] = useCookies(['bnplanner_token']);

  const [permissions, setPermissions] = useState(basePermissions);

  if (cookies && cookies.bnplanner_token && cookies.bnplanner_token !== "" && permissions === basePermissions) {
    //Process JWT token and get read the permissions from this
    let decoded = jwt_decode(cookies.bnplanner_token);
    setPermissions({
      canEdit: decoded.canEdit,
      isAdmin: decoded.isAdmin
    })
  }

  let canEdit;
  if (permissions.canEdit) {
    canEdit = permissions.canEdit
  } else {
    canEdit = false
  }

  let isAdmin;
  if (permissions.isAdmin) {
    isAdmin = permissions.isAdmin
  } else {
    isAdmin = false
  }

  return (
    <BrowserRouter>
      <Nav setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} setPermissions={setPermissions} />
      <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      <RegisterModal open={registerOpen} setOpen={setRegisterOpen} />
      <Switch>
        <Route exact path={"/beatmaps"} component={() => <Beatmaps canEdit={canEdit} isAdmin={isAdmin} />} />
        <Route exact path={"/users"} component={() => <Users canEdit={canEdit} isAdmin={isAdmin} />} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes