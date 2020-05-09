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
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";

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
      isAdmin: decoded.isAdmin,
      userId: decoded.osuId
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

  let userId;
  if (permissions.userId) {
    userId = permissions.userId
  } else {
    userId = 0
  }

  return (
    <BrowserRouter>
      <Nav setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} setPermissions={setPermissions} userId={userId} />
      <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      <RegisterModal open={registerOpen} setOpen={setRegisterOpen} />
      <Switch>
        <Route exact path={"/"} component={Home}/>
        <Route exact path={"/beatmaps"} component={() => <Beatmaps canEdit={canEdit} isAdmin={isAdmin} />} />
        <Route exact path={"/users"} component={() => <Users canEdit={canEdit} isAdmin={isAdmin} />} />
        <Route path={"/profile/:userId"} component={Profile}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes