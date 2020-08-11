import React, {useState} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Nav from "./components/nav/Nav"
import {useCookies} from "react-cookie"
import {useQuery} from "react-fetching-library"
import Api from "./resources/Api"
import {Dimmer, Progress} from "semantic-ui-react"
import Home from "./components/home/Home"
import Beatmaps from "./components/beatmaps/Beatmaps"
import RankedBeatmaps from "./components/beatmaps/RankedBeatmaps"
import GravedBeatmaps from "./components/beatmaps/GravedBeatmaps"
import Users from "./components/user/Users"
import Contest from "./components/tournament/contest/Contest"
import ModdingMap from "./components/tournament/moddingMap/ModdingMap"
import ModdingDiscussion from "./components/tournament/moddingDiscussion/ModdingDiscussion"
import Login from "./components/login/Login"
import NotFound from "./components/notFound/NotFound"

export const basePermissions = {
  empty: true
}

const Routes = () => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  const userQuery = useQuery(Api.getUsers())
  const {payload, loading, error} = useQuery(Api.getUserInfo(cookies.bnplanner_osu_access_token))

  const [permissions, setPermissions] = useState(basePermissions)

  if (loading || userQuery.loading) {
    return (
      <Dimmer active>
        <Progress active progress="percent" className={"fullOverlay"} indicating percent={(loading && userQuery.loading)
          ? 20 : loading
            ? 60 : userQuery.loading
              ? 80 : 100}>Preparing Nomination Planner</Progress>
      </Dimmer>
    )
  }

  if (cookies && cookies.bnplanner_osu_access_token && cookies.bnplanner_osu_access_token !== ""
    && !loading && !error && payload && payload !== "" && permissions === basePermissions) {
    setPermissions({
      canEdit: payload.canEdit,
      isAdmin: payload.isAdmin,
      userId: payload.id,
      hasHiddenPerms: payload.hasHiddenPerms
    })
  }

  let canEdit
  if (permissions.canEdit) {
    canEdit = permissions.canEdit
  } else {
    canEdit = false
  }

  let isAdmin
  if (permissions.isAdmin) {
    isAdmin = permissions.isAdmin
  } else {
    isAdmin = false
  }

  let userId
  if (permissions.userId) {
    userId = permissions.userId
  } else {
    userId = 0
  }

  let hasHiddenPerms
  if (permissions.hasHiddenPerms) {
    hasHiddenPerms = permissions.hasHiddenPerms
  } else {
    hasHiddenPerms = false
  }

  return (
    <BrowserRouter>
      <Nav userId={userId} hasHiddenPerms={hasHiddenPerms}/>
      <Switch>
        <Route exact path={"/"} component={() => <Home users={userQuery.payload}/>}/>
        <Route exact path={"/beatmaps"} component={() => <Beatmaps canEdit={canEdit} isAdmin={isAdmin} userId={userId}
                                                                   users={userQuery.payload}/>}/>
        <Route exact path={"/ranked"}
               component={() => <RankedBeatmaps canEdit={canEdit} isAdmin={isAdmin} userId={userId}
                                                users={userQuery.payload}/>}/>
        <Route exact path={"/graved"}
               component={() => <GravedBeatmaps canEdit={canEdit} isAdmin={isAdmin} userId={userId}
                                                users={userQuery.payload}/>}/>
        <Route exact path={"/users"} component={() => <Users canEdit={canEdit} isAdmin={isAdmin} userId={userId}
                                                             users={userQuery.payload}/>}/>
        {hasHiddenPerms &&
        <>
          <Route path={"/contests"} component={() => <Contest canEdit={canEdit} isAdmin={isAdmin} userId={userId}
                                                              users={userQuery.payload}/>}/>
          <Route exact path={"/modding/maps"}
                 component={() => <ModdingMap canEdit={canEdit} isAdmin={isAdmin} userId={userId}
                                              users={userQuery.payload}/>}/>
          <Route path={"/modding/maps/discussion/:id"}
                 component={() => <ModdingDiscussion canEdit={canEdit} isAdmin={isAdmin} userId={userId}
                                                     users={userQuery.payload}/>}/>
        </>
        }
        <Route path={"/login"} component={Login}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes