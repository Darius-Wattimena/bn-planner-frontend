import React, {useState} from "react"
import {Icon, Menu, MenuItem, Sidebar} from "semantic-ui-react"
import {useHistory} from "react-router-dom"
import catchLogo from "../../assets/catch.svg"
import "./Nav.scss"
import {ENV} from "../../Settings"
import NavMenuItems from "./NavMenuItems";
import useWindowDimensions from "../../hooks/useWindowDimensions"

const homeName = "home"
const beatmapsName = "beatmaps"
const rankedName = "ranked"
const gravedName = "graved"
const usersName = "users"
const contestName = "contest"
const moddingMapName = "moddingMap"
const loginName = "login"

function getSelectedFromHref() {
  if (window.location.href.endsWith("/beatmaps")) {
    return beatmapsName
  } else if (window.location.href.endsWith("/users")) {
    return usersName
  } else if (window.location.href.endsWith("/ranked")) {
    return rankedName
  } else if (window.location.href.endsWith("/graved")) {
    return gravedName
  } else if (window.location.href.endsWith("/contests")) {
    return contestName
  } else if (window.location.href.includes("/modding/maps")) {
    return moddingMapName
  } else if (window.location.href.endsWith("/login")) {
    return loginName
  } else {
    return homeName
  }
}

const Nav = ({userId, hasHiddenPerms}) => {
  let history = useHistory()
  const {height, width} = useWindowDimensions();
  const [selected, setSelected] = useState(getSelectedFromHref())
  const [visible, setVisible] = useState(false)

  function handleNavClick(itemName, location) {
    setSelected(itemName)
    history.push(location)
  }

  const osuLoginUrl = "https://osu.ppy.sh/oauth/authorize?response_type=code&client_id=" + ENV.osu.id + "&redirect_uri=" + ENV.osu.redirect + "&response_type=code&scope=identify public"

  if (width > 767) {
    return (
      <nav className={"nav-header"}>
        <Menu secondary inverted>
          <div className={"item"} onClick={() => handleNavClick(homeName, "/")}>
            <img src={catchLogo} alt={""}/>
          </div>
          <NavMenuItems
            beatmapsName={beatmapsName}
            contestName={contestName}
            gravedName={gravedName}
            homeName={homeName}
            loginName={loginName}
            moddingMapName={moddingMapName}
            rankedName={rankedName}
            usersName={usersName}

            hasHiddenPerms={hasHiddenPerms}
            selected={selected}
            userId={userId}
            osuLoginUrl={osuLoginUrl}
            handleNavClick={handleNavClick}
          />
        </Menu>
      </nav>
    )
  } else {
    return (
      <>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={() => setVisible(false)}
          vertical
          visible={visible}
          width='thin'
          className={"mobile-menu-sidebar"}
        >
          <div className={"item"} onClick={() => handleNavClick(homeName, "/")}>
            <img src={catchLogo} alt={""}/>
          </div>
          <NavMenuItems
            beatmapsName={beatmapsName}
            contestName={contestName}
            gravedName={gravedName}
            homeName={homeName}
            loginName={loginName}
            moddingMapName={moddingMapName}
            rankedName={rankedName}
            usersName={usersName}

            hasHiddenPerms={hasHiddenPerms}
            selected={selected}
            userId={userId}
            osuLoginUrl={osuLoginUrl}
            handleNavClick={handleNavClick}
          />
        </Sidebar>

        <Sidebar.Pusher>
          <nav className={"nav-header"}>
            <Menu secondary inverted>
              <div className={"item"} onClick={() => handleNavClick(homeName, "/")}>
                <img src={catchLogo} alt={""}/>
              </div>
              <Menu.Menu className={"mobile-menu-right"} position='right'>
                <MenuItem onClick={() => setVisible(true)}>
                  <Icon name={"bars"}/> Menu
                </MenuItem>
              </Menu.Menu>
            </Menu>
          </nav>
        </Sidebar.Pusher>
      </>
    )
  }
}

export default Nav