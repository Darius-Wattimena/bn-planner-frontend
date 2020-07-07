import React, {useState} from "react"
import {Menu, MenuItem} from "semantic-ui-react"
import {useHistory} from "react-router-dom"
import catchLogo from "../../assets/catch.svg"
import "./Nav.css"
import {ENV} from "../../Settings"

const homeName = "home"
const beatmapsName = "beatmaps"
const rankedName = "ranked"
const gravedName = "graved"
const usersName = "users"
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
  } else if (window.location.href.endsWith("/login")) {
    return loginName
  } else {
    return homeName
  }
}

const Nav = ({userId}) => {
  let history = useHistory()
  const [selected, setSelected] = useState(getSelectedFromHref())

  function handleNavClick(itemName, location) {
    setSelected(itemName)
    history.push(location)
  }

  const osuLoginUrl = "https://osu.ppy.sh/oauth/authorize?response_type=code&client_id=" + ENV.osu.id +"&redirect_uri=" + ENV.osu.redirect + "&response_type=code&scope=identify public"

  return (
    <nav className={"nav-header"}>
      <Menu secondary inverted>
        <div className={"item"} onClick={() => handleNavClick(homeName, "/")}>
          <img src={catchLogo} alt={""}/>
        </div>
        <MenuItem
          name={homeName}
          active={selected === homeName}
          onClick={() => handleNavClick(homeName, "/")}
        >
          Home
        </MenuItem>
        <MenuItem
          name={beatmapsName}
          active={selected === beatmapsName}
          onClick={() => handleNavClick(beatmapsName, "/beatmaps")}
        >
          Icons In Progress
        </MenuItem>
        <MenuItem
          name={rankedName}
          active={selected === rankedName}
          onClick={() => handleNavClick(rankedName, "/ranked")}
        >
          Ranked
        </MenuItem>
        <MenuItem
          name={gravedName}
          active={selected === gravedName}
          onClick={() => handleNavClick(gravedName, "/graved")}
        >
          Graved
        </MenuItem>
        <MenuItem
          name={usersName}
          active={selected === usersName}
          onClick={() => handleNavClick(usersName, "/users")}
        >
          Users
        </MenuItem>
        {userId === 0 &&
        <Menu.Menu position='right'>
          <MenuItem
            name={loginName}
            active={selected === loginName}
            onClick={() => window.location.href = osuLoginUrl}
          >
            Login with osu! account
          </MenuItem>
        </Menu.Menu>
        }
      </Menu>
    </nav>
  )
}

export default Nav