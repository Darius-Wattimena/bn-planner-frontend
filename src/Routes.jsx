import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Beatmaps from "./components/beatmaps/Beatmaps";
import Nav from "./components/nav/Nav";
import Users from "./components/user/Users";
import NotFound from "./components/notFound/NotFound";
import LoginModal from "./components/authentication/LoginModal";
import RegisterModal from "./components/authentication/RegisterModal";
import {useCookies} from "react-cookie";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import {useQuery} from "react-fetching-library";
import Api from "./resources/Api";

export const basePermissions = {
  empty: true
};

const Routes = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [cookies] = useCookies(['bnplanner_osu_access_token']);

  const { payload, loading, error } = useQuery(Api.getUserInfo(cookies.bnplanner_osu_access_token));

  const [permissions, setPermissions] = useState(basePermissions);

  if (cookies && cookies.bnplanner_osu_access_token && cookies.bnplanner_osu_access_token !== ""
    && !loading && !error && payload && payload !== "" && permissions === basePermissions) {
    setPermissions({
      canEdit: payload.canEdit,
      isAdmin: payload.isAdmin,
      userId: payload.id
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
      <Nav userId={userId} />
      <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      <RegisterModal open={registerOpen} setOpen={setRegisterOpen} />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/beatmaps"} component={() => <Beatmaps canEdit={canEdit} isAdmin={isAdmin} />} />
        <Route exact path={"/users"} component={() => <Users canEdit={canEdit} isAdmin={isAdmin} />} />
        <Route path={"/login"} component={Login} />
        <Route path={"/profile/:userId"} component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
};

export default Routes